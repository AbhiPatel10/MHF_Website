
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { blogsData } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export default function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const blog = blogsData.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <article className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="text-base mb-4">{blog.category}</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
                {blog.title}
              </h1>
              <div className="mt-8 flex justify-center items-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/50">
                    <AvatarImage src={blog.authorImage} alt={blog.author} />
                    <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{blog.author}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className="w-5 h-5" />
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl mb-12">
              <Image src={blog.image} alt={blog.title} fill className="object-cover" data-ai-hint={blog.aiHint} />
            </div>

            <div className="prose prose-lg lg:prose-xl max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: blog.longDescription }} />
          
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
