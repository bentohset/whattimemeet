import { toast } from "@/components/ui/use-toast";

export const logError = (error: string) => {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: error,
  });
};

export const logInfo = (info: string) => {
  toast({
    title: info,
  });
};
