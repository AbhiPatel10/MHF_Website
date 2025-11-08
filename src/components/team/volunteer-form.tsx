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

// ✅ Schema with max character limits
const volunteerSchema = z.object({
    fullName: z
        .string()
        .min(2, { message: "Full name must be at least 2 characters." })
        .max(100, { message: "Full name cannot exceed 100 characters." }),
    email: z
        .string()
        .email({ message: "Please enter a valid email." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    phone: z
        .string()
        .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
    whatsapp: z
        .string()
        .regex(/^\d{10}$/, { message: "WhatsApp number must be exactly 10 digits." })
        .optional()
        .or(z.literal("")),
    bloodGroup: z.string().max(5, { message: "Blood group too long." }).optional().or(z.literal("")),
    address: z
        .string()
        .min(5, { message: "Address must be at least 5 characters." })
        .max(200, { message: "Address cannot exceed 200 characters." }),
    message: z
        .string()
        .max(500, { message: "Message cannot exceed 500 characters." })
        .optional()
        .or(z.literal("")),
})

const RequiredMark = () => <span className="text-red-500">*</span>

export function VolunteerForm({ onSuccess }: { onSuccess: () => void }) {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof volunteerSchema>>({
        resolver: zodResolver(volunteerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            whatsapp: "",
            bloodGroup: "",
            address: "",
            message: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof volunteerSchema>) => {
        try {
            const response = await applyAsVolunteerApi({
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                whatsapp: values.whatsapp || "",
                bloodGroup: values.bloodGroup || "",
                address: values.address,
                reason: values.message || "",
            })

            if (response.status === 200) {
                toast({
                    title: "✅ Application Sent!",
                    description: `Thank you, ${values.fullName}, for your interest in volunteering.`,
                    duration: 5000,
                })
                form.reset()
                onSuccess()
            } else {
                toast({
                    title: "❌ Submission Failed",
                    description: response.message || "Something went wrong. Please try again later.",
                    duration: 4000,
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            console.error("Error submitting volunteer form:", error)
            toast({
                title: "🚨 Error",
                description:
                    error?.response?.data?.message || "Unable to submit application.",
                duration: 4000,
                variant: "destructive",
            })
        }
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="font-headline text-3xl">
                    Volunteer Application
                </DialogTitle>
                <DialogDescription>
                    Fill out the form below to apply to become a volunteer.
                </DialogDescription>
            </DialogHeader>

            <div className="pt-6 flex justify-center">
                <div className="w-full max-w-3xl">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* Row 1: Full Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Full Name <RequiredMark />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    maxLength={100}
                                                    placeholder="John Doe"
                                                />
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
                                            <FormLabel>
                                                Email Address <RequiredMark />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    maxLength={100}
                                                    placeholder="john.doe@example.com"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Row 2: Phone & WhatsApp */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Phone Number <RequiredMark />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    maxLength={10}
                                                    placeholder="Enter your 10-digit phone number"
                                                    onChange={(e) => {
                                                        const digits = e.target.value.replace(/\D/g, "")
                                                        if (digits.length <= 10) field.onChange(digits)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="whatsapp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>WhatsApp Number (Optional)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    maxLength={10}
                                                    placeholder="Enter your WhatsApp number"
                                                    onChange={(e) => {
                                                        const digits = e.target.value.replace(/\D/g, "")
                                                        if (digits.length <= 10) field.onChange(digits)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Row 3: Blood Group & Address */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="bloodGroup"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blood Group (Optional)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    maxLength={5}
                                                    placeholder="e.g., O+, B-, AB+"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Address <RequiredMark />
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    maxLength={200}
                                                    placeholder="Enter your address or location"
                                                    className="min-h-[80px]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Row 4: Message */}
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Why do you want to volunteer? (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                maxLength={500}
                                                placeholder="Tell us about yourself and your motivation."
                                                className="min-h-[100px]"
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
                                    : "Submit Application"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}
