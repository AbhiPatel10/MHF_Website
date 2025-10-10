// components/skeletons/eventCardSkeleton.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function EventCardSkeleton() {
    return (
        <Card className="overflow-hidden border shadow-lg animate-pulse flex flex-col">
            <div className="relative aspect-video bg-muted" />
            <CardContent className="p-8 flex-grow">
                <div className="h-6 w-24 bg-muted rounded mb-4" />
                <div className="h-6 w-3/4 bg-muted rounded mb-3" />
                <div className="h-4 w-1/2 bg-muted rounded mb-2" />
                <div className="h-4 w-2/3 bg-muted rounded mb-4" />
                <div className="h-20 w-full bg-muted rounded" />
            </CardContent>
            <CardFooter className="p-8 pt-0 flex justify-between">
                <div className="h-10 w-24 bg-muted rounded" />
                <div className="h-6 w-16 bg-muted rounded" />
            </CardFooter>
        </Card>
    );
}
