import { Loader2 } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center size-full">
      <Loader2 className="animate-spin mr-3" />
    </div>
  );
};

export default Spinner;
