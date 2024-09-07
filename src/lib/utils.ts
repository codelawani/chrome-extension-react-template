import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function validateUrl(url: string) {
  const urlSchema = z
    .string()
    .url()
    .startsWith("https://", { message: "Invalid/Insecure URL" });
  try {
    const res = urlSchema.parse(url);
    return res;
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      throw new Error(err.format()._errors[0]);
    }
    throw new Error("Something went wrong");
  }
}
function genRandString(length = 7) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
function shortenURLBrowser(longURL: string) {
  const shortenedURLs = JSON.parse(
    localStorage.getItem("shortenedURLs") || "{}"
  );

  if (shortenedURLs[longURL]) {
    console.log("This URL has already been shortened:", shortenedURLs[longURL]);
    return shortenedURLs[longURL];
  } else {
    const randomString = genRandString();
    const shortURL = `bit.ly/${randomString}`;

    // Save the new shortened URL
    shortenedURLs[longURL] = shortURL;
    localStorage.setItem("shortenedURLs", JSON.stringify(shortenedURLs));
    console.log("URL shortened successfully:", shortURL);
    return shortURL;
  }
}

export const shortenUrl = async (longUrl: string) => {
  return shortenURLBrowser(longUrl);

  const token = import.meta.env.VITE_BITLY_TOKEN;

  const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      long_url: longUrl,
    }),
  });
  const data = await response.json();
  console.log(data);
  console.log("Shortened URL:", data.link);
  return data.link.replace("https://", "");
};
