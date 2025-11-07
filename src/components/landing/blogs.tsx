"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getAllBlogsApi, TBlog } from "@/services/blog.service";
import { renderEditorHTML } from "@/utils/editorTextRenderer";
import BlogCardSkeleton from "@/app/skeletons/blogCardSkeleton";

export const Blogs: FC = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /** Fetch blogs from API (only latest 3) */
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllBlogsApi(0, 3); // fetch first 3 blogs
      if (res.status === 200) {
        setBlogs(res.data.blogs || []);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            From Our Blog
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Stay updated with our latest news, stories, and articles.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={i} />)
          ) : (
            blogs.map((blog) => {
              const authorName = blog.author || blog.createdBy?.name || "Admin";
              const authorImage = blog.authorImage?.url || "/default-avatar.png";

              return (
                <Card
                  key={blog._id}
                  className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col border shadow-lg"
                >
                  {/* Blog Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={blog.image?.url || "/blog/placeholder.webp"}
                      alt={blog.image?.altText || blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {blog.category?.name && (
                      <Badge variant="secondary" className="absolute top-4 right-4">
                        {blog.category.name}
                      </Badge>
                    )}
                  </div>

                  {/* Blog Content */}
                  <CardContent className="p-8 flex-grow">
                    <h3 className="text-2xl font-bold font-headline mb-4">{blog.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div
                      className="text-muted-foreground line-clamp-3 prose prose-sm"
                      dangerouslySetInnerHTML={{
                        __html: renderEditorHTML(blog.content, 180),
                      }}
                    />
                  </CardContent>

                  {/* Author + Read More */}
                  <CardFooter className="p-8 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/50">
                        <AvatarImage src={authorImage} alt={authorName} />
                        <AvatarFallback>
                          {authorName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {authorName}
                        </p>
                      </div>
                    </div>
                    <Button variant="link" asChild className="p-0 h-auto text-primary font-semibold">
                      <Link href={`/blogs/${blog._id}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })
          )}
        </div>

        {/* View All Blogs */}
        {!loading && blogs.length > 0 && (
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full px-8 py-6 text-lg bg-background/50"
            >
              <Link href="/blogs">
                View All Blogs <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">
            No blogs available yet.
          </p>
        )}
      </div>
    </section>
  );
};
