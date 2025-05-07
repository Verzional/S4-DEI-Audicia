import Image from "next/image";

type Accessory = {
  id: number;
  name: string;
  image: string;
  requiredLevel: number | null; // null = unlocked, number = locked level
};

const accessories: Accessory[] = [
  {
    id: 1,
    name: "Kacamata Bulat",
    image: "/accessories-1.png",
    requiredLevel: null,
  },
  {
    id: 2,
    name: "Kacamata Hitam",
    image: "/accessories-2.png",
    requiredLevel: null,
  },
  {
    id: 3,
    name: "Pita Merah",
    image: "/accessories-3.png",
    requiredLevel: null,
  },
  { id: 4, name: "Mikrofon", image: "/accessories-4.png", requiredLevel: null },
  {
    id: 5,
    name: "Dasi Kupu-Kupu",
    image: "/accessories-5.png",
    requiredLevel: null,
  },
  { id: 6, name: "Terkunci", image: "/locked.png", requiredLevel: 10 },
  { id: 7, name: "Terkunci", image: "/locked.png", requiredLevel: 15 },
  { id: 8, name: "Terkunci", image: "/locked.png", requiredLevel: 20 },
  { id: 9, name: "Terkunci", image: "/locked.png", requiredLevel: 25 },
  { id: 10, name: "Terkunci", image: "/locked.png", requiredLevel: 30 },
];

export default function Accessories() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {accessories.map((accessory) => (
        <div
          key={accessory.id}
          className={`aspect-square border-2 rounded-lg ${
            accessory.requiredLevel
              ? "hover:cursor-not-allowed relative"
              : "hover:cursor-pointer"
          } hoverable-box`}
        >
          {accessory.requiredLevel && (
            <div className="absolute top-2 right-2 bg-primary-orange text-white text-xs px-2 py-1 rounded-full">
              Lvl {accessory.requiredLevel}
            </div>
          )}
          <div className="flex items-center justify-center">
            <Image
              src={accessory.image}
              alt="My Tiger"
              width={150}
              height={150}
            />
          </div>
          <p
            className={`text-center font-medium ${
              accessory.requiredLevel ? "text-gray-300" : "text-black"
            }`}
          >
            {accessory.name}
          </p>
        </div>
      ))}
    </div>
  );
}
