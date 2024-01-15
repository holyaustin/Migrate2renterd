"use client";

import Card from "@/components/card";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import {
  downloadFromRentred,
  uploadToRenterd,
} from "./api/siaServices";
import { downloadFromS3, uploadToS3 } from "./api/s3Services";
import LoginModal from "@/components/modal";
import Loader from "@/components/loader";

export default function Home() {
  const [activeTab, setActiveTab] = useState("aws");
  const [awsFiles, setAwsFiles] = useState<Array<{}>>([]);
  const [siaFiles, setSiaFiles] = useState<Array<{}>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileInput = async (e: any) => {
    setLoading(true);
    if (activeTab === "aws") {
      await uploadToS3(e.target.files[0]);
      window.location.reload();
    } else {
      await uploadToRenterd(e.target.files[0]);
      window.location.reload();
    }
    setLoading(false);
  };

  const [value] = useLocalStorage("token", "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const awsList = await downloadFromS3();
        setAwsFiles(awsList);
        const siaList = await downloadFromRentred();
        setSiaFiles(siaList);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className=" w-full max-w-xl px-5 xl:px-0 z-10">
        <a
          href="https://twitter.com/steventey/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5  flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-black px-7 py-2 transition-colors hover:bg-green-200"
        >
          <h6>🟢</h6>
          <p className="text-sm font-semibold text-[#4ef01d]">
            Migrate2renterd

          </p>
        </a>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Migrate from AWS to Sia via renterd</Balancer>
        </h1>
        <p
          className="mt-5 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Easily migrate your data from AWS to Sia decentralized cloud storage
            via renterd
          </Balancer>
        </p>
      </div>
      <LoginModal toggleModal={() => setIsOpen(false)} isOpen={isOpen} />
      {value ? (
        <>
          <div
            className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <button
              onClick={() => setActiveTab("aws")}
              className={`flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 ${
                activeTab === "aws"
                  ? " bg-[#1ED660] px-5 py-2 text-sm text-white shadow-md transition-colors hover:border-green-200"
                  : "bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-green-200"
              }`}
            >
              <p>AWS s3 bucket</p>
            </button>
            <button
              onClick={() => setActiveTab("sia")}
              className={`flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 ${
                activeTab === "sia"
                  ? "bg-[#1ED660] px-5 py-2 text-sm text-white shadow-md transition-colors hover:border-green-200"
                  : "bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-green-200"
              } `}
            >
              <p>
                <span className="hidden sm:inline-block">Sia Cloud</span>{" "}
                Renterd
              </p>
            </button>
          </div>
          <div className="my-10 grid w-screen max-w-screen-xl animate-fade-up grid-cols-1 gap-5 border px-5 md:grid-cols-3 xl:px-0">
            {activeTab === "aws"
              ? awsFiles.map((file, index) => (
                  <Card key={index} file={file} type="aws" />
                ))
              : siaFiles.map((file, index) => (
                  <Card key={index} file={file} type="sia" />
                ))}
          </div>
          {loading ? (
            <Loader />
          ) : (
            <label
              htmlFor="file"
              className="cursor-pointer fixed bottom-20 right-20 z-10 h-14 w-14 flex items-center justify-center rounded-full bg-[#1ED660] text-4xl text-white transition-all hover:bg-white hover:text-[#1ED660] "
            >
              +
            </label>
          )}
          <input
            type="file"
            id="file"
            onChange={handleFileInput}
            className="hidden"
          />
        </>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className=" z-10 mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border bg-black px-5 py-2 text-sm text-white shadow-s transition-colors hover:border-green-200 hover:bg-white hover:text-black  "
        >
          <p>Store your File on Sia</p>
        </button>
      )}
    </>
  );
}
