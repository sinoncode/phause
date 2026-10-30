export type CreateOrganizationInput = {
  name: string;
  verifiedEmailDomains: string[];
  region: string;
  disclaimerEnabled: boolean;
  eventRetentionMonths: number;
};

export async function createOrganization(input: CreateOrganizationInput) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      result?.message || result?.error || "We couldn't create your organization. Please try again.";
    throw new Error(Array.isArray(message) ? message.join(" ") : message);
  }

  return result;
}
