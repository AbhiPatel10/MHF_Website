"use client";

import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Cta } from "@/components/landing/cta";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/lib/projects";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<null | (typeof projectsData)[0]>(null);

    const truncateHTML = (html: string, maxLength: number) => {
        if (typeof window === "undefined") return html; // SSR safety

        const tempEl = document.createElement("div");
        tempEl.innerHTML = html;
        const text = tempEl.textContent || tempEl.innerText || "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };


    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-32 bg-secondary/20">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl font-headline">
                            Our Projects
                        </h1>
                        <p className="mt-6 text-lg leading-8 max-w-3xl mx-auto text-muted-foreground">
                            Creating sustainable change through focused initiatives in
                            education, healthcare, and livelihood. Explore our work below.
                        </p>
                    </div>
                </section>

                {/* Projects List Section */}
                <section className="py-24 sm:py-32">
                    <div className="container mx-auto">
                        <div className="space-y-24">
                            {projectsData.map((project, index) => (
                                <div
                                    key={project.slug}
                                    className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
                                >
                                    <div
                                        className={cn(
                                            "relative aspect-video rounded-3xl overflow-hidden shadow-2xl group",
                                            index % 2 !== 0 && "md:order-2"
                                        )}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            data-ai-hint={project.aiHint}
                                        />
                                    </div>

                                    <div
                                        className={cn(
                                            "flex flex-col",
                                            index % 2 !== 0 && "md:order-1"
                                        )}
                                    >
                                        <Badge
                                            variant="secondary"
                                            className="text-sm self-start mb-3"
                                        >
                                            {project.category}
                                        </Badge>

                                        <h3 className="font-headline text-3xl font-bold tracking-tight text-foreground mb-4">
                                            {project.title}
                                        </h3>

                                        <div
                                            className="prose prose-lg text-muted-foreground leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: truncateHTML(project.longDescription, 250),
                                            }}
                                        />

                                        {project.longDescription.length > 250 && (
                                            <Dialog
                                                open={selectedProject?.slug === project.slug}
                                                onOpenChange={(open) =>
                                                    setSelectedProject(open ? project : null)
                                                }
                                            >
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className="mt-6 w-fit">
                                                        Show More
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-3xl">
                                                    <div className="space-y-4">
                                                        <h2 className="text-2xl font-bold text-foreground">
                                                            {project.title}
                                                        </h2>
                                                        <div
                                                            className="prose prose-lg text-muted-foreground leading-relaxed"
                                                            dangerouslySetInnerHTML={{
                                                                __html: project.longDescription,
                                                            }}
                                                        />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <Cta />
            </main>
            <Footer />
        </div>
    );
}
