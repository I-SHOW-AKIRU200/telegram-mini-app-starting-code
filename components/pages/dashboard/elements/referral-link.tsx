"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ReferralLinkComponent = ({ referralId }: { referralId: string }) => {
  const [fullUrl, setFullUrl] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    // Get the base URL depending on environment
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || // Custom environment variable
      process.env.NEXT_PUBLIC_VERCEL_URL || // Vercel provides this
      "localhost:3000";

    // Construct the full URL with the referral ID
    const referralUrl = `https://t.me/bullishmarketcap_bot?start=r_${referralId}`;
    setFullUrl(referralUrl);
  }, [pathname, referralId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert("Referral link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="mx-5 italic">
      <h1 className="text-xl font-semibold mb-4">Share your referral link</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={fullUrl}
            readOnly
            className="w-full p-2 border rounded bg-gray-50 text-black"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Copy
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Share this link with your friends to earn rewards!
        </p>
      </div>
    </div>
  );
};

export default ReferralLinkComponent;
