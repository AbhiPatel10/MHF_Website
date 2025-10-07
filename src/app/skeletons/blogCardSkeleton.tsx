"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogCardSkeleton() {

  return (
    <Card className="overflow-hidden flex flex-col border shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-8 flex-grow space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-20 w-full" />
      </CardContent>
      <CardFooter className="p-8 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
  );
}
