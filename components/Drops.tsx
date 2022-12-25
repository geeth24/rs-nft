import React from "react";
import { urlFor } from "../sanity";
import { Collection } from "../typings";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  collections: Collection[];
}

function Drops({ collections }: Props) {
  return (
    <div
      id="drops"
      className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6"
    >
      <div className="text-center text-gray-900">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
          Drops by Reactive Shots
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14 lg:gap-12">
        {collections.map((collection, i) => (
          <Link
            href={`${
              collection.slug.current.charAt(0) === "c"
                ? ""
                : `/nft/${collection.slug.current}`
            }`}
            //is disabled if collection is not for sale
            passHref
          key={i + 1}
          >
            <motion.div
              className="mb-2 flex md:mb-0 md:flex-col"
             
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
              }}
              viewport={{ once: true, amount: 0.8 }}
            >
              <img
                className="mr-4 h-36 w-auto rounded-lg md:h-auto md:w-full"
                src={urlFor(collection.mainImage).url()}
                alt="office image"
              />
              <div>
                <h3 className="mb-2.5 text-xl font-bold text-white md:mt-4">
                  {collection.title}
                </h3>
                <p className="text-gray-400">{collection.description}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Drops;
