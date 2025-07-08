"use client";

import Typewriter from "typewriter-effect";

const TypewriterEffect = ({
  stringsFromBackend,
}: {
  stringsFromBackend: string[];
}) => {
  return (
    <Typewriter
      options={{
        strings: stringsFromBackend,
        autoStart: true,
        loop: true,
        cursor: "_",
      }}
    />
  );
};

export default TypewriterEffect;
