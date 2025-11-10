"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getAllBlogsApi, TBlog } from "@/services/blog.service";
import { renderEditorHTML } from "@/utils/editorTextRenderer";
import { getAllCategoriesApi, TCategory } from "@/services/category.service";
import BlogCardSkeleton from "../skeletons/blogCardSkeleton";

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  /** Fetch all categories once */
  const fetchCategories = async () => {
    try {
      setLoadingCategory(true);
      const res = await getAllCategoriesApi();
      if (res.status === 200) {
        setCategories(res.data.categories || []);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setTimeout(() => {
        setLoadingCategory(false);

      }, 200);
    }
  };

  /** Fetch blogs with category filter */
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllBlogsApi(offset, limit, "", selectedCategoryId ?? undefined);
      if (res.status === 200) {
        if (offset === 0) {
          setBlogs(res.data.blogs);
        } else {
          setBlogs((prev) => [...prev, ...res.data.blogs]);
        }
        setTotalCount(res.data.totalCount);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [offset, selectedCategoryId]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
    setOffset(0);
    setBlogs([]);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Our Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Read our latest stories, news, and updates about our mission and impact.
            </p>
          </div>

          {/* ✅ Category Filter (independent of blog data) */}
          <div className="mt-16 mb-12 flex justify-center flex-wrap gap-4">

            {loadingCategory ? (
              // 🦴 Skeleton for categories
              Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-28 rounded-full bg-muted animate-pulse"
                ></div>
              ))
            ) : <>
              <Button
                key="all"
                variant={!selectedCategoryId ? "default" : "outline"}
                className={cn(
                  "rounded-full px-6 py-2 transition-all duration-200",
                  !selectedCategoryId
                    ? "shadow-lg shadow-primary/30"
                    : "bg-background/50"
                )}
                onClick={() => handleCategoryChange(null)}
              >
                All
              </Button>

              {categories.map((category) => (
                <Button
                  key={category._id}
                  variant={selectedCategoryId === category._id ? "default" : "outline"}
                  className={cn(
                    "rounded-full px-6 py-2 transition-all duration-200",
                    selectedCategoryId === category._id
                      ? "shadow-lg shadow-primary/30"
                      : "bg-background/50"
                  )}
                  onClick={() => handleCategoryChange(category._id)}
                >
                  {category.name}
                </Button>
              ))}
            </>}
          </div>

          {/* Blogs Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Show skeletons only when initially loading
              Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={i} />)
            ) : blogs.map((blog) => {

              const authorName = blog.author || blog.createdBy?.name || "Admin";
              const authorImage = blog.authorImage?.url || "/Images/default-avatar-image.jpg";
              return (
                <Card
                  key={blog._id}
                  className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col border shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={blog.image?.url || "/blog/placeholder.webp"}
                      alt={blog.image?.altText || blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge variant="secondary" className="absolute top-4 right-4">
                      {blog.category?.name}
                    </Badge>
                  </div>
                  <CardContent className="p-8 flex-grow">
                    <h3 className="text-2xl font-bold font-headline mb-4">
                      {blog.title}
                    </h3>
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
                        __html: renderEditorHTML(blog.content, 220),
                      }}
                    />
                  </CardContent>
                  <CardFooter className="p-8 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/50">
                        <AvatarImage src={authorImage} alt={authorName} />
                        <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {authorName}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="link"
                      asChild
                      className="p-0 h-auto text-primary font-semibold"
                    >
                      <Link href={`/blogs/${blog._id}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Load More */}
          {blogs.length < totalCount && (
            <div className="flex justify-center mt-12">
              <Button onClick={() => setOffset((prev) => prev + limit)} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && blogs.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">
              No blogs available for this category.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
