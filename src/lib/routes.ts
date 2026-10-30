/**
 * Centralized route configuration for Phause.
 * Update URLs here and they propagate everywhere (Navbar, Footer, Sitemap, etc.).
 */

export const ROUTES = {
  home: "/",
  about: "/about",
  subscription: "/subscription",
  subscriptionCheckout: "/subscription/checkout",
  registration: "/registration",
  contact: "/contact",
} as const;

/** Navigation links shown in the Navbar and Footer */
export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About Us", href: ROUTES.about },
  { label: "Subscription", href: ROUTES.subscription },
  { label: "Contact Us", href: ROUTES.contact },
];

/** Footer services column */
export const FOOTER_SERVICES: { label: string; href: string }[] = [
  { label: "Threat Detection", href: ROUTES.home + "#services" },
  { label: "Security Audits", href: ROUTES.home + "#services" },
  { label: "Cloud Protection", href: ROUTES.home + "#services" },
  { label: "Data Encryption", href: ROUTES.home + "#services" },
];
