"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

function PaintingItem({
  project,
  images,
}: {
  project: { title: string; _id: string; mainImage: string };
  images: string[];
}) {
  const { title, mainImage } = project;
  const [selecetedImg, setSelectedImg] = useState<string | undefined>(
    undefined,
  );

  useEffect(
    function () {
      if (selecetedImg) {
        const el = document.getElementById(project._id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }

      setTimeout(function () {
        if (selecetedImg) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      }, 50);
    },
    [project._id, selecetedImg],
  );

  function handleClick() {
    setSelectedImg(mainImage);
  }

  function handleSelectImg(img: string) {
    setSelectedImg(img);
  }

  return (
    <div>
      {selecetedImg && (
        <div className={`${selecetedImg ? "absolute left-0" : "relative"}`}>
          <div
            className="absolute left-0 top-0 z-[100] flex h-dvh w-screen flex-col bg-black/90 py-52 sm:pt-10 md:pb-52 md:pt-10 lg:pb-80"
            id={project._id}
          >
            <XMarkIcon
              className="absolute right-4 z-50 -mt-8 h-8 text-neutral hover:cursor-pointer"
              onClick={() => setSelectedImg("")}
            />
            <Image
              src={`https://drmasnec.s3.eu-central-1.amazonaws.com/${selecetedImg}`}
              alt={title}
              width={1920}
              height={1080}
              className="mx-auto h-fit w-auto object-cover md:w-auto lg:max-h-[80dvh] lg:max-w-[75%] xl:max-w-[66%]"
            />
            {images.length > 1 && (
              <div className="mx-auto mt-4 grid grid-cols-4 gap-2 md:w-11/12 md:grid-cols-5 lg:flex lg:w-3/4 lg:items-center lg:justify-center lg:gap-4 xl:w-2/3">
                {images.map((img: string) => (
                  <Image
                    src={`https://drmasnec.s3.eu-central-1.amazonaws.com/${img}`}
                    alt={title}
                    width={1920}
                    height={1080}
                    className="h-6 w-full object-cover hover:cursor-pointer md:h-20"
                    key={img}
                    onClick={() => handleSelectImg(img)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <Image
        src={`https://drmasnec.s3.eu-central-1.amazonaws.com/${mainImage}`}
        alt={title}
        width={1920}
        height={1080}
        className="h-full object-cover hover:cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
}

export default PaintingItem;
