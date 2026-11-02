export type CreateOrganizationInput = {
  fullName: string;
  organizationName: string;
  email: string;
  password: string;
  region: string;
  termsAccepted: boolean;
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

export async function verifyEmail(email: string, otp: string) {
  const response = await fetch("/api/auth/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const message = result?.message || result?.error || "Invalid verification code. Please try again.";
    throw new Error(Array.isArray(message) ? message.join(" ") : message);
  }

  return result;
}
