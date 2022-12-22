import React from "react";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useContract,
} from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import { Collection } from "../../typings";
import Link from "next/link";
import { BigNumber } from "ethers";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Head from "next/head";

interface Props {
  collection: Collection;
}
function NFTDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = React.useState<number>(0);
  const [totalSupply, setTotalSupply] = React.useState<BigNumber>();
  const [price, setPrice] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const nftDrop = useContract(collection.address, "nft-drop").contract;

  React.useEffect(() => {
    if (!nftDrop) return;
    const nftDropData = async () => {
      setLoading(true);
      const claimed = await nftDrop.getAllClaimed();
      const total = await nftDrop.totalSupply();
      setClaimedSupply(claimed.length);
      setTotalSupply(total);
      setLoading(false);
    };
    nftDropData();

    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll();
      setPrice(claimConditions?.[0].currencyMetadata.displayValue);
    };
    fetchPrice();
  }, [nftDrop]);

  const mintNFT = () => {
    if (!nftDrop || !address) return;

    const quantity = 1;
    setLoading(true);
    console.log(loading);
    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt;
        const claimedTokenId = tx[0].id;
        const claimedNFT = await tx[0].data;

        console.log("receipt", receipt);
        console.log("claimedTokenId", claimedTokenId);
        console.log("claimedNFT", claimedNFT);
        const nftDropData = async () => {
          setLoading(true);
          const claimed = await nftDrop.getAllClaimed();
          const total = await nftDrop.totalSupply();
          setClaimedSupply(claimed.length);
          setTotalSupply(total);
          setLoading(false);
        };
        nftDropData();
        setShow(true);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Auth
  const address = useAddress();
  const disconnect = useDisconnect();
  const metamaskWallet = useMetamask();

  console.log("address", address);
  const [show, setShow] = React.useState(false);

  return (
    <div className="flex h-screen flex-col bg-black lg:grid lg:grid-cols-10">
      <Head>
        <title>{collection.title}</title>
      </Head>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-gradient-to-br from-blue-700 to-cyan-900 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-100">
                      Successfully claimed NFT
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                      You can now view your NFT in your wallet.
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      {/*  This is the left side of the page */}
      <div className="bg-gradient-to-br from-blue-700 to-cyan-900 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="transform rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 p-2 shadow-2xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">
            <img
              src={urlFor(collection.previewImage).url()}
              alt="NFT"
              className="w-44 rounded-xl object-cover lg:h-72 lg:w-96"
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">
              {collection.title}
            </h1>
            <p className="text-xl text-gray-300">{collection.description}</p>
          </div>
        </div>
      </div>
      {/*  This is the right side of the page */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between ">
          <Link href="/">
            <h1 className="w-52 cursor-pointer text-xl font-extralight text-white sm:w-80">
              The {` `}{" "}
              <span className="font-extrabold underline decoration-violet-700/50 ">
                Reactive Shots
              </span>{" "}
              {` `}NFT Marketplace
            </h1>
          </Link>
          <button
            className="rounded-full bg-blue-900 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
            onClick={() => {
              address ? disconnect() : metamaskWallet();
            }}
          >
            {address ? "Connected" : "Connect Wallet"}
          </button>
        </header>
        <hr className="my-2 border-gray-300" />
        {address && (
          <div className="flex items-center justify-between text-blue-500">
            <p className="text-sm ">Connected to:</p>
            <p className="text-sm">
              {address.substring(0, 6)}...
              {address.substring(address.length - 5)}
            </p>
          </div>
        )}
        {/* Content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            className="w-80 object-cover pb-10"
            src={urlFor(collection.mainImage).url()}
            alt=""
          />
          <h1 className="text-3xl font-bold text-white lg:text-5xl lg:font-extrabold">
            Reactive Shots | NFT Drop
          </h1>
          {loading ? (
            <p className="animate-pulse pt-2 text-xl text-white">
              Loading NFT Supply...
            </p>
          ) : (
            <p className="pt-2 text-xl text-green-500">
              {" "}
              {claimedSupply} / {totalSupply?.toString()} NFT&apos;s claimed
            </p>
          )}
        </div>
        {/* Mint Button */}
        <button
          disabled={
            loading || claimedSupply === totalSupply?.toNumber() || !address
          }
          className="mt-10 flex w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-cyan-900 py-3 text-xl font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 lg:py-4 lg:text-2xl"
          onClick={mintNFT}
        >
          {loading ? (
            <>Loading...</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>NFT&apos;s claimed</>
          ) : !address ? (
            <>Connect Wallet To Mint</>
          ) : (
            <>Mint NFT ({price} ETH)</>
          )}
        </button>
      </div>
    </div>
  );
}

export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
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
  const collection = await sanityClient.fetch(query, { id: params?.id });
  console.log("collection", collection);

  if (!collection) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      collection,
    },
  };
};
