
import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { blogsData } from '@/lib/blogs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Blogs: FC = () => {
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogsData.slice(0, 3).map((blog) => (
            <Card key={blog.slug} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col border shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={blog.aiHint}
                />
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
        <div className="mt-16 text-center">
            <Button variant="outline" size="lg" asChild className="rounded-full px-8 py-6 text-lg bg-background/50">
                <Link href="/blogs">
                    View All Blogs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
};
