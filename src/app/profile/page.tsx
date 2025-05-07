import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCat,
  faHistory,
  faClock,
  faChartLine,
  faMicrophone,
  faTrophy,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Sessions */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
            <FontAwesomeIcon
              icon={faHistory}
              className="text-gray-500 w-5 h-5"
            />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Sesi</p>
            <p className="text-2xl font-bold">24</p>
          </div>
        </div>

        {/* Practice Time */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
            <FontAwesomeIcon icon={faClock} className="text-gray-500 w-5 h-5" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Waktu Latihan</p>
            <p className="text-2xl font-bold">18 jam 45 menit</p>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
            <FontAwesomeIcon
              icon={faChartLine}
              className="text-gray-500 w-5 h-5"
            />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Skor Rata-Rata</p>
            <p className="text-2xl font-bold">76</p>
          </div>
        </div>
      </div>

      {/* Recent Practice Sessions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Sesi Latihan Terbaru
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Sesi latihan public speaking terbaru Anda
        </p>

        {/* Session Item */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-primary-orange w-5 h-5"
              />
            </div>
            <div>
              <p className="font-medium hover:underline hover:cursor-pointer">
                Wawancara Pekerjaan
              </p>
              <p className="text-gray-500 text-sm">6/5/2025 • 15:20</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full mr-4">
              82
            </span>
            <button className="text-gray-700 hover:underline">Lihat</button>
          </div>
        </div>

        {/* Session Item */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-primary-orange w-5 h-5"
              />
            </div>
            <div>
              <p className="font-medium hover:underline hover:cursor-pointer">
                Presentasi Bisnis
              </p>
              <p className="text-gray-500 text-sm">5/5/2025 • 12:45</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-yellow-500 text-white text-sm font-medium px-2 py-1 rounded-full mr-4">
              78
            </span>
            <button className="text-gray-700 hover:underline">Lihat</button>
          </div>
        </div>

        {/* Session Item */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-primary-orange w-5 h-5"
              />
            </div>
            <div>
              <p className="font-medium hover:underline hover:cursor-pointer">
                Pertemuan Tim
              </p>
              <p className="text-gray-500 text-sm">4/5/2025 • 10:30</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full mr-4">
              85
            </span>
            <button className="text-gray-700 hover:underline">Lihat</button>
          </div>
        </div>

        {/* Session Item */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-primary-orange w-5 h-5"
              />
            </div>
            <div>
              <p className="font-medium hover:underline hover:cursor-pointer">
                Presentasi Penjualan
              </p>
              <p className="text-gray-500 text-sm">22/4/2025 • 14:15</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-yellow-500 text-white text-sm font-medium px-2 py-1 rounded-full mr-4">
              73
            </span>
            <button className="text-gray-700 hover:underline">Lihat</button>
          </div>
        </div>

        <Link href="/profile/history">
          <button className="w-full mt-4 py-3 text-white bg-primary-orange rounded-md hover:bg-secondary-orange">
            Lihat Semua Sesi
          </button>
        </Link>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Tiger Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-2">
            <div className="w-7 h-7 rounded-full bg-semi-light-orange mr-2">
              <span className="w-7 h-7 text-primary-orange flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faCat}
                  className="text-primary-orange w-5 h-5"
                />
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Harimau Saya</h2>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            Pendamping harimau Anda yang dapat disesuaikan
          </p>

          <div className="flex flex-col items-center mb-9">
            <div className="relative">
              <div className="w-40 h-40 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <Image
                  src="/audicia-custom.png"
                  alt=""
                  width={120}
                  height={120}
                />
              </div>
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Lvl 5
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center mb-12">
            Sesuaikan harimau Anda dengan poin yang diperoleh dari sesi latihan
          </p>

          <Link href="/my-tiger">
            <button className="w-full bg-primary-orange text-white py-3 rounded-md hover:bg-secondary-orange">
              Sesuaikan Harimau
            </button>
          </Link>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 mr-2">
              <FontAwesomeIcon icon={faTrophy} className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-gray-900">
              Pencapaian Terbaru
            </h2>
          </div>
          <p className="text-gray-600 text-sm mb-6">Pencapaian terbaru Anda</p>

          {/* Achievement Item */}
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon
                  icon={faAward}
                  className="text-primary-orange w-5 h-5"
                />
              </div>
              <p className="font-bold">Latihan Pertama</p>
            </div>
            <p className="text-gray-500 text-sm ml-11">
              Selesaikan sesi latihan pertama Anda
            </p>
          </div>

          {/* Achievement Item */}
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon
                  icon={faAward}
                  className="text-primary-orange w-5 h-5"
                />
              </div>
              <p className="font-bold">Skor Sempurna</p>
            </div>
            <p className="text-gray-500 text-sm ml-11">
              Dapatkan nilai 90+ dalam sesi latihan
            </p>
          </div>

          {/* Achievement Item */}
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon
                  icon={faAward}
                  className="text-gray-500 w-5 h-5"
                />
              </div>
              <p className="font-medium">Streak Latihan</p>
            </div>
            <p className="text-gray-500 text-sm ml-11">
              Berlatih selama 5 hari berturut-turut
            </p>
            <div className="ml-11 mt-2">
              <p className="text-sm mb-1">Kemajuan: 3/5</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary-orange rounded-full h-2 w-3/5"></div>
              </div>
            </div>
          </div>

          <Link href="/profile/achievements">
            <button className="w-full mt-4 py-3 bg-primary-orange text-white rounded-md hover:bg-secondary-orange">
              Lihat Semua Pencapaian
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
