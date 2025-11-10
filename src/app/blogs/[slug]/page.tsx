"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getBlogByIdApi, TBlog } from "@/services/blog.service";
import { renderEditorHTML } from "@/utils/editorTextRenderer";

export default function BlogDetailsPage() {
  const params = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await getBlogByIdApi(params.slug);
        if (res.status === 200) {
          setBlog(res.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <p className="text-muted-foreground">Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    notFound();
  }

  const authorName = blog.author || blog.createdBy?.name || "Admin";
  const authorImage = blog.authorImage?.url || "/Images/default-avatar-image.jpg";

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <article className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="text-base mb-4">
                {blog?.category?.name}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
                {blog?.title}
              </h1>
              <div className="mt-8 flex justify-center items-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/50">
                    <AvatarImage src={authorImage} alt={authorName} />
                    <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{authorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {blog?.image?.url && (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl mb-12">
                <Image
                  src={blog.image.url}
                  alt={blog.image.altText || blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Blog content rendering */}
            <div className="prose prose-lg lg:prose-xl max-w-none mx-auto">
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: renderEditorHTML(blog.content),
                }}
              />
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
