export type LoginInput = {
  email: string;
  password: string;
};

export async function login(input: LoginInput) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const message = result?.message || result?.error || "We couldn't sign you in. Please check your details and try again.";
    throw new Error(Array.isArray(message) ? message.join(" ") : message);
  }

  return result;
}
