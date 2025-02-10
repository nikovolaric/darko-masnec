import Image from "next/image";
import { getBanner } from "../_lib/projectsApi";

async function HomeBanner() {
  const { banners } = await getBanner();

  if (banners.length === 0)
    return (
      <div className="h-[40dvh] text-2xl font-bold text-secondary">
        Welcome to my digital portfolio
      </div>
    );

  const { image, title } = banners[0];

  return (
    <div className="relative flex h-[450px] w-full items-end md:h-[680px]">
      <Image
        src={`https://drmasnec.s3.eu-central-1.amazonaws.com/${image}`}
        alt="Home banner"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {title && (
        <p className="relative w-full bg-neutral/35 px-6 py-4 text-right">
          {title}
        </p>
      )}
    </div>
  );
}

export default HomeBanner;
