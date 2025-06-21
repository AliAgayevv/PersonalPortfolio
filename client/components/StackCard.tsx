import React from "react";
import rightArrowSVG from "../public/svg/rightArrow.svg";
import Image from "next/image";
import getUrl from "@/lib/getUrl";

interface StackCardProps {
  stackTitle: string;
  stackDescription: string;
  stackIcon: string;
}

import StackCardClient from "./StackCardClient";

const StackCard: React.FC<StackCardProps> = ({
  stackTitle,
  stackDescription,
  stackIcon,
}) => {
  const url = getUrl(); // uses server-side and returns the base URL

  return (
    <StackCardClient
      stackTitle={stackTitle}
      stackDescription={stackDescription}
      stackIcon={stackIcon}
      imageUrl={`${url}${stackIcon}`} // we pass the full URL to the client component
    />
  );
};

export default StackCard;
