import type { Metadata } from "next";
import React from "react";

import { MeetingPage } from "@/features/meeting";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const { id } = params;

  // fetch data
  const base =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_URL_LOCAL
      : process.env.NEXT_PUBLIC_API_URL_PROD;
  const res = await fetch(`${base}/meeting/${id}`);
  const resMetadata = await res.json();

  return {
    title: `${resMetadata.data.title} - WhatTimeMeet`,
  };
}

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="md:px-24 p-8 flex-col items-center justify-between font-mono text-sm lg:flex space-y-8">
      <MeetingPage meetingId={params.id} />
    </div>
  );
};

export default page;
