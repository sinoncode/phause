/* ══════════════════ SHARED PLAN DATA ══════════════════ */
export interface Plan {
    id: string;
    name: string;
    tagline: string;
    priceMonthly: number | null; // null = custom
    priceYearly: number | null;
    cta: string;
    popular?: boolean;
    accent: "cyan" | "teal" | "violet" | "amber" | "slate";
    stats: { label: string; value: string }[];
    features: { label: string; included: boolean }[];
}

export const PLANS: Plan[] = [
    {
        id: "sentinel-free",
        name: "Sentinel Free",
        tagline: "For individuals & small teams getting their first foothold in security.",
        priceMonthly: 0,
        priceYearly: 0,
        cta: "Start Free Forever",
        accent: "slate",
        stats: [
            { label: "Protected Endpoints", value: "Up to 5" },
            { label: "Monthly Events", value: "1M" },
            { label: "Data Retention", value: "7 days" },
            { label: "Support", value: "Community" },
        ],
        features: [
            { label: "Core threat detection agent", included: true },
            { label: "Community detection rule packs", included: true },
            { label: "Phishing awareness training (10 seats)", included: true },
            { label: "Weekly security posture report", included: true },
            { label: "Automated incident response", included: false },
            { label: "Cloud posture management (CSPM)", included: false },
            { label: "24/7 human SOC monitoring", included: false },
            { label: "Compliance automation", included: false },
        ],
    },
    {
        id: "sentinel-starter",
        name: "Sentinel Starter",
        tagline: "For growing teams that need real protection without enterprise overhead.",
        priceMonthly: 29,
        priceYearly: 24,
        cta: "Choose Starter",
        accent: "teal",
        stats: [
            { label: "Protected Endpoints", value: "Up to 50" },
            { label: "Monthly Events", value: "100M" },
            { label: "Data Retention", value: "30 days" },
            { label: "Support", value: "Email, 12h SLA" },
        ],
        features: [
            { label: "Everything in Sentinel Free", included: true },
            { label: "Behavioral ML detection (Phause Sense)", included: true },
            { label: "Automated response playbooks", included: true },
            { label: "AWS / Azure / GCP posture scanning", included: true },
            { label: "Dependency & secrets scanning", included: true },
            { label: "24/7 human SOC monitoring", included: false },
            { label: "Compliance automation", included: false },
            { label: "Named security team", included: false },
        ],
    },
    {
        id: "sentinel-professional",
        name: "Sentinel Professional",
        tagline: "Our flagship plan — full platform power for mid-size security operations.",
        priceMonthly: 99,
        priceYearly: 79,
        cta: "Choose Professional",
        popular: true,
        accent: "cyan",
        stats: [
            { label: "Protected Endpoints", value: "Up to 500" },
            { label: "Monthly Events", value: "5B" },
            { label: "Data Retention", value: "1 year" },
            { label: "Support", value: "24/7 chat, 1h SLA" },
        ],
        features: [
            { label: "Everything in Sentinel Starter", included: true },
            { label: "24/7 human SOC monitoring", included: true },
            { label: "Compliance automation (SOC 2, ISO 27001)", included: true },
            { label: "API security testing & fuzzing", included: true },
            { label: "Named security team + quarterly briefing", included: true },
            { label: "Custom detection rules engine", included: true },
            { label: "Threat intelligence feeds (premium)", included: false },
            { label: "Dedicated infrastructure option", included: false },
        ],
    },
    {
        id: "sentinel-business",
        name: "Sentinel Business",
        tagline: "For enterprises with multi-cloud estates and strict regulatory demands.",
        priceMonthly: 299,
        priceYearly: 249,
        cta: "Choose Business",
        accent: "violet",
        stats: [
            { label: "Protected Endpoints", value: "Up to 5,000" },
            { label: "Monthly Events", value: "50B" },
            { label: "Data Retention", value: "3 years" },
            { label: "Support", value: "Dedicated TAM, 15m SLA" },
        ],
        features: [
            { label: "Everything in Sentinel Professional", included: true },
            { label: "Premium threat intelligence feeds", included: true },
            { label: "HIPAA / PCI DSS / GDPR automation", included: true },
            { label: "Zero-trust identity analytics", included: true },
            { label: "Multi-tenant & MSSP management", included: true },
            { label: "Quarterly red-team collaboration", included: true },
            { label: "Dedicated infrastructure option", included: true },
            { label: "Custom contractual SLA", included: false },
        ],
    },
    {
        id: "sentinel-sovereign",
        name: "Sentinel Sovereign",
        tagline: "Air-gapped, on-premise, post-quantum ready. Security without compromise.",
        priceMonthly: null,
        priceYearly: null,
        cta: "Talk to Sales",
        accent: "amber",
        stats: [
            { label: "Protected Endpoints", value: "Unlimited" },
            { label: "Monthly Events", value: "Unlimited" },
            { label: "Data Retention", value: "Unlimited" },
            { label: "Support", value: "White-glove, 5m SLA" },
        ],
        features: [
            { label: "Everything in Sentinel Business", included: true },
            { label: "Air-gapped / on-premise deployment", included: true },
            { label: "Custom contractual SLA", included: true },
            { label: "Post-quantum crypto migration lab", included: true },
            { label: "Source-code escrow availability", included: true },
            { label: "On-site incident response team", included: true },
            { label: "Executive threat briefing (monthly)", included: true },
            { label: "Co-branded threat research program", included: true },
        ],
    },
];

export const BILLING_CYCLE_STORAGE_KEY = "phause-billing-cycle";

export function formatPrice(plan: Plan, cycle: "monthly" | "yearly"): string {
    const price = cycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
    if (price === null) return "Custom";
    if (price === 0) return "$0";
    return `$${price}`;
}
