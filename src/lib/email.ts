import type { MouseEvent } from "react";

export const EMAIL_ADDRESS = "andiswa.masuku.southafrica@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL_ADDRESS}`;
const GMAIL_HREF = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  EMAIL_ADDRESS,
)}`;

export const openEmail = (event?: MouseEvent<HTMLAnchorElement>) => {
  if (event) {
    event.preventDefault();
  }

  if (typeof window === "undefined") {
    return;
  }

  let didBlur = false;
  const onBlur = () => {
    didBlur = true;
  };

  window.addEventListener("blur", onBlur, { once: true });
  window.location.href = EMAIL_HREF;

  window.setTimeout(() => {
    if (!didBlur) {
      window.open(GMAIL_HREF, "_blank", "noopener,noreferrer");
    }
  }, 600);
};
