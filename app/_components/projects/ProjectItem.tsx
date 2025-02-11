"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface iProject {
  title: string;
  subtitle?: string;
  originalTitle?: string;
  description: string;
  mainImage: string;
  imgs: string[];
  sound?: string;
  music?: string;
  animation?: string;
  screenplay?: string;
  aspectRatio?: string;
  compositing?: string;
  director?: string;
  duration?: string;
  editing?: string;
  link?: string;
  distributionLink?: string;
  producer?: string;
  scriptwriters?: string;
  technique?: string;
  year?: string;
  _id: string;
  category: string;
}

function ProjectItem({ project, i }: { project: iProject; i: number }) {
  const {
    title,
    subtitle,
    originalTitle,
    description,
    mainImage,
    imgs,
    sound,
    music,
    animation,
    screenplay,
    aspectRatio,
    compositing,
    director,
    duration,
    editing,
    link,
    distributionLink,
    producer,
    scriptwriters,
    technique,
    year,
    category,
  } = project;
  const [selecetedImg, setSelectedImg] = useState("");

  const allImgs = [mainImage, ...imgs];

  function handleSelectImg(img: string) {
    setSelectedImg(img);
  }

  useEffect(
    function () {
      if (selecetedImg) {
        document.getElementById(project._id)?.scrollIntoView();
        const footer = document.querySelector("footer");
        if (footer) {
          footer.classList.add("hidden");
        }
      } else {
        const footer = document.querySelector("footer");
        if (footer) {
          footer.classList.remove("hidden");
        }
      }

      setTimeout(function () {
        if (selecetedImg) {
          document.body.style.overflow = "hidden";
          document.body.style.touchAction = "none";
        } else {
          document.body.style.overflow = "auto";
          document.body.style.touchAction = "auto";
        }
      }, 100);
    },
    [project._id, selecetedImg],
  );

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
            {allImgs.length > 1 && (
              <div className="mx-auto mt-4 grid grid-cols-4 gap-2 md:w-11/12 md:grid-cols-5 lg:flex lg:w-3/4 lg:items-center lg:justify-center lg:gap-4 xl:w-2/3">
                {allImgs.map((img) => (
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
      <div
        className={`flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-4 xl:gap-x-20`}
      >
        <div>
          <h3 className="text-[22px] font-semibold tracking-more text-secondary lg:text-2xl">
            {title}
            {year && <span>, {year}</span>}
          </h3>
        </div>
        {link ? (
          <Link
            href={link}
            className="self-end rounded-md bg-secondary px-4 py-1 text-neutral transition-colors duration-200 hover:bg-primary lg:justify-self-end"
            target="_blank"
          >
            {category === "interactive/videogame"
              ? "Download here"
              : "Watch here"}
          </Link>
        ) : (
          <div />
        )}
        <div
          className={`grid grid-cols-2 gap-x-5 gap-y-4 ${i % 2 === 0 ? "" : "lg:order-4"} xl:h-2/3`}
        >
          <Image
            src={`https://drmasnec.s3.eu-central-1.amazonaws.com/${mainImage}`}
            alt={title}
            width={1920}
            height={1080}
            className="col-span-2 h-44 w-full object-cover hover:cursor-pointer lg:h-56"
            onClick={() => handleSelectImg(mainImage)}
          />
          {imgs.length > 0 &&
            imgs.map((img) => (
              <Image
                src={`https://drmasnec.s3.eu-central-1.amazonaws.com/${img}`}
                alt={title}
                width={1920}
                height={1080}
                className="h-28 w-full object-cover hover:cursor-pointer lg:h-36"
                key={img}
                onClick={() => handleSelectImg(img)}
              />
            ))}
        </div>
        <div
          className={`flex flex-col ${originalTitle || director || animation || music || sound || subtitle ? "gap-8" : ""}`}
        >
          <div>
            {subtitle && (
              <p className="trecking-more font-semibold xl:text-lg">
                {subtitle}
              </p>
            )}
            {originalTitle && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">
                  Original Title:
                </span>{" "}
                {originalTitle}
              </p>
            )}
            {director && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">Directior:</span>{" "}
                {director}
              </p>
            )}
            {scriptwriters && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">
                  Scriptwriters:
                </span>{" "}
                {scriptwriters}
              </p>
            )}
            {animation && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">Animation:</span>{" "}
                {animation}
              </p>
            )}
            {screenplay && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">Screenplay:</span>{" "}
                {screenplay}
              </p>
            )}
            {music && music !== sound && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">Music:</span>{" "}
                {music}
              </p>
            )}
            {music && music === sound && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">
                  Music and sound design:
                </span>{" "}
                {music}
              </p>
            )}
            {sound && sound !== music && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">
                  Sound design:
                </span>{" "}
                {sound}
              </p>
            )}
            {editing && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">Editing:</span>{" "}
                {editing}
              </p>
            )}
            {compositing && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">
                  Compositing:
                </span>{" "}
                {compositing}
              </p>
            )}
            {producer && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">Producer:</span>{" "}
                {producer}
              </p>
            )}
            {duration && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">Duration:</span>{" "}
                {duration}
              </p>
            )}
            {aspectRatio && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">
                  Aspect ratio:
                </span>{" "}
                {aspectRatio}
              </p>
            )}
            {technique && (
              <p className="xl:text-lg">
                <span className="trecking-more font-semibold">Technique:</span>{" "}
                {technique}
              </p>
            )}
          </div>
          <p className="xl:text-lg">
            {description.split("\r\n").map((text, i) => (
              <span key={i + 3492}>
                {text}
                <br />
              </span>
            ))}
          </p>
          {distributionLink && (
            <Link
              href={distributionLink}
              target="_blank"
              className="underline xl:text-lg"
            >
              Distribution, trailer and screening info
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
