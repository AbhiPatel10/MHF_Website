import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart } from "lucide-react";

const donors = [
  { name: "Jane D.", amount: 5000, time: "2 hours ago", image: 'https://placehold.co/100x100.png' },
  { name: "Robert S.", amount: 10000, time: "5 hours ago", image: 'https://placehold.co/100x100.png' },
  { name: "Maria G.", amount: 2500, time: "1 day ago", image: 'https://placehold.co/100x100.png' },
  { name: "Li W.", amount: 25000, time: "2 days ago", image: 'https://placehold.co/100x100.png' },
  { name: "David K.", amount: 7500, time: "3 days ago", image: 'https://placehold.co/100x100.png' },
];

export function RecentDonors() {
  return (
    <Card className="w-full shadow-xl rounded-3xl bg-secondary/30">
        <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center gap-3">
                <HandHeart className="w-8 h-8 text-primary"/>
                Recent Donors
            </CardTitle>
        </CardHeader>
      <CardContent>
        <div className="space-y-6">
            {donors.map((donor, index) => (
                <div key={index} className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-primary/50">
                        <AvatarImage src={donor.image} alt={donor.name} />
                        <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="font-semibold text-foreground">{donor.name} donated <span className="text-primary">₹{donor.amount}</span></p>
                        <p className="text-sm text-muted-foreground">{donor.time}</p>
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
