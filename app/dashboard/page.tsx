import {
  AdjustmentsHorizontalIcon,
  CodeBracketIcon,
  FilmIcon,
  ListBulletIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  TrophyIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";
import Logout from "../_components/forms/Logout";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Page() {
  return (
    <div>
      <div className="mx-auto h-dvh text-primary">
        <h2 className="py-6 text-xl font-bold">Dashboard</h2>
        <div className="grid grid-cols-2 items-center gap-3 text-center">
          <div>
            <Link
              href="/dashboard/animatedfilms"
              className="flex flex-col border-2 bg-gray-100 py-12 drop-shadow-lg transition-colors duration-300 hover:bg-gray-300"
            >
              Animated films
              <span className="flex justify-center">
                <VideoCameraIcon className="h-6" />
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/dashboard/interactive-videogames"
              className="flex flex-col border-2 bg-gray-100 py-12 drop-shadow-lg transition-colors duration-300 hover:bg-gray-300"
            >
              Interactive/Videogame
              <span className="flex justify-center">
                <CodeBracketIcon className="h-6" />
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/dashboard/installation-video"
              className="flex flex-col border-2 bg-gray-100 py-12 drop-shadow-lg transition-colors duration-300 hover:bg-gray-300"
            >
              Installations/Video
              <span className="flex justify-center">
                <FilmIcon className="h-6" />
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/dashboard/paintings"
              className="flex flex-col border-2 bg-gray-100 py-12 drop-shadow-lg transition-colors duration-300 hover:bg-gray-300"
            >
              Paintings
              <span className="flex justify-center">
                <PaintBrushIcon className="h-6" />
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/dashboard/awards"
              className="flex flex-col border-2 bg-gray-100 py-12 drop-shadow-lg transition-colors duration-300 hover:bg-gray-300"
            >
              Awards and festivals
              <span className="flex justify-center">
                <TrophyIcon className="h-6" />
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/dashboard/exhibitions"
              className="flex flex-col border-2 bg-gray-100 py-12 drop-shadow-lg transition-colors duration-300 hover:bg-gray-300"
            >
              Exhibitions lists
              <span className="flex justify-center">
                <ListBulletIcon className="h-6" />
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/dashboard/inprogress"
              className="flex flex-col border-2 bg-gray-100 py-12 drop-shadow-lg transition-colors duration-300 hover:bg-gray-300"
            >
              Work in progress
              <span className="flex justify-center">
                <PuzzlePieceIcon className="h-6" />
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/dashboard/banner"
              className="flex flex-col border-2 bg-gray-100 py-12 drop-shadow-lg transition-colors duration-300 hover:bg-gray-300"
            >
              Homepage banner
              <span className="flex justify-center">
                <AdjustmentsHorizontalIcon className="h-6" />
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="mt-4 rounded-md border-2 px-2 py-1 text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
          >
            &larr; Domov
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Page;
