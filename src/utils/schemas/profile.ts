import { DEFAULT_URL } from "@/content";

// Site creation date (static, ISO 8601 format)
const SITE_CREATED_DATE = "2023-01-01T00:00:00+00:00";

const getCurrentDate = (): string => {
  return new Date().toISOString();
};

export const getProfilePageSchema = (): object => ({
  "@context": "https://schema.org",
  "@id": `${DEFAULT_URL}/`,
  "@type": "ProfilePage",
  dateCreated: SITE_CREATED_DATE,
  dateModified: getCurrentDate(),
  mainEntity: { "@id": `${DEFAULT_URL}#identity` },
});
