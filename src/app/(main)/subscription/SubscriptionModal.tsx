"use client"

import React, { useEffect, useState, type FormEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
    X,
    User,
    Building2,
    Mail,
    Phone,
    Globe,
    MessageSquare,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
} from "lucide-react"

interface SubscriptionModalProps {
    open: boolean
    onClose: () => void
}

export default function SubscriptionModal({
    open,
    onClose,
}: SubscriptionModalProps) {
    const shouldReduceMotion = useReducedMotion()

    const [formData, setFormData] = useState({
        fullName: "",
        organisationName: "",
        email: "",
        phone: "",
        region: "",
        message: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [submitted, setSubmitted] = useState(false)

    // Prevent background scrolling and handle Escape key
    useEffect(() => {
        if (!open) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }

        window.addEventListener("keydown", handleEscape)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", handleEscape)
        }
    }, [open, onClose])

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }))
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Please enter your full name."
        }

        if (!formData.organisationName.trim()) {
            newErrors.organisationName = "Please enter your organisation name."
        }

        if (!formData.email.trim()) {
            newErrors.email = "Please enter your work email."
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address."
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Please enter your phone number."
        }

        if (!formData.region) {
            newErrors.region = "Please select your region."
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validateForm()) return

        // Connect your Request Demo API here.
        // This currently validates the form but does not send or save the enquiry.
        console.log("Demo request form data:", formData)

        setSubmitted(true)
    }

    const handleClose = () => {
        onClose()
    }

    const inputClass =
        "w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-phause-cyan/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-phause-cyan/10"

    const labelClass = "mb-2 block text-sm font-medium text-slate-300"

    const iconClass =
        "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            handleClose()
                        }
                    }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="demo-modal-title"
                        initial={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 30, scale: 0.96 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 20, scale: 0.97 }
                        }
                        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#101D2B] shadow-[0_25px_100px_rgba(0,0,0,0.55)]"
                    >
                        {/* Decorative background */}
                        <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-phause-cyan/10 blur-[90px]" />
                        <div className="pointer-events-none absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-phause-teal/10 blur-[90px]" />

                        {/* Header */}
                        <div className="relative border-b border-white/[0.08] px-6 py-6 sm:px-9 sm:py-8">
                            <button
                                type="button"
                                onClick={handleClose}
                                aria-label="Close modal"
                                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-phause-cyan/20 bg-phause-cyan/10">
                                <ShieldCheck className="h-6 w-6 text-phause-cyan" />
                            </div>

                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-phause-cyan">
                                LET'S CONNECT
                            </p>

                            <h2
                                id="demo-modal-title"
                                className="pr-8 text-2xl font-bold text-white sm:text-3xl"
                            >
                                Request Your Demo
                            </h2>

                            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
                                Discover how Phause can help your team detect threats,
                                simplify security operations, and choose the right
                                protection for your needs.
                            </p>
                        </div>

                        {/* Form / Success */}
                        <div className="relative px-6 py-7 sm:px-9 sm:py-8">
                            {submitted ? (
                                <div className="py-10 text-center">
                                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-phause-teal/10">
                                        <CheckCircle2 className="h-9 w-9 text-phause-cyan" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white">
                                        Thank You!
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                                        Your form has been validated. Connect the demo
                                        request API to submit your enquiry to the Phause team.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="mt-7 rounded-full bg-gradient-to-r from-phause-cyan to-phause-teal px-8 py-3 font-bold text-phause-dark transition hover:opacity-90"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        {/* Full Name */}
                                        <div>
                                            <label htmlFor="demo-fullName" className={labelClass}>
                                                Full Name <span className="text-phause-cyan">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className={iconClass} />
                                                <input
                                                    id="demo-fullName"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Enter your name"
                                                    className={inputClass}
                                                />
                                            </div>
                                            {errors.fullName && (
                                                <p className="mt-1.5 text-xs text-red-400">
                                                    {errors.fullName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Organisation */}
                                        <div>
                                            <label htmlFor="demo-organisation" className={labelClass}>
                                                Organisation <span className="text-phause-cyan">*</span>
                                            </label>
                                            <div className="relative">
                                                <Building2 className={iconClass} />
                                                <input
                                                    id="demo-organisation"
                                                    name="organisationName"
                                                    value={formData.organisationName}
                                                    onChange={handleChange}
                                                    placeholder="Company name"
                                                    className={inputClass}
                                                />
                                            </div>
                                            {errors.organisationName && (
                                                <p className="mt-1.5 text-xs text-red-400">
                                                    {errors.organisationName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="demo-email" className={labelClass}>
                                                Work Email <span className="text-phause-cyan">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className={iconClass} />
                                                <input
                                                    id="demo-email"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="you@company.com"
                                                    className={inputClass}
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="mt-1.5 text-xs text-red-400">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="demo-phone" className={labelClass}>
                                                Phone Number <span className="text-phause-cyan">*</span>
                                            </label>
                                            <div className="relative">
                                                <Phone className={iconClass} />
                                                <input
                                                    id="demo-phone"
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Enter phone number"
                                                    className={inputClass}
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="mt-1.5 text-xs text-red-400">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>

                                        {/* Region */}
                                        <div className="sm:col-span-2">
                                            <label htmlFor="demo-region" className={labelClass}>
                                                Country / Region <span className="text-phause-cyan">*</span>
                                            </label>
                                            <div className="relative">
                                                <Globe className={iconClass} />
                                                <select
                                                    id="demo-region"
                                                    name="region"
                                                    value={formData.region}
                                                    onChange={handleChange}
                                                    className={`${inputClass} appearance-none`}
                                                >
                                                    <option value="" className="bg-[#101D2B]">
                                                        Select your country / region
                                                    </option>
                                                    <option value="India" className="bg-[#101D2B]">India</option>
                                                    <option value="United States" className="bg-[#101D2B]">United States</option>
                                                    <option value="United Kingdom" className="bg-[#101D2B]">United Kingdom</option>
                                                    <option value="UAE" className="bg-[#101D2B]">United Arab Emirates</option>
                                                    <option value="Other" className="bg-[#101D2B]">Other</option>
                                                </select>
                                            </div>
                                            {errors.region && (
                                                <p className="mt-1.5 text-xs text-red-400">
                                                    {errors.region}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div className="sm:col-span-2">
                                            <label htmlFor="demo-message" className={labelClass}>
                                                How can we help?
                                                <span className="ml-1 text-slate-500">(Optional)</span>
                                            </label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-3.5 top-4 h-4 w-4 text-slate-500" />
                                                <textarea
                                                    id="demo-message"
                                                    name="message"
                                                    rows={3}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Tell us a little about your security requirements..."
                                                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-phause-cyan/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-phause-cyan/10"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="group mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-phause-cyan to-phause-teal px-7 py-4 font-bold text-phause-dark shadow-[0_8px_30px_rgba(0,216,201,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(0,216,201,0.28)]"
                                    >
                                        Request a Demo
                                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>

                                    <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                                        By submitting this form, you agree to be contacted
                                        by the Phause team regarding your demo request.
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}