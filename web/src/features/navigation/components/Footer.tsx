import React from "react";

export const Footer = () => {
  return (
    <div className="bg-black w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
        <div className="relative flex h-12 items-center justify-between">
          {/* desktop menu button */}
          <div className="sm:ml-6 flex w-full items-center justify-center sm:items-center sm:justify-start">
            <h1 className="text-white font-semibold text-xs">
              What Time Meet?
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
