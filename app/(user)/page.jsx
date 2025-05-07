"use client";

import BackToTopButton from "@/components/LandingPage/BackToTopButton/BackToTopButton";
import Banner from "@/components/LandingPage/Banner/Banner";
import Navigasi from "@/components/LandingPage/Navigasi/Navigasi";
import StatistikKampus from "@/components/LandingPage/StatisikKampus/StatistikKampus";
import Tentang from "@/components/LandingPage/Tentang/Tentang";
import Tujuan from "@/components/LandingPage/Tujuan/Tujuan";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Tentang />
      <StatistikKampus />
      <Tujuan />
      <Navigasi />
      <BackToTopButton />
    </div>
  );
}
