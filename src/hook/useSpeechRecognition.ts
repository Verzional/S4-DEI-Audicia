/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSpeechRecognition.ts
import { useState, useEffect, useRef, useCallback } from 'react';

export type SpeechRecognitionResult = {
  transcript: string;
  isFinal: boolean;
}

export type SpeechRecognitionState = {
  isListening: boolean;
  isFinal: boolean;
  interimTranscript: string;
  finalTranscript: string;
  error: string | null;
}

export type UseSpeechRecognitionOptions = {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
  onResult?: (result: SpeechRecognitionResult) => void;
  onFinalResult?: (transcript: string) => void;
  onError?: (error: string) => void;
  autoStart?: boolean;
}

/**
 * A custom hook for speech recognition functionality
 */
export function useSpeechRecognition({
  continuous = true,
  interimResults = true,
  lang = 'en-US',
  onResult,
  onFinalResult,
  onError,
  autoStart = false
}: UseSpeechRecognitionOptions = {}) {
  // State for managing recognition
  const [state, setState] = useState<SpeechRecognitionState>({
    isListening: false,
    isFinal: false,
    interimTranscript: '',
    finalTranscript: '',
    error: null
  });
  
  // Ref for SpeechRecognition instance
  const recognitionRef = useRef<any>(null);
  
  // Check if speech recognition is supported
  const isSupported = typeof window !== 'undefined' && 
    (('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window));
  
  // Initialize speech recognition
  const initializeRecognition = useCallback(() => {
    if (!isSupported) {
      setState(prev => ({ 
        ...prev, 
        error: 'Speech recognition is not supported in this browser.' 
      }));
      return false;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    // Configure recognition
    recognitionRef.current.continuous = continuous;
    recognitionRef.current.interimResults = interimResults;
    recognitionRef.current.lang = lang;
    
    // Set up event handlers
    recognitionRef.current.onstart = () => {
      setState(prev => ({ ...prev, isListening: true, error: null }));
    };
    
    recognitionRef.current.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
    };
    
    recognitionRef.current.onerror = (event: any) => {
      const errorMessage = event.error || 'Unknown speech recognition error';
      setState(prev => ({ ...prev, error: errorMessage }));
      
      if (onError) {
        onError(errorMessage);
      }
    };
    
    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      // Process results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          
          if (onResult) {
            onResult({ transcript, isFinal: true });
          }
          
          if (onFinalResult) {
            onFinalResult(transcript);
          }
        } else {
          interimTranscript += transcript;
          
          if (onResult) {
            onResult({ transcript, isFinal: false });
          }
        }
      }
      
      // Update state with transcripts
      setState(prev => ({
        ...prev,
        interimTranscript,
        finalTranscript: prev.finalTranscript + finalTranscript,
        isFinal: !!finalTranscript
      }));
    };
    
    return true;
  }, [continuous, interimResults, isSupported, lang, onError, onFinalResult, onResult]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current && !initializeRecognition()) {
      return;
    }
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Error starting speech recognition' 
      }));
    }
  }, [initializeRecognition]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  }, []);
  
  // Reset transcripts
  const resetTranscript = useCallback(() => {
    setState(prev => ({
      ...prev,
      interimTranscript: '',
      finalTranscript: '',
      isFinal: false
    }));
  }, []);
  
  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);
  
  // Initialize on mount
  useEffect(() => {
    if (isSupported) {
      initializeRecognition();
      
      if (autoStart) {
        startListening();
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        stopListening();
      }
    };
  }, [autoStart, initializeRecognition, isSupported, startListening, stopListening]);
  
  return {
    // State
    isListening: state.isListening,
    interimTranscript: state.interimTranscript,
    finalTranscript: state.finalTranscript,
    isFinal: state.isFinal,
    error: state.error,
    isSupported,
    
    // Methods
    startListening,
    stopListening,
    resetTranscript,
    clearError
  };
}

export default useSpeechRecognition;