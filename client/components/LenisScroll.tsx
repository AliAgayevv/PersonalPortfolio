"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const LenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
};

export default LenisScroll;
