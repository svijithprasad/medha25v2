import React from "react";
import InfiniteMenu from "./InfiniteMenu";
import DomeGallery from "./DomeGallery";

const Glimpse = () => {
  const items = [
    {
      src: "/glimpse/g1.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g2.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g4.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g3.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g5.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g6.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g7.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g8.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g9.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g10.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g11.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g12.jpg",
      alt: "img",
    },
    {
      src: "/glimpse/g13.jpg",
      alt: "img",
    },
  ];
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* --- LAYER 1: GRADIENT BACKGROUND --- */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-950 to-gray-900 z-0" />

      {/* --- LAYER 2: STARS BACKGROUND --- */}
      <div
        className="
          absolute inset-0 
          bg-[url('/2.png.webp')]
          bg-cover bg-center bg-no-repeat
          z-10
        "
      />

      {/* --- LAYER 3: FOREGROUND IMAGE (NEBULA / DUST / CITY etc.) --- */}
      <div
        className="
          absolute inset-0
          bg-[url('/1.png.webp')]
          bg-cover bg-center bg-no-repeat
          mix-blend-screen
          opacity-70
          z-20
        "
      />

      <div
        className="
            fixed inset-0
            bg-cover bg-center bg-no-repeat
            z-0
            flex
            w-full
            justify-end
            md:h-[450px] -translate-y-[50%] h-[300px]
        "
      >
        <img src="/event/bg/img1.webp" alt="" />
      </div>

      {/* --- CONTENT LAYER: CAROUSEL --- */}
      <div
        className="relative h-screen py-2 z-40
        flex flex-col items-center justify-center
      "
      >
        <h1 className="text-white absolute md:text-[280px] text-8xl opacity-30">
          Glimpse
        </h1>
        <DomeGallery
          images={items}
          fit={0.85}
          minRadius={1000}
          segments={34}
          dragDampening={2}
          grayscale={false}
        />
      </div>
    </div>
  );
};

export default Glimpse;
