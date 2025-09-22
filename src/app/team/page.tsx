
"use client";

import { useState } from 'react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { teamData } from '@/lib/team';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';
import { VolunteerForm } from '@/components/team/volunteer-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TeamPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const keyMembers = teamData.filter(member => 
    member.role.toLowerCase().includes('founder') || 
    member.role.toLowerCase().includes('director') ||
    member.role.toLowerCase().includes('co-ordinator')
  );

  const volunteers = teamData.filter(member => 
    !keyMembers.some(keyMember => keyMember.name === member.name)
  );

  const districts = ['All', ...Array.from(new Set(keyMembers.map((member) => member.district)))];

  const filteredKeyMembers = keyMembers.filter(
    (member) => selectedDistrict === 'All' || member.district === selectedDistrict
  );

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Meet Our Dedicated Team
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The heart of our organization is our passionate and dedicated team of members and volunteers who work tirelessly to make a difference.
            </p>
            <div className="mt-8">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="rounded-full">Join as a Volunteer</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <VolunteerForm />
                    </DialogContent>
                </Dialog>
            </div>
          </div>

          <div className="mt-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                        Key Members
                    </h2>
                    <p className="mt-2 text-lg text-muted-foreground">The driving force behind our mission.</p>
                </div>
                <div className="md:ml-auto">
                    <Select onValueChange={setSelectedDistrict} defaultValue="All">
                        <SelectTrigger className="w-[220px] rounded-full">
                            <SelectValue placeholder="Filter by District" />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map(district => (
                                <SelectItem key={district} value={district}>{district}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredKeyMembers.map((member) => (
                <Card key={member.name} className="text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center bg-card border shadow-lg">
                  <CardHeader className="items-center p-8">
                    <Avatar className="w-32 h-32 mb-4 border-4 border-primary/20">
                      <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.aiHint} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-sm text-primary font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow flex flex-col justify-end">
                    <p className="text-muted-foreground text-sm mb-4">{member.district}</p>
                    <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                            <Link href={member.social.twitter}><Twitter className="h-5 w-5" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                            <Link href={member.social.linkedin}><Linkedin className="h-5 w-5" /></Link>
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                Our Volunteers
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">The dedicated hands that make our work possible.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {volunteers.map((member) => (
                <Card key={member.name} className="text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center bg-card border shadow-lg">
                  <CardHeader className="items-center p-8">
                    <Avatar className="w-32 h-32 mb-4 border-4 border-primary/20">
                      <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.aiHint} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-sm text-primary font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow flex flex-col justify-end">
                     <p className="text-muted-foreground text-sm mb-4">{member.district}</p>
                    <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                            <Link href={member.social.twitter}><Twitter className="h-5 w-5" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                            <Link href={member.social.linkedin}><Linkedin className="h-5 w-5" /></Link>
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
