// import { Header } from "@/components/landing/header";
// import { Footer } from "@/components/landing/footer";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Banknote, QrCode } from "lucide-react";
// import Image from "next/image";

// export default function DonatePage() {
//   return (
//     <div className="flex flex-col min-h-dvh bg-background">
//       <Header />

//       <main className="flex-1 py-16 sm:py-24 md:py-32">
//         <div className="container mx-auto px-6 sm:px-8 md:px-12">
//           {/* HEADER SECTION */}
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-foreground font-headline">
//               Support Our Cause
//             </h1>
//             <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
//               Your contribution helps us continue our mission to empower
//               communities. Every donation makes a difference.
//             </p>
//           </div>

//           {/* DONATION OPTIONS */}
//           <div className="mt-12 sm:mt-16 lg:mt-20">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">

//               {/* QR CODE CARD */}
//               <Card className="w-full shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
//                 <CardHeader className="p-0 mb-4 sm:mb-6">
//                   <CardTitle className="font-headline text-2xl sm:text-3xl flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
//                     <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
//                     Scan QR Code to Donate
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-0">
//                   <div className="relative aspect-square w-56 sm:w-64 md:w-72 mx-auto rounded-xl overflow-hidden shadow-md sm:shadow-lg">
//                     <Image
//                       src="https://placehold.co/300x300.png"
//                       alt="Donation QR Code"
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <p className="text-muted-foreground mt-4 sm:mt-6 text-sm sm:text-base">
//                     Use your favorite UPI app to scan and donate.
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* BANK DETAILS CARD */}
//               <Card className="w-full shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8">
//                 <CardHeader className="p-0 mb-4 sm:mb-6">
//                   <CardTitle className="font-headline text-2xl sm:text-3xl flex items-center gap-2 sm:gap-3">
//                     <Banknote className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
//                     Bank Account Details
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="text-base sm:text-lg space-y-3 sm:space-y-4">
//                   <div className="flex flex-col sm:flex-row sm:justify-between">
//                     <p className="text-muted-foreground">Account Name:</p>
//                     <p className="font-semibold text-foreground">
//                       Mission Hope Foundation
//                     </p>
//                   </div>
//                   <div className="flex flex-col sm:flex-row sm:justify-between">
//                     <p className="text-muted-foreground">Account Number:</p>
//                     <p className="font-semibold text-foreground break-all">
//                       123456789012
//                     </p>
//                   </div>
//                   <div className="flex flex-col sm:flex-row sm:justify-between">
//                     <p className="text-muted-foreground">Bank Name:</p>
//                     <p className="font-semibold text-foreground">
//                       Hope National Bank
//                     </p>
//                   </div>
//                   <div className="flex flex-col sm:flex-row sm:justify-between">
//                     <p className="text-muted-foreground">IFSC Code:</p>
//                     <p className="font-semibold text-foreground">
//                       HNBK0001234
//                     </p>
//                   </div>
//                   <div className="flex flex-col sm:flex-row sm:justify-between">
//                     <p className="text-muted-foreground">Branch:</p>
//                     <p className="font-semibold text-foreground">
//                       Gandhinagar
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }


import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main Section */}
      <main className="min-h-screen flex-1 flex items-center justify-center text-center px-6 sm:px-8 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground font-headline mb-4">
            Donations Coming Soon
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            We’re setting up our donation system to make it simple and secure
            for you to support our mission. Stay tuned — we’ll be live very soon!
          </p>
          <div className="mt-10 text-primary text-3xl font-semibold animate-bounce">
            💖 Thank you for your patience!
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
