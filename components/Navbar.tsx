import { useState } from "react";
import Image from "next/image";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Link } from "react-scroll";
export default function Navbar() {
  const [isMenu, setIsMenu] = useState(false);

  //Auth
  const address = useAddress();
  const disconnect = useDisconnect();
  const metamaskWallet = useMetamask();

  console.log("address", address);
  return (
    <nav
      className={`fixed top-0 left-0 z-50 flex w-full flex-row bg-black/50 py-[13px] px-[16px] text-[#222222] backdrop-blur-md md:px-[4vw] lg:-mt-5 lg:pt-[35px] ${
        isMenu
          ? "h-screen items-start bg-transparent"
          : "h-auto items-center bg-transparent"
      }`}
    >
      <div
        className={`flex flex-row items-center  justify-center space-x-4 
      ${isMenu ? "hidden lg:flex" : "flex-row"}`}
      >
        <Image
          src="/Camera.png"
          width={40}
          height={40}
          alt=""
          className="lg:h-[50px] lg:w-[50px]"
        />
        <h1
          className={`text-xl font-bold text-white drop-shadow lg:text-3xl  
        ${isMenu ? "hidden" : "block"}`}
        >
          NFT Marketplace
        </h1>
      </div>
      <div
        className={`fixed top-0 left-0 flex h-screen w-screen flex-col gap-[40px] px-[59px] pt-[100px]  text-left text-[45px] font-bold text-blue-200 transition-all duration-300 lg:hidden lg:-translate-x-[78px] lg:px-0 ${
          !isMenu && "pointer-events-none -z-50 -translate-y-20 opacity-0"
        } ${isMenu && "-z-10"}`}
      >
        <a className="w-full border-b-2 border-gray-200/10">Home</a>
        {/* <a className="w-full border-b-2 border-gray-200/10">About</a> */}
        <a className="w-full border-b-2 border-gray-200/10">Drops</a>
        <a className="w-full border-b-2 border-gray-200/10">Contact</a>
      </div>

      <div className="flex flex-row items-center justify-center gap-[47px] text-white  lg:ml-auto ">
        {/* <a className="hidden cursor-pointer text-[14.7px] font-semibold transition-all duration-300 hover:text-[#178BFF] lg:block lg:text-[21px]">
          About
        </a> */}
        <Link
          className="hidden cursor-pointer text-[14.7px] font-semibold transition-all duration-300 hover:text-[#178BFF] lg:block lg:text-[21px]"
          to="drops"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Drops
        </Link>
        <a className="hidden cursor-pointer text-[14.7px] font-semibold transition-all duration-300 hover:text-[#178BFF] lg:block lg:text-[21px]">
          Contact
        </a>
      </div>
      <div className=" ml-auto mr-[20px] rounded-full   bg-gradient-to-br from-blue-600 to-sky-400 p-1  lg:ml-10">
        <button
          className="flex flex-col items-center justify-center rounded-full  bg-black  px-[20px] py-[10px] text-[14.7px] font-semibold text-white transition-all duration-300 active:scale-95"
          onClick={() => {
            if (address) {
              disconnect();
            } else {
              metamaskWallet();
            }
          }}
        >
          {address
            ? ` ${address.substring(0, 5)}...${address.substring(
                address.length - 5
              )}`
            : "Connect"}
        </button>
      </div>
      <div
        className=" group   z-50 flex cursor-pointer flex-col items-center justify-center gap-[3px] rounded-full   bg-black bg-gradient-to-br from-blue-600 to-sky-400 p-1  text-black  transition-all duration-300 active:bg-black lg:ml-10 lg:hidden lg:hover:bg-black"
        onClick={() => {
          setIsMenu(!isMenu);
        }}
      >
        <div
          className={`group z-50  flex cursor-pointer flex-col items-center justify-center gap-[3px]  rounded-full bg-black  px-[15px] py-[15px] text-white transition-all duration-300 active:bg-black lg:hidden lg:hover:bg-black ${
            isMenu && " bg-black"
          }`}
        >
          <div
            className={`h-[2px] w-[13.81px] rounded-full bg-blue-400 transition-all duration-300 lg:group-hover:bg-black ${
              isMenu && "translate-y-[4.5px] -rotate-45 bg-black"
            }`}
          />
          <div
            className={`h-[2px] w-[13.81px] rounded-full bg-blue-400 transition-all duration-300 lg:group-hover:bg-black ${
              isMenu && "rotate-45 bg-black"
            }`}
          />
          <div
            className={`h-[2px] w-[13.81px] rounded-full bg-blue-400 transition-all duration-300 lg:group-hover:bg-black ${
              isMenu && "-translate-y-[6px] rotate-45 bg-black"
            }`}
          />
        </div>
      </div>
    </nav>
  );
}
