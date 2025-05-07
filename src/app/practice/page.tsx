"use client";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faCat, faMicrophone, faMicrophoneSlash, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Practice() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "ai" }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.warn("Speech Recognition API not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition() as SpeechRecognition & {
        onend: (() => void) | null;
      };

      recognition.lang = "id-ID";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setMessages((prev) => [...prev, { text: transcript, sender: "user" }]);

        setIsListening(false);

        setTimeout(() => {
          const aiResponse = generateAIResponse(transcript);
          setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);

          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 500);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleStartListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleReset = () => {
    setMessages([]); // Clear the conversation
    setIsListening(false); // Optional: stop listening
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stop any ongoing recognition
    }
    // Optional: Scroll chat to top
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  };

  const generateAIResponse = (userMessage: string) => {
    if (userMessage.toLowerCase().includes("halo")) {
      return "Halo juga, apa saja kelebihan dan kekurangan mu?";
    }
    if (userMessage.toLowerCase().includes("Kelebihan")) {
      return "Kelebihan mu sangat baik, tetapi kekurangan mu juga harus diperbaiki.";
    }
    return "Apakah bisa Anda menjelaskan lebih lanjut?";
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Latihan Wawancara Pekerjaan</h2>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-500" onClick={handleReset}>
            <FontAwesomeIcon icon={faRedo} className="w-10 h-10" />
          </button>

          <Link href="/practice/statistics">
            <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md">Akhiri Sesi</button>
          </Link>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="flex-1 bg-gray-200 h-2 rounded-full"></div>
        <span className="text-sm font-medium ml-4">0%</span>
      </div>

      <div ref={chatContainerRef} id="chat-area" className="chat-area border border-gray-200 rounded-lg p-6 mb-4 min-h-[400px] max-h-[400px] overflow-y-auto flex flex-col">
        {/* AI's Initial message */}
        <div className="flex mb-4">
          <div className="w-10 h-10 rounded-full bg-primary-orange mr-4 flex-shrink-0 flex items-center justify-center">
            <span className="w-10 h-10 text-white text-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faCat} className="w-10 h-10" />
            </span>
          </div>
          <div className="ai-chat-bubble bg-gray-100 p-4 rounded-lg max-w-[80%]">
            <p>
              Halo! Saya adalah pewawancara AI Anda hari ini. Kami sedang mencari kandidat yang cocok dengan perusahaan kami dan memiliki keterampilan yang kami butuhkan. Mari kita mulai dengan pertanyaan umum: Bisakah Anda ceritakan
              sedikit tentang diri Anda dan mengapa Anda tertarik dengan posisi ini?
            </p>
          </div>
        </div>

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
            {msg.sender === "ai" && (
              <div className="w-10 h-10 rounded-full bg-primary-orange mr-4 flex-shrink-0 flex items-center justify-center">
                <FontAwesomeIcon icon={faCat} className="text-white text-xl" />
              </div>
            )}
            <div className={`${msg.sender === "user" ? "user-chat-bubble bg-light-orange text-right" : "ai-chat-bubble bg-gray-100"} p-4 rounded-lg max-w-[80%]`}>
              <p>{msg.text}</p>
            </div>
            {msg.sender === "user" && (
              <div className="w-10 h-10 rounded-full bg-semi-light-orange ml-4 flex-shrink-0 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-primary-orange text-xl" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button id="mic-toggle" className={`p-3 text-white ${isListening ? "bg-red-500" : "bg-green-500"} rounded-l-lg hover:bg-green-600`} onClick={isListening ? handleStopListening : handleStartListening}>
            <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
          </button>
          <input id="user-input" type="text" placeholder="Respon Anda..." className="flex-1 p-3 focus:outline-none" />
          <button id="send-button" className="p-3 text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>

        <div id="voice-recognition" className={`voice-recognition ${isListening ? "" : "hidden"} bg-gray-100 mt-4 p-4 rounded-lg`}>
          <h3 className="font-medium mb-1">Pengenalan Suara Aktif</h3>
          <p className="text-gray-600 text-sm">Bicaralah dengan jelas ke mikrofon Anda. Suara Anda akan ditranskripsikan di sini.</p>
        </div>
      </div>
    </div>
  );
}
