// // app/practice/page.tsx
// "use client";

// import { useState, useEffect, useRef, useMemo } from "react";
// import Link from "next/link";
// import useSpeechRecognition from "@/hook/useSpeechRecognition";
// import useTeachableMachine from "@/hook/useTeachableMachine";

// // Types
// type FillerWord = {
//   type: string;
//   count: number;
//   timestamp: number;
// };

// type FillerSummary = {
//   type: string;
//   count: number;
//   percentage: number;
// };

// const FILLER_TYPES = ["umm", "uhh", "like", "you know"];

// const PracticePage = () => {
//   // State
//   const [isSessionActive, setIsSessionActive] = useState(false);
//   const [sessionTime, setSessionTime] = useState(0);
//   const [detectedFillers, setDetectedFillers] = useState<FillerWord[]>([]);
//   const [feedback, setFeedback] = useState<string>("");
//   const [totalWordCount, setTotalWordCount] = useState(0);

//   // Refs
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const startTimeRef = useRef<number>(0);

//   // Speech recognition hook
//   const speech = useSpeechRecognition({
//     continuous: true,
//     interimResults: true,
//     onFinalResult: (transcript) => {
//       // Count words in the transcript
//       const wordCount = transcript.trim().split(/\s+/).length;
//       setTotalWordCount((prev) => prev + wordCount);
//     },
//     onError: (error) => {
//       setFeedback(`Speech recognition error: ${error}`);
//     },
//   });

//   // Teachable Machine hook for filler detection
//   const teachableMachine = useTeachableMachine({
//     modelURL: "/models/filler-detection-model/model.json",
//     metadataURL: "/models/filler-detection-model/metadata.json",
//     confidenceThreshold: 0.75,
//     onPrediction: (results) => {
//       // Filter out background class and look for filler words
//       const fillers = results.filter(
//         (r) => FILLER_TYPES.includes(r.className) && r.probability > 0.75
//       );

//       if (fillers.length > 0 && isSessionActive) {
//         // Get the highest confidence filler
//         const topFiller = fillers.reduce((prev, current) =>
//           prev.probability > current.probability ? prev : current
//         );

//         // Add to detected fillers
//         const newFiller: FillerWord = {
//           type: topFiller.className,
//           count: 1,
//           timestamp: Math.floor((Date.now() - startTimeRef.current) / 1000),
//         };

//         setDetectedFillers((prev) => [...prev, newFiller]);
//       }
//     },
//     onError: (error) => {
//       setFeedback(`Model error: ${error.message}`);
//     },
//   });

//   // Start practice session
//   const startSession = async () => {
//     // Reset states
//     setDetectedFillers([]);
//     setSessionTime(0);
//     setTotalWordCount(0);
//     setFeedback("");
//     speech.resetTranscript();

//     // Start tracking time
//     startTimeRef.current = Date.now();
//     timerRef.current = setInterval(() => {
//       setSessionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
//     }, 1000);

//     // Start speech recognition
//     speech.startListening();

//     // Start teachable machine
//     teachableMachine.startClassification();

//     setIsSessionActive(true);
//   };

//   // End practice session
//   const endSession = () => {
//     // Stop timers
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }

//     // Stop speech recognition
//     speech.stopListening();

//     // Stop teachable machine
//     teachableMachine.stopClassification();

//     setIsSessionActive(false);
//   };

//   // Calculate statistics
//   const stats = useMemo(() => {
//     // Count filler words by type
//     const fillerCounts = FILLER_TYPES.map((type) => {
//       const count = detectedFillers.filter((f) => f.type === type).length;
//       return {
//         type,
//         count,
//         percentage:
//           totalWordCount > 0
//             ? Math.round((count / totalWordCount) * 100 * 10) / 10
//             : 0,
//       };
//     }).filter((f) => f.count > 0);

//     // Sort by count, descending
//     fillerCounts.sort((a, b) => b.count - a.count);

//     // Calculate total fillers
//     const totalFillers = detectedFillers.length;

//     // Calculate fillers per minute
//     const fillersPerMinute =
//       sessionTime > 0
//         ? Math.round((totalFillers / (sessionTime / 60)) * 10) / 10
//         : 0;

//     // Calculate filler percentage of total words
//     const fillerPercentage =
//       totalWordCount > 0
//         ? Math.round((totalFillers / totalWordCount) * 100 * 10) / 10
//         : 0;

