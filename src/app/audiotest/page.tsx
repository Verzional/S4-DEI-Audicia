// /* eslint-disable @typescript-eslint/no-unused-vars */
// // components/AudioModel.tsx
// "use client";

// import React, { useRef, useState } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as speechCommands from "@tensorflow-models/speech-commands";

// const AudioModel: React.FC = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [classLabels, setClassLabels] = useState<string[]>([]);
//   const [scores, setScores] = useState<number[]>([]);
//   const recognizerRef = useRef<speechCommands.SpeechCommandRecognizer | null>(
//     null
//   );

//   const MODEL_URL = "{{URL}}"; // Replace this with your Teachable Machine model URL

//   const init = async () => {
//     if (recognizerRef.current) return; // prevent reinitializing

//     const checkpointURL = `${MODEL_URL}model.json`;
//     const metadataURL = `${MODEL_URL}metadata.json`;

//     const recognizer = speechCommands.create(
//       "BROWSER_FFT",
//       undefined,
//       checkpointURL,
//       metadataURL
//     );

//     await recognizer.ensureModelLoaded();

//     recognizerRef.current = recognizer;
//     setClassLabels(recognizer.wordLabels());

//     recognizer.listen(
//       async (result) => {
//         if (result.scores instanceof Float32Array) {
//           setScores(Array.from(result.scores));
//         } else if (Array.isArray(result.scores)) {
//           setScores(result.scores.flatMap((arr) => Array.from(arr)));
//         } else {
//           console.warn("Unexpected scores type:", result.scores);
//           setScores([]);
//         }
//         return Promise.resolve(); // Explicitly return a Promise<void>
//       },
//       {
//         includeSpectrogram: true,
//         probabilityThreshold: 0.75,
//         invokeCallbackOnNoiseAndUnknown: true,
//         overlapFactor: 0.5,
//       }
//     );

//     setIsListening(true);
//   };

//   const stopListening = () => {
//     recognizerRef.current?.stopListening();
//     setIsListening(false);
//   };

//   return (
//     <div className="p-4 space-y-4 text-center">
//       <h1 className="text-2xl font-bold">Teachable Machine Audio Model</h1>
//       <button
//         type="button"
//         onClick={isListening ? stopListening : init}
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//       >
//         {isListening ? "Stop" : "Start"}
//       </button>

//       <div id="label-container" className="mt-4 space-y-1">
//         {classLabels.map((label, index) => (
//           <div key={label}>
//             {label}: {scores[index]?.toFixed(2) ?? "0.00"}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AudioModel;
