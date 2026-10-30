export type RegistrationRecord = {
  fullName: string;
  organisationName: string;
  email: string;
  region: string;
};

const REGISTRATION_KEY = "phause-registration";

export const registrationStore = {
  save(record: RegistrationRecord) {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(REGISTRATION_KEY, JSON.stringify(record));
  },
  load(): RegistrationRecord | null {
    if (typeof window === "undefined") return null;

    try {
      const value = window.sessionStorage.getItem(REGISTRATION_KEY);
      return value ? (JSON.parse(value) as RegistrationRecord) : null;
    } catch {
      return null;
    }
  },
  clear() {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(REGISTRATION_KEY);
    }
  },
};
