"use client";
import Image from "next/image";
import logo from "../public/Images/Artistry.png";

export default function Sidebar() {
  return (
    <>
         <div>
            <Image src={logo} alt="Logo" width={150} height={200} />

            <nav>
                
            </nav>
        </div>

    </>
    );
}