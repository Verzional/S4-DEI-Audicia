import Image from "next/image";

const Tiger = () => {
  return (
    <>
      {/* Left Column - My Tiger */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white rounded-lg border border-gray-150 p-6">
          <h2 id="tigerName" className="text-xl font-bold text-gray-900 mb-1">
            Lantaro
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Pendamping latihan public speaking Anda
          </p>

          <Image
            src="/audicia-custom.png"
            alt="My Tiger"
            width={480}
            height={480}
            className="rounded-lg mb-4 mt-4"
          />

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Level 5</span>
              <span>350/500</span>
            </div>
            <div className="w-full bg-gray-150 rounded-full h-2">
              <div
                className="bg-secondary-orange rounded-full h-2"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tiger;
