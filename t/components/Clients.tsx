import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    img: "/cliens/bessbassa.svg",
  },
  {
    img: "/cliens/Golden-drink.png",
  },
  {
    img: "/cliens/logo-hamoud_boualem.svg",
  },
  {
    img: "/cliens/logo_guedila.webp",
  },
  {
    img: "/cliens/Ifri_logo.webp",
  },
  {
    img: "/cliens/soummam-logo.webp",
  },
  {
    img: "/cliens/lu.webp",
  },
  {
    img: "/cliens/nestle.webp",
  },
  {
    img: "/cliens/danone.webp",
  },
  {
    img: "/cliens/Coca-Cola-Logo.webp",
  },
  {
    img: "/cliens/Groupe_Benamor.png",
  },
  {
    img: "/cliens/Cevital_logo.webp",
  },
  {
    img: "/cliens/ngaous.png",
  },
  {
    img: "/cliens/rouiba.png",
  },
  {
    img: "/cliens/touja.png",
  },
  {
    img: "/cliens/logo_saida.png",
  },
  {
    img: "/cliens/golden-drink.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row justify-center items-center gap-2">
        <img className="size-1/2 bg-cover bg-center" alt="" src={img} />
        {/* <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-white/40">{username}</p>
        </div> */}
      </div>
    </figure>
  );
};

export default function Client() {
  return (
    <div className="relative h-full bg-black bg-opacity-80 flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
    </div>
  );
}
