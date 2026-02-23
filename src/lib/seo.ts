export const SITE_URL = "https://andiswa.vercel.app";
export const DEFAULT_OG_IMAGE = "/og-image.webp";

export const toAbsoluteUrl = (path: string) => {
  if (!path) {
    return SITE_URL;
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("/")) {
    return `${SITE_URL}${path}`;
  }
  return `${SITE_URL}/${path}`;
};
