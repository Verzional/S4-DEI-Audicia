/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useTeachableMachine.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';

type TeachableMachineResult = {
  className: string;
  probability: number;
}

type AudioModelState = {
  isLoading: boolean;
  isLoaded: boolean;
  isRunning: boolean;
  error: string | null;
  classifications: TeachableMachineResult[];
}

type UseTeachableMachineOptions = {
  modelURL: string;
  metadataURL: string;
  autoStart?: boolean;
  confidenceThreshold?: number;
  onPrediction?: (results: TeachableMachineResult[]) => void;
  onError?: (error: Error) => void;
}

/**
 * A custom hook for integrating Teachable Machine audio models into React components
 */
export function useTeachableMachine({
  modelURL,
  metadataURL,
  autoStart = false,
  confidenceThreshold = 0.75,
  onPrediction,
  onError
}: UseTeachableMachineOptions) {
  // State for managing the model
  const [state, setState] = useState<AudioModelState>({
    isLoading: false,
    isLoaded: false,
    isRunning: false,
    error: null,
    classifications: []
  });
  
  // Refs for managing the model and audio resources
  const modelRef = useRef<tf.LayersModel | null>(null);
  const metadataRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Load the model
  const loadModel = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      if (!modelURL || !metadataURL) {
        throw new Error('Model or metadata URL is missing');
      }
      
      // Load the model
      modelRef.current = await tf.loadLayersModel(modelURL);
      
      // Load metadata
      const metadataResponse = await fetch(metadataURL);
      if (!metadataResponse.ok) {
        throw new Error(`Failed to load metadata: ${metadataResponse.statusText}`);
      }
      
      metadataRef.current = await metadataResponse.json();
      
      // Validate metadata
      if (!metadataRef.current?.classes || !Array.isArray(metadataRef.current.classes)) {
        throw new Error('Invalid metadata format: missing classes');
      }
      
      setState(prev => ({ ...prev, isLoading: false, isLoaded: true }));
      
      // Automatically start if requested
      if (autoStart) {
        startClassification();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error loading model';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isLoaded: false, 
        error: errorMessage 
      }));
      
      if (onError && error instanceof Error) {
        onError(error);
      } else if (onError) {
        onError(new Error(errorMessage));
      }
      
      console.error('Error loading Teachable Machine model:', error);
    }
  }, [modelURL, metadataURL, autoStart, onError]);

  // Start the classification process
  const startClassification = useCallback(async () => {
    if (!modelRef.current || !metadataRef.current) {
      setState(prev => ({ ...prev, error: 'Model not loaded' }));
      return;
    }
    
    try {
      // Initialize audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 1024;
      
      // Get microphone stream
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(streamRef.current);
      microphoneRef.current.connect(analyserRef.current);
      
      // Set running state
      setState(prev => ({ ...prev, isRunning: true, error: null }));
      
      // Start classification loop
      classifyAudio();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error accessing microphone';
        
      setState(prev => ({ ...prev, isRunning: false, error: errorMessage }));
      
      if (onError && error instanceof Error) {
        onError(error);
      } else if (onError) {
        onError(new Error(errorMessage));
      }
      
      console.error('Error starting audio classification:', error);
    }
  }, [onError]);

  // Stop the classification process
  const stopClassification = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }
    
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  // Main classification loop
  const classifyAudio = useCallback(async () => {
    if (!analyserRef.current || !modelRef.current || !metadataRef.current) return;
    
    // Get audio data from analyser
    const bufferLength = analyserRef.current.frequencyBinCount;
    const audioData = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(audioData);
    
    // Skip processing if audio is silent
    const sum = audioData.reduce((acc, val) => acc + val, 0);
    const average = sum / audioData.length;
    
    // Only process if there's significant audio
    if (average > 5) { 
      try {
        // Preprocess audio for model input
        const tensor = preprocessAudio(audioData);
        
        // Make prediction
        const prediction = await modelRef.current.predict(tensor) as tf.Tensor;
        const values = await prediction.data();
        
        // Process predictions
        const classes = metadataRef.current.classes;
        const results: TeachableMachineResult[] = Array.from(values).map((prob, i) => ({
          className: classes[i] || `Class ${i}`,
          probability: prob as number
        }));
        
        // Sort by probability
        results.sort((a, b) => b.probability - a.probability);
        
        // Filter by confidence threshold if needed
        const significantResults = results.filter(r => r.probability >= confidenceThreshold);
        
        // Update state
        setState(prev => ({ ...prev, classifications: results }));
        
        // Call callback if provided
        if (onPrediction) {
          onPrediction(significantResults.length > 0 ? significantResults : results);
        }
        
        // Cleanup tensors
        tensor.dispose();
        prediction.dispose();
      } catch (error) {
        console.error('Error during classification:', error);
      }
    }
    
    // Continue loop if still running
    if (state.isRunning) {
      animationFrameRef.current = requestAnimationFrame(classifyAudio);
    }
  }, [state.isRunning, confidenceThreshold, onPrediction]);

  // Preprocess audio for model input
  const preprocessAudio = (audioData: Uint8Array): tf.Tensor => {
    // Convert to float32 and normalize
    const float32Data = Float32Array.from(audioData).map(val => val / 255.0);
    
    // Reshape according to model input requirements
    // This is a simplification - actual preprocessing will depend on your specific model
    const sampleSize = float32Data.length;
    const reshapedData = tf.tensor(float32Data, [1, sampleSize, 1]);
    
    return reshapedData;
  };

  // Load model on mount if URLs are provided
  useEffect(() => {
    if (modelURL && metadataURL) {
      loadModel();
    }
    
    return () => {
      // Cleanup on unmount
      stopClassification();
    };
  }, [loadModel, modelURL, metadataURL, stopClassification]);

  return {
    // State
    isLoading: state.isLoading,
    isLoaded: state.isLoaded,
    isRunning: state.isRunning,
    error: state.error,
    classifications: state.classifications,
    
    // Methods
    loadModel,
    startClassification,
    stopClassification
  };
}

export default useTeachableMachine;