//     return {
//       totalFillers,
//       fillersPerMinute,
//       fillerPercentage,
//       fillerCounts,
//       wordsPerMinute:
//         sessionTime > 0
//           ? Math.round((totalWordCount / (sessionTime / 60)) * 10) / 10
//           : 0,
//     };
//   }, [detectedFillers, sessionTime, totalWordCount]);

//   // Format time as MM:SS
//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const getColorForFillerType = (fillerType: string): string => {
//     switch (fillerType.toLowerCase()) {
//       case "umm":
//         return "red";
//       case "uhh":
//         return "orange";
//       case "like":
//         return "blue";
//       case "you know":
//         return "purple";
//       default:
//         return "gray";
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <header className="mb-8 text-center">
//         <h1 className="text-3xl font-bold mb-2">Speech Practice</h1>
//         <p className="text-gray-600">
//           Practice your speech and track filler words in real-time
//         </p>
//       </header>

//       {/* Status indicators */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div
//           className={`p-4 rounded-lg text-center ${
//             teachableMachine.isLoaded ? "bg-green-100" : "bg-yellow-100"
//           }`}
//         >
//           <div className="text-lg font-semibold">Model Status</div>
//           <div>
//             {teachableMachine.isLoaded
//               ? "Ready"
//               : teachableMachine.isLoading
//               ? "Loading..."
//               : "Not Loaded"}
//           </div>
//         </div>

//         <div
//           className={`p-4 rounded-lg text-center ${
//             speech.isSupported ? "bg-green-100" : "bg-red-100"
//           }`}
//         >
//           <div className="text-lg font-semibold">Speech Recognition</div>
//           <div>
//             {speech.isSupported
//               ? speech.isListening
//                 ? "Listening"
//                 : "Ready"
//               : "Not Supported"}
//           </div>
//         </div>

//         <div className="p-4 rounded-lg bg-blue-100 text-center">
//           <div className="text-lg font-semibold">Session Time</div>
//           <div>{formatTime(sessionTime)}</div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex justify-center gap-4 mb-8">
//         <button
//           onClick={isSessionActive ? endSession : startSession}
//           disabled={!teachableMachine.isLoaded || !speech.isSupported}
//           className={`px-6 py-3 rounded-lg font-medium focus:outline-none transition-colors ${
//             isSessionActive
//               ? "bg-red-600 hover:bg-red-700 text-white"
//               : "bg-green-600 hover:bg-green-700 text-white"
//           } ${
//             !teachableMachine.isLoaded || !speech.isSupported
//               ? "opacity-50 cursor-not-allowed"
//               : ""
//           }`}
//         >
//           {isSessionActive ? "End Practice Session" : "Start Practice Session"}
//         </button>

//         <Link href="/dashboard">
//           <button className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium focus:outline-none transition-colors">
//             Back to Dashboard
//           </button>
//         </Link>
//       </div>

//       {/* Error/feedback message */}
//       {(feedback || teachableMachine.error || speech.error) && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
//           <p>{feedback || teachableMachine.error || speech.error}</p>
//         </div>
//       )}

