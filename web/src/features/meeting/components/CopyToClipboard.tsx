"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
};

export const CopyToClipboard = (props: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return navigator.clipboard.writeText(text);
    }
    return document.execCommand("copy", true, text);
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(props.value)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-row gap-x-2">
      <Input value={props.value} readOnly className="h-8 md:w-2/3 w-full" />
      <Button onClick={handleCopyClick} className="h-8">
        <span className="text-xs">{isCopied ? "Copied!" : "Copy"}</span>
      </Button>
    </div>
  );
};
