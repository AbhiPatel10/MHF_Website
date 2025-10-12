import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ImageCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-2">
      <CardContent className="p-0">
        {/* Image area */}
        <Skeleton className="w-full aspect-[4/3]" />

        {/* Overlay effect (camera & text placeholder simulation) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 p-4 text-center">
          <Skeleton className="w-8 h-8 rounded-full mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
  );
};
