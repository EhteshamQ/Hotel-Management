import FeaturedRooms from "@/components/FeaturedRooms";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";
import PageSearch from "@/components/PageSearch";
import { getFeaturedRoom } from "@/lib/api";
import React from "react";

const Home = async () => {
  const featuredRoom = await getFeaturedRoom();

  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedRooms featuredRoom={featuredRoom} />
      <Gallery />
      <NewsLetter />
    </>
  );
};

export default Home;
