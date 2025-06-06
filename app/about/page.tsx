import Image from "next/image";
import Header from "../_components/Header";
import img from "@/public/darko-portret.jpg";
import type { Metadata } from "next";
import { getBio } from "../_lib/bioApi";

export const metadata: Metadata = {
  title: "About",
};

async function Page() {
  const { bios } = await getBio();
  return (
    <>
      <Header />
      <main className="mt-16 flex flex-col gap-10 lg:mt-32 lg:grid lg:grid-cols-[5fr,7fr] xl:text-xl">
        <p className="lg:row-span-2 lg:self-center">
          {bios.length > 0
            ? bios[0].upperText
            : "Darko Masnec completed his M.A. studies at the Academy of Fine Arts in Zagreb (Department of Animation and New Media), and in 2017 obtained his Ph.D. degree at the Academy of Fine Arts in Zagreb with the doctoral thesis 'The Zagreb School of Animated Film: Art and Market Practices in the Context of Videogames'. His body of work includes a range of animated films and video games that combine hand drawn details and classical gags with abstract, modernistic aesthetic. He strives to bring a unique perspective to his pieces, often focusing on playfulness and movement as a way of expressing emotion, while experimenting with different types of atmospheres and visual narration. In the same vein, his conceptual art pieces frequently deal with the deconstruction of material objects of play and how they represent the systems from which they originate. He has also worked on a few short animated film projects in various roles, as an animator, prop-maker and in post-production."}
        </p>
        <div className="relative h-72 w-11/12 md:w-1/2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-3/5">
          <Image
            src={
              bios.length > 0
                ? `https://drmasnec.s3.eu-central-1.amazonaws.com/${bios[0].image}`
                : img
            }
            alt="Darko portret"
            fill
            sizes="(max-width:768px)80vw,20vw"
            className="rounded-sm object-cover"
          />
        </div>
        <p className="lg:col-span-2 lg:row-start-3 lg:mx-auto lg:w-2/3">
          {bios.length > 0
            ? bios[0].lowerText
            : "In addition to his work as an artist, he has also contributed to the academic community through publishing in journals and various educational and public presentations dealing with aesthetic qualities of videogames, animated film and their correlation. He regularly cooperates with (animated) film festivals. A strong believer in the importance of knowledge-sharing within and between disciplines, Darko is committed to sharing and expanding his insights in order to enhance our collective potential. Currently he works as an Associate Professor (Senior Lecturer) at the Academy of Fine Arts in Zagreb."}
        </p>
      </main>
    </>
  );
}

export default Page;
