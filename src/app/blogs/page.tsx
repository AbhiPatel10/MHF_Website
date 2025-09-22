
"use client";

import { useState } from 'react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { blogsData } from '@/lib/blogs';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function AllBlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(blogsData.map((blog) => blog.category)))];

  const filteredBlogs = blogsData.filter(
    (blog) => selectedCategory === 'All' || blog.category === selectedCategory
  );

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Our Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Read our latest stories, news, and updates about our mission and impact.
            </p>
          </div>

          <div className="mt-16 mb-12 flex justify-center flex-wrap gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={cn(
                  "rounded-full px-6 py-2 transition-all duration-200",
                  selectedCategory === category ? "shadow-lg shadow-primary/30" : "bg-background/50"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Card key={blog.slug} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col border shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={blog.aiHint}
                  />
                   <Badge variant="secondary" className="absolute top-4 right-4">{blog.category}</Badge>
                </div>
                <CardContent className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold font-headline mb-4">{blog.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground gap-6 mb-4">
                      <div className='flex items-center gap-2'>
                          <Calendar className="w-4 h-4" />
                          <span>{blog.date}</span>
                      </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-3">{blog.description}</p>
                </CardContent>
                <CardFooter className="p-8 pt-0 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/50">
                          <AvatarImage src={blog.authorImage} alt={blog.author} />
                          <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="font-semibold text-foreground text-sm">{blog.author}</p>
                      </div>
                  </div>
                  <Button variant="link" asChild className="p-0 h-auto text-primary font-semibold">
                    <Link href={`/blogs/${blog.slug}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
