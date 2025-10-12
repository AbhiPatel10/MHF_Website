"use client";

import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TGetAllTeamMembers } from "@/utils/types/teamMember.types";
import { getAllTeamMembersApi } from "@/services/teamMemberService";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VolunteerForm } from "@/components/team/volunteer-form";

export default function TeamPage() {
  const president = {
    name: "Hardiksinh Chudasama",
    role: "Founder & Director",
    district: "Ahmedabad",
    image: "/Images/Hardik.jpeg",
    aiHint: "indian man portrait",
    description:
      "Hardiksinh Chudasama is a dynamic leader committed to spreading happiness and bringing positive change to society. With a strong background in social service, professional expertise as a Project Manager in an IT company, and a passion for writing, public speaking, and anchoring, he has dedicated his life to empowering communities. His journey is a testament to how one individual can inspire many to make a difference.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  };

  const vicePresident = {
    name: "Yashwant Ahir",
    role: "Vice President",
    district: "Delhi",
    image: "/Images/Yashwant.jpeg",
    aiHint: "indian man portrait",
    description:
      "Yashwant Ahir is a dedicated professional with a strong background in community service. As Vice President, he focuses on enhancing organizational effectiveness and fostering collaboration among team members.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  };

  const [assets, setAssets] = useState<TGetAllTeamMembers[]>([]);
  const [keyMembers, setKeyMembers] = useState<TGetAllTeamMembers[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      // Fetch Assets
      const assetsRes = await getAllTeamMembersApi(0, 0, "", "Asset");
      setAssets(assetsRes.data.teamMembers || []);

      // Fetch Key Members
      const keyMembersRes = await getAllTeamMembersApi(0, 0, "", "Key Member");
      setKeyMembers(keyMembersRes.data.teamMembers || []);
    } catch (err) {
      console.error("Failed to fetch team members", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-dvh">
  //       <Loader2 className="animate-spin h-10 w-10 text-primary" />
  //     </div>
  //   );
  // }
  // Helper function to render skeletons
  const renderSkeletons = (count: number) => {
    return Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className="text-center flex flex-col items-center animate-pulse"
      >
        <Skeleton className="w-32 h-32 mb-4 rounded-full" />
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-4 w-20" />
      </div>
    ));
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Meet Our People
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The heart of our organization is our passionate and dedicated team
              of members who work tirelessly to make a difference.
            </p>
          </div>

          {president && (
            <div className="mt-20">
              <Card className="grid md:grid-cols-4 gap-8 p-8 border-0 shadow-none">
                <div className="md:col-span-1 relative aspect-[4/5]">
                  <Image
                    src={president.image}
                    alt={president.name}
                    fill
                    className="rounded-3xl object-cover shadow-2xl"
                    data-ai-hint={president.aiHint}
                  />
                </div>
                <div className="md:col-span-3 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold font-headline">
                    {president.name}
                  </h2>
                  <p className="text-primary font-semibold mt-1">
                    {president.role}
                  </p>
                  <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-justify">
                    {president.description}
                  </p>
                  {/* <div className="flex gap-2 mt-6">
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                      <Link href={president.social.twitter}><Twitter className="h-5 w-5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                      <Link href={president.social.linkedin}><Linkedin className="h-5 w-5" /></Link>
                    </Button>
                  </div> */}
                </div>
              </Card>
            </div>
          )}

          {vicePresident && (
            <div className="mt-20">
              <Card className="grid md:grid-cols-4 gap-8 p-8 border-0 shadow-none">
                <div className="md:col-span-3 flex flex-col justify-center text-right">
                  <h2 className="text-3xl font-bold font-headline">
                    {vicePresident.name}
                  </h2>
                  <p className="text-primary font-semibold mt-1">
                    {vicePresident.role}
                  </p>
                  <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-justify">
                    {vicePresident.description}
                  </p>
                  {/* <div className="flex gap-2 mt-6 justify-end">
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                      <Link href={vicePresident.social.twitter}><Twitter className="h-5 w-5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                      <Link href={vicePresident.social.linkedin}><Linkedin className="h-5 w-5" /></Link>
                    </Button>
                  </div> */}
                </div>
                <div className="md:col-span-1 relative aspect-[4/5]">
                  <Image
                    src={vicePresident.image}
                    alt={vicePresident.name}
                    fill
                    className="rounded-3xl object-cover shadow-2xl"
                    data-ai-hint={vicePresident.aiHint}
                  />
                </div>
              </Card>
            </div>
          )}

          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                Our Assets
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                The dedicated team that drives our success.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {loading
                ? renderSkeletons(5)
                : assets.map((member) => (
                    <div
                      key={member.name}
                      className="text-center flex flex-col items-center"
                    >
                      <Avatar className="w-32 h-32 mb-4 border-4 border-primary/20 shadow-lg">
                        <AvatarImage
                          src={member.image?.url}
                          alt={member.name}
                        />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-headline text-xl font-semibold">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {member.role}
                      </p>
                    </div>
                  ))}
            </div>
          </div>

          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                Our Key Members
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                The dedicated individuals who form the backbone of our
                organization.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {loading
                ? renderSkeletons(5)
                : keyMembers.map((member) => (
                    <div
                      key={member.name}
                      className="text-center flex flex-col items-center"
                    >
                      <Avatar className="w-32 h-32 mb-4 border-4 border-primary/20 shadow-lg">
                        <AvatarImage
                          src={member.image?.url}
                          alt={member.name}
                        />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-headline text-xl font-semibold">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {member.role}
                      </p>
                    </div>
                  ))}
            </div>
          </div>

          <div className="mt-24 text-center">
            <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-secondary/30">
                 <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                    Become a Volunteer
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Join our team and make a difference. We are always looking for passionate individuals to help us in our mission.
                </p>
                <Dialog>
                    <DialogTrigger asChild>
                         <Button size="lg" className="mt-8 rounded-full px-10 py-7 text-lg group">
                            Apply Now <MoveRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <VolunteerForm />
                    </DialogContent>
                </Dialog>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
