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
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "../ui/textarea"
import { applyAsVolunteerApi } from "@/services/volunteerApplication.service"

const volunteerSchema = z.object({
    fullName: z.string().min(1, { message: "Full name is required." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    phone: z
        .string()
        .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
    message: z.string().optional(),
})

export function VolunteerForm() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof volunteerSchema>>({
        resolver: zodResolver(volunteerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof volunteerSchema>) => {
        try {
            // ✅ Call API
            const response = await applyAsVolunteerApi({
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                reason: values.message || "", // backend expects `reason`
            });

            if (response.status === 200) {
                toast({
                    title: "✅ Application Sent!",
                    description: `Thank you, ${values.fullName}, for your interest in volunteering. We will get back to you shortly.`,
                    duration: 5000,
                });
                form.reset();
            } else {
                toast({
                    title: "❌ Submission Failed",
                    description: response.message || "Something went wrong. Please try again later.",
                    duration: 4000,
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            console.error("Error submitting volunteer form:", error);
            toast({
                title: "🚨 Error",
                description: error?.response?.data?.message || "Unable to submit application.",
                duration: 4000,
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle className="font-headline text-3xl">Volunteer Application</DialogTitle>
                <DialogDescription>
                    Fill out the form below to apply to become a volunteer.
                </DialogDescription>
            </DialogHeader>
            <div className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your 10-digit phone number"
                                            {...field}
                                            maxLength={10}
                                            onChange={(e) => {
                                                const onlyDigits = e.target.value.replace(/\D/g, ""); // remove non-numeric
                                                if (onlyDigits.length <= 10) {
                                                    field.onChange(onlyDigits);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Why do you want to volunteer? (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little about yourself and why you're passionate about our cause."
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
                            {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
}
