import Image from "next/image";

type Outfit = {
  id: number;
  name: string;
  image: string;
  requiredLevel: number | null;
};

const outfits: Outfit[] = [
  {
    id: 1,
    name: "Atasan Merah Muda",
    image: "/outfit-1.png",
    requiredLevel: null,
  },
  { id: 2, name: "Rok Merah", image: "/outfit-2.png", requiredLevel: null },
  { id: 3, name: "Terkunci", image: "/locked.png", requiredLevel: 10 },
  { id: 4, name: "Terkunci", image: "/locked.png", requiredLevel: 10 },
  { id: 5, name: "Terkunci", image: "/locked.png", requiredLevel: 15 },
  { id: 6, name: "Terkunci", image: "/locked.png", requiredLevel: 10 },
  { id: 7, name: "Terkunci", image: "/locked.png", requiredLevel: 15 },
  { id: 8, name: "Terkunci", image: "/locked.png", requiredLevel: 20 },
  { id: 9, name: "Terkunci", image: "/locked.png", requiredLevel: 25 },
  { id: 10, name: "Terkunci", image: "/locked.png", requiredLevel: 30 },
];

export default function Outfits() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {outfits.map((outfit) => (
        <div
          key={outfit.id}
          className={`aspect-square border-2 rounded-lg ${
            outfit.requiredLevel
              ? "hover:cursor-not-allowed relative"
              : "hover:cursor-pointer"
          } hoverable-box`}
        >
          {outfit.requiredLevel && (
            <div className="absolute top-2 right-2 bg-primary-orange text-white text-xs px-2 py-1 rounded-full">
              Lvl {outfit.requiredLevel}
            </div>
          )}
          <div className="flex items-center justify-center">
            <Image src={outfit.image} alt="My Tiger" width={150} height={150} />
          </div>
          <p
            className={`text-center font-medium ${
              outfit.requiredLevel ? "text-gray-300" : "text-black"
            }`}
          >
            {outfit.name}
          </p>
        </div>
      ))}
    </div>
  );
}
