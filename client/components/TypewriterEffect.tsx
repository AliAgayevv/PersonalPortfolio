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
        // Cursor nece gorunecek
        cursor: "_",
        // deleteSpeed asagi olanda tez silir, yuxari olanda yavas silir
      }}
    />
  );
};

export default TypewriterEffect;
