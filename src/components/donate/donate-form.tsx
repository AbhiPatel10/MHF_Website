"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const donationSchema = z.object({
  amount: z.number().min(1, { message: "Please enter an amount." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
})

const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

export function DonateForm() {
  const [customAmount, setCustomAmount] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 1000,
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof donationSchema>) {
    console.log(values)
    toast({
        title: "Thank you for your donation!",
        description: `We've received your generous donation of ₹${values.amount}. A confirmation has been sent to your email.`,
        duration: 5000,
      })
      form.reset();
      setCustomAmount("");
  }

  const handlePresetAmountClick = (amount: number) => {
    form.setValue("amount", amount);
    setCustomAmount("");
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue > 0) {
        form.setValue("amount", numericValue);
    }
  }


  return (
    <Card className="w-full shadow-2xl rounded-3xl">
        <CardHeader>
            <CardTitle className="font-headline text-3xl">Make a Donation</CardTitle>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
                <FormLabel>Amount (INR)</FormLabel>
                <div className="grid grid-cols-3 gap-3">
                    {presetAmounts.map((amount) => (
                         <Button 
                            key={amount} 
                            type="button"
                            variant="outline"
                            className={cn("w-full h-14 text-lg", form.watch("amount") === amount && customAmount === "" && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground")}
                            onClick={() => handlePresetAmountClick(amount)}
                        >
                            ₹{amount}
                        </Button>
                    ))}
                </div>
                <Input 
                    type="number"
                    placeholder="Or enter a custom amount" 
                    className="h-14 text-lg"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0"/>
                <p>Your donation is secure and encrypted. We respect your privacy and will not share your information.</p>
            </div>
            <Button type="submit" size="lg" className="w-full text-lg py-7">Donate ₹{form.watch("amount")}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
