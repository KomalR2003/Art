import Image from "next/image";
import Avtar from "../public/Images/avtar.png";

export default function Header() {
  return (
    <div className="relative z-10 w-full border-b border-gray-800 bg-[#121212] py-4 px-8">
      <div className="flex items-center justify-between">
        {/* Left Side: Welcome Message */}
        <p className="text-gray-300 text-lg font-light hidden md:block"> Good morning! Let art inspire your day ahead.
</p>

        {/* Right Side: User Profile */}
        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-600 bg-gray-700">

            <Image
              src={Avtar}
              alt="User Avatar"
              width={40}
              height={40}
              className="object-cover h-full w-full"
            />
          </div>
          <p className="text-white font-medium">Komal Ribadiya</p>
        </div>
      </div>
    </div>
  );
}
