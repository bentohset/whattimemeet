"use client";

import { CreateMeetingForm } from "../features/meeting";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:px-24 p-8">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono lg:flex">
        <CreateMeetingForm />
      </div>
    </main>
  );
}