//       {/* Main content area */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left column - Speech area */}
//         <div className="space-y-6">
//           {/* Transcription display */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-3 border-b pb-2">
//               Live Transcription
//             </h2>
//             <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
//               {speech.finalTranscript ? (
//                 <div>
//                   <p className="mb-2 text-gray-800">{speech.finalTranscript}</p>
//                   {speech.interimTranscript && (
//                     <p className="text-gray-500 italic">
//                       {speech.interimTranscript}
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 italic">
//                   {isSessionActive
//                     ? "Listening... Start speaking to see transcription."
//                     : "Start a practice session to begin."}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Current detection */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-3 border-b pb-2">
//               Current Detection
//             </h2>
//             <div className="text-center py-6">
//               {isSessionActive ? (
//                 teachableMachine.classifications.length > 0 ? (
//                   <div>
//                     {teachableMachine.classifications
//                       .filter((c) => c.probability > 0.4)
//                       .slice(0, 3)
//                       .map((classification, index) => (
//                         <div
//                           key={index}
//                           className={`text-lg ${
//                             FILLER_TYPES.includes(classification.className) &&
//                             classification.probability > 0.75
//                               ? "text-red-600 font-bold"
//                               : "text-gray-700"
//                           }`}
//                         >
//                           {classification.className}:{" "}
//                           {Math.round(classification.probability * 100)}%
//                         </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">Waiting for audio...</p>
//                 )
//               ) : (
//                 <p className="text-gray-500">
//                   Start a session to see audio classification
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right column - Statistics and analysis */}
//         <div className="space-y-6">
//           {/* Overall stats */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-3 border-b pb-2">
//               Session Statistics
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="p-3 bg-gray-50 rounded">
//                 <div className="text-gray-600 text-sm">Total Words</div>
//                 <div className="text-2xl font-bold">{totalWordCount}</div>
//               </div>
//               <div className="p-3 bg-gray-50 rounded">
//                 <div className="text-gray-600 text-sm">Words Per Minute</div>
//                 <div className="text-2xl font-bold">{stats.wordsPerMinute}</div>
//               </div>
//               <div className="p-3 bg-gray-50 rounded">
//                 <div className="text-gray-600 text-sm">Total Fillers</div>
//                 <div className="text-2xl font-bold">{stats.totalFillers}</div>
//               </div>
//               <div className="p-3 bg-gray-50 rounded">
//                 <div className="text-gray-600 text-sm">Fillers Per Minute</div>
//                 <div className="text-2xl font-bold">
//                   {stats.fillersPerMinute}
//                 </div>
//               </div>
//               <div className="p-3 bg-gray-50 rounded col-span-2">
//                 <div className="text-gray-600 text-sm">
//                   Filler Word Percentage
//                 </div>
//                 <div className="text-2xl font-bold">
//                   {stats.fillerPercentage}%
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Filler breakdown */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-3 border-b pb-2">
//               Filler Word Breakdown
//             </h2>
//             {stats.fillerCounts.length > 0 ? (
//               <div className="space-y-4">
//                 {stats.fillerCounts.map((filler: FillerSummary) => (
//                   <div key={filler.type} className="flex items-center">
//                     <div className="w-24 mr-4 capitalize">{filler.type}:</div>
//                     <div className="flex-grow">
//                       <div className="bg-gray-200 h-6 rounded-full overflow-hidden">
//                         <div
//                           className="bg-blue-500 h-full"
//                           style={{
//                             width: `${Math.min(filler.percentage * 2, 100)}%`,
//                           }}
//                         ></div>
//                       </div>
//                     </div>
//                     <div className="ml-4 w-20 text-right">
//                       {filler.count} ({filler.percentage}%)
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 italic text-center py-6">
//                 No filler words detected yet
//               </p>
//             )}
//           </div>

//           {/* Timeline visualization */}
//           {detectedFillers.length > 0 && (
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-semibold mb-3 border-b pb-2">
//                 Filler Word Timeline
//               </h2>
//               <div className="relative h-16 bg-gray-100 rounded-lg mt-4 mb-2">
//                 {sessionTime > 0 &&
//                   detectedFillers.map((filler, index) => {
//                     const position = (filler.timestamp / sessionTime) * 100;
//                     return (
//                       <div
//                         key={index}
//                         className={`absolute bottom-0 w-2 bg-${getColorForFillerType(
//                           filler.type
//                         )}-500 rounded-t`}
//                         style={{
//                           left: `${position}%`,
//                           height: `${Math.min(10 + Math.random() * 30, 40)}px`,
//                         }}
//                         title={`${filler.type} at ${formatTime(
//                           filler.timestamp
//                         )}`}
//                       />
//                     );
//                   })}

//                 {/* Time markers */}
//                 <div className="absolute bottom-0 transform translate-y-full w-full flex justify-between px-2 pt-1 text-xs text-gray-600">
//                   <span>0:00</span>
//                   <span>{formatTime(sessionTime)}</span>
//                 </div>
//               </div>

//               {/* Legend */}

//               <div className="flex flex-wrap gap-4 justify-center mt-6">
//                 {FILLER_TYPES.filter((type) =>
//                   detectedFillers.some((f) => f.type === type)
//                 ).map((type) => (
//                   <div key={type} className="flex items-center">
//                     <div
//                       className={`w-3 h-3 rounded-full bg-${getColorForFillerType(
//                         type
//                       )}-500 mr-1`}
//                     ></div>
//                     <span className="text-sm capitalize">{type}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer with tips */}
//       <footer className="mt-12 text-center text-gray-600">
//         <h3 className="text-lg font-medium mb-2">
//           Quick Tips for Reducing Filler Words
//         </h3>
//         <ul className="text-sm list-disc list-inside max-w-md mx-auto">
//           <li>Practice pausing instead of using fillers</li>
//           <li>Record yourself speaking and review your patterns</li>
//           <li>Practice speaking more slowly and deliberately</li>
//           <li>Join a speaking club like Toastmasters for regular practice</li>
//         </ul>
//       </footer>
//     </div>
//   );
// };

// export default PracticePage;
