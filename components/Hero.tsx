import { motion } from "framer-motion";
import { Link } from "react-scroll";
import React from "react";

function Hero() {
  return (
    <div className="   bg-[url(/waves.png)] bg-cover bg-no-repeat py-32 px-4 lg:py-8 ">
      <div className="mx-auto grid  max-w-screen-xl lg:grid-cols-12 lg:gap-12 lg:py-16 xl:gap-0">
        <div className="mr-auto mb-10 place-self-center px-2 lg:col-span-7 xl:col-span-8 xl:mb-0 ">
          <h1 className="mb-4 max-w-lg text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl xl:text-6xl">
            Reactive Shots NFT Marketplace
          </h1>

          <p className="mb-6 max-w-2xl font-light text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            The Reactive Shots NFT Marketplace is a place where you can buy
            photographic NFTs. The NFTs are created by the Reactive Shots.
          </p>
          <div className="w-56 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 p-1 ">
            <Link
              className=" flex w-full cursor-pointer flex-col items-center justify-center rounded-full  bg-black px-[20px] py-[10px] text-[14.7px] font-semibold text-white transition-all duration-300 active:scale-95"
              to="drops"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Checkout the Drops
            </Link>
          </div>
        </div>

        <div className=" col-span-2  lg:col-span-4  lg:block xl:col-span-4">
          <motion.img
            className="h-96 lg:h-full lg:w-full  object-contain"
            src="/nft.png"
            alt="Reactive Shots NFT Marketplace"
            //floating animation
            animate={{
              y: [0, -20, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
