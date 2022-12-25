import { useContract } from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Drops from "../components/Drops";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { sanityClient, urlFor } from "../sanity";
import { Collection } from "../typings";

interface Props {
  collections: Collection[];
}
function Home({ collections }: Props) {
  console.log(collections);

  const nftDrop = useContract(collections[0].address, "nft-drop").contract;
  var imagesArray: any[] = [];

  React.useEffect(() => {
    if (!nftDrop) return;

    const getNftDrop = async () => {
      var randomNumbers = [];
      for (var i = 0; i < 10; i++) {
        randomNumbers.push(Math.floor(Math.random() * 77));
      }

      for (var i = 0; i < randomNumbers.length; i++) {
        const nftDropData = await nftDrop.get(randomNumbers[i]);
        imagesArray.push({ image: nftDropData.metadata.image });
        console.log(nftDropData.metadata.image);
      }
    };
    getNftDrop();
    console.log(imagesArray);
  }, [nftDrop]);

  return (
    <div>
      <Head>
        <title>RS | NFT Marketplace</title>
      </Head>
      <Navbar />
      <Hero />
      <Drops collections={collections} />
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
