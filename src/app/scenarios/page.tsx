import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBriefcase,
  faDesktop,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function Scenarios() {
  return (
    <>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-black mb-2">
        Latihan Public Speaking
      </h1>
      <p className="text-gray-600 mb-8">
        Pilih skenario untuk berlatih dengan pendamping AI kami dan dapatkan
        umpan balik
      </p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <Link
          href="/scenarios"
          className="px-4 py-2 font-medium text-black border-b-2 border-primary-orange"
        >
          Skenario
        </Link>

        <Link
          href="/sessions"
          className="px-4 py-2 text-gray-500 hover:text-black"
        >
          Sesi Terbaru
        </Link>
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Interview Card */}
        <div className="bg-gray-100 rounded-xl p-8">
          <div className="mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <FontAwesomeIcon icon={faBriefcase} className="text-2xl" />
            </div>
          </div>

          <h2 className="text-2xl text-black font-bold mb-1">
            Wawancara Pekerjaan
          </h2>
          <p className="text-gray-600 mb-6">
            Berlatih menjawab pertanyaan wawancara umum dengan pewawancara AI
          </p>

          <div className="flex justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span>Tingkat Kesulitan: Pemula hingga Mahir</span>
            </div>
            <div className="text-sm text-gray-600">
              <span>Durasi: 10-20 menit</span>
            </div>
          </div>

          <Link href="/practice">
            <button className="w-full bg-primary-orange hover:bg-secondary-orange text-white py-3 px-4 rounded-lg flex items-center justify-center">
              <span className="mr-2">Mulai Latihan</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-10 h-10" />
            </button>
          </Link>
        </div>

        {/* Business Presentation Card */}
        <div className="bg-gray-100 rounded-xl p-8">
          <div className="mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <FontAwesomeIcon icon={faDesktop} className="text-2xl" />
            </div>
          </div>

          <h2 className="text-2xl text-black font-bold mb-1">
            Presentasi Bisnis
          </h2>
          <p className="text-gray-600 mb-6">
            Berlatih menyampaikan presentasi yang menarik kepada pemangku
            kepentingan
          </p>

          <div className="flex justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span>Tingkat Kesulitan: Menengah</span>
            </div>
            <div className="text-sm text-gray-600">
              <span>Durasi: 15-25 menit</span>
            </div>
          </div>

          <Link href="/practice">
            <button className="w-full bg-primary-orange hover:bg-secondary-orange text-white py-3 px-4 rounded-lg flex items-center justify-center">
              <span className="mr-2">Mulai Latihan</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-10 h-10" />
            </button>
          </Link>
        </div>

        {/* Team Meeting Card */}
        <div className="bg-gray-100 rounded-xl p-8">
          <div className="mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-2xl" />
            </div>
          </div>

          <h2 className="text-2xl text-black font-bold mb-1">Pertemuan tim</h2>
          <p className="text-gray-600 mb-6">
            Pimpin rapat tim dan berlatih menangani pertanyaan dan keberatan
          </p>

          <div className="flex justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span>Tingkat Kesulitan: Menengah</span>
            </div>
            <div className="text-sm text-gray-600">
              <span>Durasi: 15-25 menit</span>
            </div>
          </div>

          <Link href="/practice">
            <button className="w-full bg-primary-orange hover:bg-secondary-orange text-white py-3 px-4 rounded-lg flex items-center justify-center">
              <span className="mr-2">Mulai Latihan</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-10 h-10" />
            </button>
          </Link>
        </div>

        {/* Sales Pitch Card */}
        <div className="bg-gray-100 rounded-xl p-8">
          <div className="mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <FontAwesomeIcon icon={faTrophy} className="text-2xl" />
            </div>
          </div>

          <h2 className="text-2xl text-black font-bold mb-1">
            Presentasi Penjualan
          </h2>
          <p className="text-gray-600 mb-6">
            Menyampaikan presentasi penjualan yang meyakinkan dan menangani
            keberatan
          </p>

          <div className="flex justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span>Tingkat Kesulitan: Mahir</span>
            </div>
            <div className="text-sm text-gray-600">
              <span>Durasi: 10-15 menit</span>
            </div>
          </div>

          <Link href="/practice">
            <button className="w-full bg-primary-orange hover:bg-secondary-orange text-white py-3 px-4 rounded-lg flex items-center justify-center">
              <span className="mr-2">Mulai Latihan</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-10 h-10" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
