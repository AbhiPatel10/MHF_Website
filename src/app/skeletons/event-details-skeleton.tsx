import { Skeleton } from "@/components/ui/skeleton";

export const EventDetailsSkeleton = () => {
    return (
        <div className="flex flex-col min-h-dvh bg-background animate-in fade-in-50">
            <main className="flex-1 py-24 sm:py-32">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Left Section Skeleton */}
                        <div className="lg:col-span-3 space-y-8">
                            <Skeleton className="w-full aspect-video rounded-2xl shadow-2xl" />
                            <div className="space-y-4">
                                <Skeleton className="h-10 w-3/4 rounded-lg" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-11/12" />
                                <Skeleton className="h-6 w-10/12" />
                            </div>
                        </div>

                        {/* Right Section Skeleton */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-28 bg-card p-8 rounded-3xl shadow-xl border space-y-6">
                                <Skeleton className="h-8 w-1/2 rounded-md" />
                                <div className="space-y-5">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <Skeleton className="h-6 w-6 rounded-full" />
                                            <Skeleton className="h-6 w-3/4" />
                                        </div>
                                    ))}
                                </div>
                                {/* <div className="pt-6 border-t space-y-4">
                                    <Skeleton className="h-6 w-2/3" />
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
