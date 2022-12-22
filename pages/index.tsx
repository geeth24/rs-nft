import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { sanityClient, urlFor } from "../sanity";
import { Collection } from "../typings";

interface Props {
  collections: Collection[];
}
function Home({ collections }: Props) {
  console.log(collections);
  return (
    <div className="h-screen  bg-black">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0">
        <Head>
          <title>NFT Drop</title>
        </Head>
        <h1 className="mb-10 text-4xl font-extralight text-white">
          The {` `}{" "}
          <span className="font-extrabold underline decoration-violet-700/50 ">
            Reactive Shots
          </span>{" "}
          {` `}NFT Marketplace
        </h1>
        <main className="bg-gray-900 p-10 shadow-xl shadow-purple-400/20">
          <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {collections.map((collection) => (
              <Link href={`/nft/${collection.slug.current}`} key={collection._id}>
                <div className="flex transform cursor-pointer flex-col items-center transition duration-500 ease-in-out hover:scale-105">
                  <img
                    className="h-60 w-96 rounded-2xl object-cover"
                    src={urlFor(collection.mainImage).url()}
                  />
                  <h2 className="text-3xl text-white">{collection.title}</h2>
                  <p className="mt-2 text-sm text-gray-300">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
        _id,
        title,
        address,
        description,
        nftCollectionName,
        mainImage{
          asset
        },
        previewImage {
          asset
        },
        slug {
          current
        },
        creator-> {
            _id,
            name,
            address,
            slug{
              current
            },
        },
}
`;

  const collections = await sanityClient.fetch(query).catch((err) => {
    console.log(err);
  });
  console.log(collections);
  return {
    props: {
      collections,
    },
  };
};
