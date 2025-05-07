// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect, useCallback } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as speechCommands from "@tensorflow-models/speech-commands";

// export function useTeachableMachine(
//   modelPath: string,
//   probabilityThreshold = 0.75
// ) {
//   const [recognizer, setRecognizer] =
//     useState<speechCommands.SpeechCommandRecognizer | null>(null);
//   const [labels, setLabels] = useState<string[]>([]);
//   const [scores, setScores] = useState<number[]>([]);
//   const [isListening, setIsListening] = useState(false);

//   const loadModel = useCallback(async () => {
//     const checkpointURL = `${modelPath}/model.json`;
//     const metadataURL = `${modelPath}/metadata.json`;

//     const recognizerInstance = speechCommands.create(
//       "BROWSER_FFT",
//       undefined,
//       checkpointURL,
//       metadataURL
//     );

//     await recognizerInstance.ensureModelLoaded();
//     setRecognizer(recognizerInstance);
//     setLabels(recognizerInstance.wordLabels());
//   }, [modelPath]);

//   const startListening = useCallback(() => {
//     if (!recognizer) return;

//     recognizer.listen(
//       async (result) => {
//         const scoresData = result.scores;
//         if (scoresData instanceof Float32Array) {
//           setScores(Array.from(scoresData));
//         } else if (Array.isArray(scoresData)) {
//           const flattened = scoresData.flatMap((arr) => Array.from(arr));
//           setScores(flattened);
//         } else {
//           console.warn("Unexpected scores type:", scoresData);
//           setScores([]);
//         }
//       },
//       {
//         includeSpectrogram: false,
//         probabilityThreshold,
//         invokeCallbackOnNoiseAndUnknown: true,
//         overlapFactor: 0.5,
//       }
//     );

//     setIsListening(true);
//   }, [recognizer, probabilityThreshold]);

//   const stopListening = useCallback(() => {
//     recognizer?.stopListening();
//     setIsListening(false);
//   }, [recognizer]);

//   useEffect(() => {
//     loadModel();
//     return () => {
//       recognizer?.stopListening();
//     };
//   }, [loadModel, recognizer]);

//   return {
//     labels,
//     scores,
//     isListening,
//     startListening,
//     stopListening,
//   };
// }
