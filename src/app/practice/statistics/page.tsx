import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

export default function PracticeStatistics() {
  return (
    <>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-black mb-2">
        Ringkasan Umpan Balik
      </h1>
      <p className="text-gray-600 mb-8">Wawancara Pekerjaan - 6/5/2025</p>

      {/* Points Earned Card */}
      <div className="bg-light-orange border border-semi-light-orange rounded-lg p-5 mb-6">
        <div className="flex justify-between">
          <p className="font-medium text-lg text-primary-orange">
            Poin Diperoleh!
          </p>
          <div>
            <Link href="/my-tiger">
              <button className="w-full bg-primary-orange text-white text-sm px-4 py-2 rounded-md mb-3 flex items-center justify-center hover:bg-secondary-orange">
                <FontAwesomeIcon icon={faCat} className="mr-2" />
                Lihat Harimau Saya
              </button>
            </Link>
          </div>
        </div>
        <p className="mb-1">
          Anda memperoleh{" "}
          <span className="font-bold text-primary-orange">75 poin</span> dengan
          menyelesaikan sesi latihan ini!
        </p>
        <p className="text-gray-600 text-sm mb-4">
          Teruslah berlatih untuk meningkatkan level harimau Anda dan membuka
          kustomisasi baru.
        </p>

        <div className="mb-1 flex justify-between text-sm">
          <span>Kemajuan untuk level berikutnya</span>
          <span>15%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-secondary-orange rounded-full h-2"
            style={{ width: "15%" }}
          ></div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Overall Score */}
        <div className="rounded-lg p-5 border border-gray-200">
          <h2 className="font-semibold mb-1">Skor Keseluruhan</h2>
          <p className="text-gray-500 text-sm mb-4">
            Berdasarkan performa Anda
          </p>
          <div className="flex justify-center">
            <div className="progress-circle">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle className="progress-bg" cx="60" cy="60" r="45"></circle>
                <circle
                  className="progress-value"
                  cx="60"
                  cy="60"
                  r="45"
                ></circle>
              </svg>
              <div className="progress-text">78</div>
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div className="rounded-lg p-5 border border-gray-200">
          <h2 className="font-semibold mb-1">Kekuatan</h2>
          <p className="text-gray-500 text-sm mb-4">
            Apa yang Anda lakukan dengan baik
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </span>
              <span>Artikulasi yang jelas dari poin-poin utama</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </span>
              <span>Intonasi suara yang variatif</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </span>
              <span>Penggunaan jeda yang efektif untuk penekanan</span>
            </li>
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="rounded-lg p-5 border border-gray-200">
          <h2 className="font-semibold mb-1">Area yang Perlu Ditingkatkan</h2>
          <p className="text-gray-500 text-sm mb-4">
            Apa yang perlu difokuskan di lain waktu
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-amber-500 mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
                  />
                </svg>
              </span>
              <span>Kurangi kata-kata isian</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
                  />
                </svg>
              </span>
              <span>Bicaralah dengan kecepatan yang lebih konsisten</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
                  />
                </svg>
              </span>
              <span>Volume suara kurang stabil</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Speaking Metrics */}
        <div className="rounded-lg p-5 border border-gray-200">
          <h2 className="font-semibold mb-1">Metrik Berbicara</h2>
          <p className="text-gray-500 text-sm mb-4">
            Perincian detail tentang kinerja Anda
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Kejelasan</span>
                <span>82/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Kepercayaan</span>
                <span>75/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Kecepatan</span>
                <span>68/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "68%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Kosakata</span>
                <span>85/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Intonasi</span>
                <span>80/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filler Words */}
        <div className="rounded-lg p-5 border border-gray-200">
          <h2 className="font-semibold mb-1">Kata-Kata Isian</h2>
          <p className="text-gray-500 text-sm mb-4">
            Kata-kata yang perlu dikurangi saat Anda bicara
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Um</span>
                <span>12 kali</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Eh</span>
                <span>8 kali</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Uh</span>
                <span>15 kali</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Anda tahu</span>
                <span>6 kali</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Jadi</span>
                <span>18 kali</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-orange rounded-full h-2"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Statistics */}
      <div className="rounded-lg p-5 border border-gray-200 mb-6">
        <h2 className="font-semibold mb-1">Statistik Sesi</h2>
        <p className="text-gray-500 text-sm mb-4">
          Data kuantitatif tentang sesi Anda
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Durasi</p>
              <p className="font-bold">05:10</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Kata</p>
              <p className="font-bold">1500</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Kecepatan Bicara</p>
              <p className="font-bold">145 kata per menit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between">
        <Link href="/scenarios">
          <button className="flex items-center text-gray-800 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Kembali ke Skenario
          </button>
        </Link>

        <div className="flex space-x-3">
          <Link href="/practice">
            <button className="bg-primary-orange text-white rounded-lg px-4 py-2 hover:bg-secondary-orange">
              Latihan Lagi
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
