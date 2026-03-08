const EXTERNAL_URL_PATTERN = /^[a-z][a-z\d+.-]*:/i;

export const isExternalUrl = (url: string): boolean => {
  return EXTERNAL_URL_PATTERN.test(url);
};
