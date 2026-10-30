"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  AtSign,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";
import { createOrganization } from "@/services/organization.service";
import { registrationStore } from "@/store/registration.store";

const regions = [
  "North America",
  "South America",
  "Europe",
  "Asia Pacific",
  "Middle East",
  "Africa",
  "Other",
];

type RegistrationForm = {
  fullName: string;
  organisationName: string;
  email: string;
  password: string;
  region: string;
  termsAccepted: boolean;
};

type FormErrors = Partial<Record<keyof RegistrationForm, string>>;

const initialForm: RegistrationForm = {
  fullName: "",
  organisationName: "",
  email: "",
  password: "",
  region: "",
  termsAccepted: false,
};

function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  const particles = Array.from({ length: 24 }, (_, index) => ({
    id: index,
    left: `${(index * 41 + 7) % 100}%`,
    top: `${(index * 29 + 11) % 100}%`,
    delay: (index % 7) * 0.7,
    duration: 4 + (index % 5),
  }));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Animated technical grid */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,216,201,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(0,216,201,0.24) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage:
            "radial-gradient(ellipse at center, black 15%, transparent 85%)",
        }}
      />

      {/* Ambient cyan glow */}
      <motion.div
        className="absolute -right-48 -top-48 h-[580px] w-[580px] rounded-full bg-phause-teal/20 blur-[140px]"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -70, 0],
                y: [0, 60, 0],
                scale: [1, 1.12, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ambient blue glow */}
      <motion.div
        className="absolute -bottom-48 -left-48 h-[560px] w-[560px] rounded-full bg-cyan-500/10 blur-[150px]"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 65, 0],
                y: [0, -45, 0],
              }
        }
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {!reduceMotion &&
        particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-phause-cyan"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -28, 0],
              opacity: [0.12, 0.65, 0.12],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Subtle moving light */}
      {!reduceMotion && (
        <motion.div
          className="absolute -left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-phause-cyan/40 to-transparent"
          animate={{ x: ["0vw", "300vw"] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const score = checks.filter(Boolean).length;

  if (!password) return null;

  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Excellent"];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="mt-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Password strength
          </span>

          <span
            className={`text-xs font-semibold ${
              score >= 4 ? "text-phause-cyan" : "text-slate-400"
            }`}
          >
            {labels[score]}
          </span>
        </div>

        <div className="flex gap-1.5">
          {checks.map((passed, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                backgroundColor: passed
                  ? "#00d8c9"
                  : "rgba(148,163,184,0.15)",
                scaleY: passed ? 1 : 0.85,
              }}
              transition={{ duration: 0.25 }}
              className="h-1 flex-1 rounded-full"
            />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
          {[
            { label: "8+ characters", passed: checks[0] },
            { label: "Uppercase letter", passed: checks[1] },
            { label: "Lowercase letter", passed: checks[2] },
            { label: "Number", passed: checks[3] },
            { label: "Special character", passed: checks[4] },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-[11px]"
            >
              <Check
                className={`h-3.5 w-3.5 ${
                  item.passed ? "text-phause-cyan" : "text-slate-600"
                }`}
              />
              <span
                className={
                  item.passed ? "text-slate-300" : "text-slate-500"
                }
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function RegisterPage() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState<RegistrationForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  const updateField = <K extends keyof RegistrationForm>(
    field: K,
    value: RegistrationForm[K],
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    if (status === "error") {
      setStatus("idle");
      setServerMessage("");
    }
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    } else if (form.fullName.trim().length < 2) {
      nextErrors.fullName = "Your name must contain at least 2 characters.";
    }

    if (!form.organisationName.trim()) {
      nextErrors.organisationName = "Please enter your organisation name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Your email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Please create a password.";
    } else if (
      form.password.length < 8 ||
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password) ||
      !/\d/.test(form.password) ||
      !/[^A-Za-z0-9]/.test(form.password)
    ) {
      nextErrors.password =
        "Use 8+ characters with uppercase, lowercase, a number and a special character.";
    }

    if (!form.region) {
      nextErrors.region = "Please select your region.";
    }

    if (!form.termsAccepted) {
      nextErrors.termsAccepted =
        "Please accept the Terms & Conditions to continue.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setStatus("submitting");
    setServerMessage("");

    try {
      const emailDomain = form.email.trim().split("@")[1]?.toLowerCase();
      const regionCodes: Record<string, string> = {
        "North America": "US",
        "South America": "BR",
        Europe: "DE",
        "Asia Pacific": "IN",
        "Middle East": "AE",
        Africa: "ZA",
        Other: "XX",
      };

      await createOrganization({
        name: form.organisationName.trim(),
        verifiedEmailDomains: emailDomain ? [emailDomain] : [],
        region: regionCodes[form.region] ?? "XX",
        disclaimerEnabled: true,
        eventRetentionMonths: 12,
      });

      registrationStore.save({
        fullName: form.fullName.trim(),
        organisationName: form.organisationName.trim(),
        email: form.email.trim(),
        region: form.region,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");

      setServerMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const inputBase =
    "w-full rounded-2xl border bg-phause-card/60 py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-phause-cyan/60 focus:bg-phause-card/90 focus:shadow-[0_0_24px_rgba(0,216,201,0.08)]";

  const getInputClass = (field: keyof RegistrationForm) =>
    `${inputBase} ${
      errors[field]
        ? "border-red-400/60 focus:border-red-400/80"
        : "border-phause-border"
    }`;

  const fieldVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-phause-dark text-white">
      <AnimatedBackground />

      {/* Main content */}
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-24">
        {/* Page introduction */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-9 max-w-2xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-phause-cyan/20 bg-phause-cyan/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-phause-cyan"
          >
            <Sparkles className="h-3.5 w-3.5" />
            YOUR NEXT CHAPTER STARTS HERE
            <span className="relative ml-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-phause-cyan opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-phause-cyan" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl md:text-6xl"
          >
            Create your
            <br />
            <span className="bg-gradient-to-r from-phause-cyan via-cyan-300 to-phause-teal bg-clip-text text-transparent">
              Phause account.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base"
          >
            A smarter way to work, powered by AI. Create your account to get
            started with the Phause experience.
          </motion.p>
        </motion.div>

        {/* Registration card */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative w-full max-w-[590px]"
        >
          {/* Animated outer glow */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-px rounded-[30px] bg-gradient-to-br from-phause-cyan/35 via-transparent to-phause-teal/25 blur-sm"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.45, 0.85, 0.45] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative overflow-hidden rounded-[29px] border border-white/[0.09] bg-[#07121a]/90 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
            {/* Top accent line */}
            <div className="relative h-px w-full overflow-hidden bg-white/[0.05]">
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-phause-cyan to-transparent"
                animate={
                  reduceMotion ? undefined : { x: ["-100%", "400%"] }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="p-6 sm:p-9 md:p-10">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="flex min-h-[440px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -25 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 13,
                      }}
                      className="mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-phause-cyan/30 bg-phause-cyan/10 shadow-[0_0_50px_rgba(0,216,201,0.15)]"
                    >
                      <CheckCircle2 className="h-10 w-10 text-phause-cyan" />
                    </motion.div>

                    <h2 className="text-3xl font-extrabold">Thank you!</h2>

                    <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
                      Your organization has been registered successfully. We&apos;ll
                      use this email address for the next steps.
                    </p>

                    <p className="mt-4 break-all text-sm text-phause-cyan">
                      {form.email}
                    </p>

                    <motion.a
                      href="/login"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-phause-cyan to-phause-teal px-7 py-4 font-bold text-phause-dark shadow-[0_0_30px_rgba(0,216,201,0.15)]"
                    >
                      Continue to dashboard
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Form header */}
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-extrabold tracking-tight sm:text-[28px]">
                          Create an account
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          Enter your details to get started.
                        </p>
                      </div>

                      <motion.div
                        animate={
                          reduceMotion
                            ? undefined
                            : { y: [0, -4, 0], rotate: [0, 3, 0] }
                        }
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-phause-cyan/20 bg-gradient-to-br from-phause-cyan/15 to-phause-teal/5 sm:flex"
                      >
                        <ShieldCheck className="h-6 w-6 text-phause-cyan" />
                      </motion.div>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      {/* Full name */}
                      <motion.div
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.08, duration: 0.45 }}
                      >
                        <label
                          htmlFor="fullName"
                          className="mb-2.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-300"
                        >
                          Full name <span className="text-phause-cyan">*</span>
                        </label>

                        <div className="group relative">
                          <UserRound className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-phause-cyan" />

                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            value={form.fullName}
                            onChange={(event) =>
                              updateField("fullName", event.target.value)
                            }
                            aria-invalid={Boolean(errors.fullName)}
                            aria-describedby={
                              errors.fullName ? "fullName-error" : undefined
                            }
                            className={getInputClass("fullName")}
                          />
                        </div>

                        <AnimatePresence>
                          {errors.fullName && (
                            <motion.p
                              id="fullName-error"
                              role="alert"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
                            >
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              {errors.fullName}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Organisation name */}
                      <motion.div
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.14, duration: 0.45 }}
                      >
                        <label
                          htmlFor="organisationName"
                          className="mb-2.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-300"
                        >
                          Organisation name{" "}
                          <span className="text-phause-cyan">*</span>
                        </label>

                        <div className="group relative">
                          <Building2 className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-phause-cyan" />

                          <input
                            id="organisationName"
                            name="organisationName"
                            type="text"
                            autoComplete="organization"
                            placeholder="Enter your organisation"
                            value={form.organisationName}
                            onChange={(event) =>
                              updateField(
                                "organisationName",
                                event.target.value,
                              )
                            }
                            aria-invalid={Boolean(errors.organisationName)}
                            aria-describedby={
                              errors.organisationName
                                ? "organisationName-error"
                                : undefined
                            }
                            className={getInputClass("organisationName")}
                          />
                        </div>

                        <AnimatePresence>
                          {errors.organisationName && (
                            <motion.p
                              id="organisationName-error"
                              role="alert"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
                            >
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              {errors.organisationName}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2, duration: 0.45 }}
                      >
                        <label
                          htmlFor="email"
                          className="mb-2.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-300"
                        >
                          Work email{" "}
                          <span className="text-phause-cyan">*</span>
                        </label>

                        <div className="group relative">
                          <AtSign className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-phause-cyan" />

                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            placeholder="you@organisation.com"
                            value={form.email}
                            onChange={(event) =>
                              updateField("email", event.target.value)
                            }
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                              errors.email ? "email-error" : undefined
                            }
                            className={getInputClass("email")}
                          />
                        </div>

                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              id="email-error"
                              role="alert"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
                            >
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Password */}
                      <motion.div
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.26, duration: 0.45 }}
                      >
                        <label
                          htmlFor="password"
                          className="mb-2.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-300"
                        >
                          Password{" "}
                          <span className="text-phause-cyan">*</span>
                        </label>

                        <div className="group relative">
                          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-phause-cyan" />

                          <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Create a strong password"
                            value={form.password}
                            onChange={(event) =>
                              updateField("password", event.target.value)
                            }
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={
                              errors.password ? "password-error" : undefined
                            }
                            className={`${getInputClass("password")} pr-12`}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword((previous) => !previous)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-white/5 hover:text-phause-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-phause-cyan/50"
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.span
                                key={showPassword ? "hide" : "show"}
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.7 }}
                                transition={{ duration: 0.15 }}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-[18px] w-[18px]" />
                                ) : (
                                  <Eye className="h-[18px] w-[18px]" />
                                )}
                              </motion.span>
                            </AnimatePresence>
                          </button>
                        </div>

                        <AnimatePresence>
                          {form.password && (
                            <PasswordStrength password={form.password} />
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {errors.password && (
                            <motion.p
                              id="password-error"
                              role="alert"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-red-400"
                            >
                              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                              {errors.password}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Region */}
                      <motion.div
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.32, duration: 0.45 }}
                      >
                        <label
                          htmlFor="region"
                          className="mb-2.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-300"
                        >
                          Region <span className="text-phause-cyan">*</span>
                        </label>

                        <div className="group relative">
                          <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-phause-cyan" />

                          <select
                            id="region"
                            name="region"
                            value={form.region}
                            onChange={(event) =>
                              updateField("region", event.target.value)
                            }
                            aria-invalid={Boolean(errors.region)}
                            aria-describedby={
                              errors.region ? "region-error" : undefined
                            }
                            className={`${getInputClass("region")} appearance-none pr-12 ${
                              form.region ? "text-white" : "text-slate-500"
                            }`}
                          >
                            <option value="" disabled className="bg-[#07121a]">
                              Select your region
                            </option>

                            {regions.map((region) => (
                              <option
                                key={region}
                                value={region}
                                className="bg-[#07121a] text-white"
                              >
                                {region}
                              </option>
                            ))}
                          </select>

                          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-transform duration-300 group-focus-within:rotate-180 group-focus-within:text-phause-cyan" />
                        </div>

                        <AnimatePresence>
                          {errors.region && (
                            <motion.p
                              id="region-error"
                              role="alert"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
                            >
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              {errors.region}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Terms and conditions */}
                      <motion.div
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.38, duration: 0.45 }}
                        className="pt-1"
                      >
                        <label className="group flex cursor-pointer items-start gap-3">
                          <span className="relative mt-0.5 flex shrink-0">
                            <input
                              type="checkbox"
                              name="termsAccepted"
                              checked={form.termsAccepted}
                              onChange={(event) =>
                                updateField(
                                  "termsAccepted",
                                  event.target.checked,
                                )
                              }
                              aria-invalid={Boolean(errors.termsAccepted)}
                              aria-describedby={
                                errors.termsAccepted
                                  ? "termsAccepted-error"
                                  : undefined
                              }
                              className="peer sr-only"
                            />

                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-phause-cyan/50 ${
                                form.termsAccepted
                                  ? "border-phause-cyan bg-phause-cyan text-phause-dark shadow-[0_0_15px_rgba(0,216,201,0.2)]"
                                  : errors.termsAccepted
                                    ? "border-red-400/70 bg-red-400/5"
                                    : "border-slate-600 bg-white/[0.03] group-hover:border-phause-cyan/60"
                              }`}
                            >
                              <AnimatePresence>
                                {form.termsAccepted && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0.4 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.4 }}
                                  >
                                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </span>
                          </span>

                          <span className="text-sm leading-6 text-slate-400 transition-colors group-hover:text-slate-300">
                            I agree to the{" "}
                            <a
                              href="/terms"
                              onClick={(event) => event.stopPropagation()}
                              className="font-semibold text-phause-cyan underline decoration-phause-cyan/30 underline-offset-4 transition-colors hover:text-white"
                            >
                              Terms &amp; Conditions
                            </a>{" "}
                            and{" "}
                            <a
                              href="/privacy"
                              onClick={(event) => event.stopPropagation()}
                              className="font-semibold text-phause-cyan underline decoration-phause-cyan/30 underline-offset-4 transition-colors hover:text-white"
                            >
                              Privacy Policy
                            </a>
                            .
                          </span>
                        </label>

                        <AnimatePresence>
                          {errors.termsAccepted && (
                            <motion.p
                              id="termsAccepted-error"
                              role="alert"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
                            >
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              {errors.termsAccepted}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* API error */}
                      <AnimatePresence>
                        {status === "error" && (
                          <motion.div
                            role="alert"
                            initial={{ opacity: 0, height: 0, y: -5 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-start gap-3 overflow-hidden rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-4 text-sm text-red-300"
                          >
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>{serverMessage}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={status === "submitting"}
                        whileHover={
                          reduceMotion || status === "submitting"
                            ? undefined
                            : { scale: 1.015 }
                        }
                        whileTap={
                          reduceMotion || status === "submitting"
                            ? undefined
                            : { scale: 0.985 }
                        }
                        className="group relative mt-2 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-phause-cyan to-phause-teal px-6 py-[17px] font-bold text-phause-dark shadow-[0_0_30px_rgba(0,216,201,0.16)] transition-shadow duration-500 hover:shadow-[0_0_42px_rgba(0,216,201,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {/* Animated shine */}
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/25 blur-md"
                          animate={
                            reduceMotion
                              ? undefined
                              : { left: ["-50%", "150%"] }
                          }
                          transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            repeatDelay: 1.2,
                            ease: "easeInOut",
                          }}
                        />

                        <span className="relative flex items-center justify-center gap-2.5">
                          {status === "submitting" ? (
                            <>
                              <LoaderCircle className="h-5 w-5 animate-spin" />
                              Creating your account...
                            </>
                          ) : (
                            <>
                              Create account
                              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                      </motion.button>

                      {/* Security note */}
                      <div className="flex items-center justify-center gap-2 pt-1 text-center text-[11px] leading-5 text-slate-500">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-phause-cyan/70" />
                        <span>
                          Your information is handled securely.
                        </span>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom border */}
            <div className="h-px bg-gradient-to-r from-transparent via-phause-cyan/30 to-transparent" />
          </div>
        </motion.div>

      </section>
    </main>
  );
}