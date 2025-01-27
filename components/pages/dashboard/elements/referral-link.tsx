"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ReferralLinkComponent = ({ referralId }: { referralId: string }) => {
  const [fullUrl, setFullUrl] = useState<string>("");
  const pathname = usePathname();

  return <div className="mx-5 italic"></div>;
};

export default ReferralLinkComponent;
