import Link from "next/link";

const ProfileTabs = () => {
  return (
    <>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 py-0">
        <Link href="/profile">
          <button className="px-4 py-2 pt-0 text-gray-500">Ringkasan</button>
        </Link>

        <Link href="/profile/history">
          <button className="px-4 py-2 pt-0 text-gray-500">
            Riwayat Latihan
          </button>
        </Link>

        <Link href="/profile/achievements">
          <button className="px-4 py-2 pt-0 border-b-2 border-primary-orange font-medium text-gray-900">
            Pencapaian
          </button>
        </Link>

        <Link href="/profile/statistics">
          <button className="px-4 py-2 pt-0 text-gray-500">Statistik</button>
        </Link>
      </div>
    </>
  );
};

export default ProfileTabs;
