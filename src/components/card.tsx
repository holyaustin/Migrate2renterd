/* eslint-disable @next/next/no-img-element */
import { handleS3Delete } from "@/app/api/s3Services";
import { handleSiaDelete, uploadToRenterd } from "@/app/api/siaServices";
import { handleMigration } from "@/lib/utils";
import React, { useState } from "react";

export default function Card({ file, type }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = (file: any) => {
    if (type === "aws") {
      handleS3Delete(file.key);
    } else {
      handleSiaDelete(file.name);
    }
  };

  return (
    <div
      className={` animate-fade-up relative col-span-1 flex flex-wrap overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={type === "aws" ? file.url.split("?")[0] : file.url}
          alt={type === "aws" ? file.url.split("?")[0] : file.url}
          className="mx-auto max-w-md text-center"
          style={{
            flex: "1 0 auto",
            objectFit: "fill",
            height: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        />
      </div>
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => handleDelete(file)}
            className="flex max-w-fit animate-fade-up items-center justify-center overflow-hidden rounded-full bg-red-100 px-7 py-2 text-sm font-semibold text-[#c44e4e] transition-colors hover:bg-red-200"
          >
            🗑️ Delete
          </button>
          {type === "aws" && (
            <button
              onClick={() => handleMigration(file)}
              className="flex max-w-fit animate-fade-up items-center justify-center overflow-hidden rounded-full bg-green-100 px-7 py-2 text-sm font-semibold text-[#4ef01d] transition-colors hover:bg-green-200"
            >
              Migrate to Sia
            </button>
          )}
        </div>
      )}
    </div>
  );
}
