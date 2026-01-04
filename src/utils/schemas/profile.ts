import { DEFAULT_URL } from "@/content";

// Site creation date (static)
const SITE_CREATED_DATE = "2023-01-01";

const getCurrentDate = (): string => {
  const isoDate = new Date().toISOString();
  return isoDate.slice(0, 10);
};

export const getProfilePageSchema = (): object => ({
  "@context": "https://schema.org",
  "@id": `${DEFAULT_URL}/`,
  "@type": "ProfilePage",
  dateCreated: SITE_CREATED_DATE,
  dateModified: getCurrentDate(),
  mainEntity: { "@id": `${DEFAULT_URL}#identity` },
});
