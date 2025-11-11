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
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { countries } from "@/lib/countries"
import { applyAsVolunteerApi } from "@/services/volunteerApplication.service"

const volunteerSchema = z.object({
    fullName: z.string().min(1, { message: "Full name is required." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    countryCode: z.string().min(1, { message: "Country code is required." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    whatsapp: z.string().optional().or(z.literal("")),
    bloodGroup: z.string().optional().or(z.literal("")),
    address: z.string().min(1, { message: "Address is required." }),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    message: z.string().optional(),
})

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function VolunteerUpdatedForm() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof volunteerSchema>>({
        resolver: zodResolver(volunteerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            countryCode: "IN",
            phone: "",
            whatsapp: "",
            bloodGroup: "",
            address: "",
            city: "",
            state: "",
            country: "India",
            message: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof volunteerSchema>) => {
        try {
            const selectedCountry = topCountries.find(
                (c) => c.code === values.countryCode
            );

            const payload = {
                fullName: values.fullName,
                email: values.email,
                countryCode: selectedCountry ? selectedCountry.dial_code : values.countryCode,
                phone: values.phone,
                whatsapp: values.whatsapp ?? "",
                bloodGroup: values.bloodGroup,
                address: values.address,
                city: values.city,
                state: values.state,
                country: values.country,
                reason: values.message || "",
            };

            await applyAsVolunteerApi(payload);

            toast({
                title: "✅ Application Sent!",
                description: `Thank you, ${values.fullName}, for your interest in volunteering.`,
                duration: 5000,
            });
            form.reset();
        } catch (error: any) {
            console.error("Error submitting volunteer form:", error);
            toast({
                title: "❌ Submission Failed",
                description:
                    error?.message || "Something went wrong. Please try again later.",
                duration: 4000,
                variant: "destructive",
            });
        }
    };

    const topCountries = countries.filter((c) =>
        ["IN", "US", "GB", "CA", "AU", "AE", "SG", "SA", "DE"].includes(c.code)
    );

    return (
        <Card className="w-full shadow-2xl rounded-3xl">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">
                    Volunteer Application <span className="text-muted-foreground text-lg">/ સ્વયંસેવક ફોર્મ</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Full Name */}
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Full Name <span className="text-muted-foreground text-sm ml-2">/ પૂરું નામ</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email Address <span className="text-muted-foreground text-sm ml-2">/ ઇમેઇલ સરનામું</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="john.doe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone */}
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="countryCode"
                                render={({ field }) => (
                                    <FormItem className="w-1/3">
                                        <FormLabel>
                                            Country Code{" "}
                                            <span className="text-muted-foreground text-sm ml-2">/ દેશ કોડ</span>
                                        </FormLabel>
                                        <Select
                                            value={field.value} // ✅ controlled by React Hook Form
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select country code" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {topCountries.map((country) => (
                                                    <SelectItem key={country.code} value={country.code}>
                                                        {country.dial_code} ({country.name})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="w-2/3">
                                        <FormLabel>
                                            Phone Number <span className="text-muted-foreground text-sm ml-2">/ ફોન નંબર</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                {...field}
                                                maxLength={15} // ✅ Hard limit on input
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, ""); // ✅ Only digits
                                                    if (value.length <= 15) field.onChange(value); // ✅ Block input beyond 15 digits
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* WhatsApp */}
                        <div className="flex gap-4">
                            <FormItem className="w-1/3">
                                <FormLabel>
                                    Country Code <span className="text-muted-foreground text-sm ml-2">/ દેશ કોડ</span>
                                </FormLabel>
                                <div className="border border-input rounded-md p-2 bg-muted text-center font-medium">
                                    {
                                        topCountries.find(
                                            (c) =>
                                                c.code.toLowerCase() === form.getValues("countryCode").toLowerCase() ||
                                                c.dial_code === form.getValues("countryCode")
                                        )?.dial_code || "+91"
                                    }
                                </div>
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="whatsapp"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>
                                            WhatsApp Number (Optional)
                                            <span className="text-muted-foreground text-sm ml-2">/ વોટ્સએપ નંબર (વૈકલ્પિક)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="Enter your WhatsApp number"
                                                {...field}
                                                maxLength={15}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, ""); // ✅ Only digits
                                                    if (value.length <= 15) field.onChange(value); // ✅ Block input beyond 15 digits
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Blood Group */}
                        <FormField
                            control={form.control}
                            name="bloodGroup"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Blood Group <span className="text-muted-foreground text-sm ml-2">/ રક્તનો ગ્રુપ</span>
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your blood group" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {bloodGroups.map((group) => (
                                                <SelectItem key={group} value={group}>
                                                    {group}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Address */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Address <span className="text-muted-foreground text-sm ml-2">/ સરનામું</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="123 Main St, Apt 4B" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* City & State */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            City <span className="text-muted-foreground text-sm ml-2">/ શહેર</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="New York" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            State / Province <span className="text-muted-foreground text-sm ml-2">/ રાજ્ય</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="NY" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Country */}
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Country <span className="text-muted-foreground text-sm ml-2">/ દેશ</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="India" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Message */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Why do you want to volunteer? (Optional)
                                        <span className="text-muted-foreground text-sm ml-2">
                                            / તમે સ્વયંસેવક કેમ બનવા માંગો છો? (વૈકલ્પિક)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us about yourself and why you're passionate about our cause."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full text-lg py-7"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? "Submitting..."
                                : "Submit Application / ફોર્મ મોકલો"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
