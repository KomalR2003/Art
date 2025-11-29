import Image from "next/image";
import Avtar from "../public/Images/avtar.png";
import logo from "../public/Images/Artistry.png";

export default function Header() {
  return (
    <div className="mt-8">
    <div className="flex justify-between mx-auto w-11/12 ">
     <Image src={logo} alt="Artistry Logo" width={150} height={40} />
     <p className="hidden md:block">Good morning! let art inspire your day ahead.</p>
     <div className="flex">
           <Image src={Avtar} alt="User Avtar" width={40} height={40} />
           <p className="mt-2 ms-2">Komal Ribadiya</p>
     </div>
    </div>
    </div>
  );
}
