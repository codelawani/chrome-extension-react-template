import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Dispatch, useState } from "react";
import { Check, Copy } from "lucide-react";
import { X } from "lucide-react";

export function CopyButton({ text = "bit.ly/4ee2kgf" }: { text?: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not supported by this browser");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="mx-auto space-y-2">
      <div className="flex items-center space-x-2 bg-secondary p-2 rounded-md border-2">
        <span
          className="text-secondary-foreground flex-grow "
          aria-label="Text to copy"
        >
          {text}
        </span>
        <Button
          onClick={handleCopy}
          aria-label={isCopied ? "Text copied" : "Copy text"}
          variant="custom"
          size="icon"
          className="relative bg-blue-600"
        >
          {isCopied ? (
            <Check className="h-4 w-4 fixed z-20 text-green-300" />
          ) : (
            <Copy className="h-4 w-4 fixed z-20 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
}

export function ClearableInput({
  inputVal,
  setInputVal,
}: {
  inputVal: string;
  setInputVal: Dispatch<React.SetStateAction<string>>;
}) {
  // Function to handle input changes
  const handleInputChange = (e: any) => {
    setInputVal(e.target.value);
  };

  // Function to clear the input field
  const handleClear = () => {
    setInputVal("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={inputVal}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <Button
          onClick={handleClear}
          variant="custom"
          size="icon"
          aria-label="Clear input"
          className="relative bg-transparent border-0 text-black hover:text-white"
        >
          <X className=" size-6 fixed z-20 " />
        </Button>
      </div>
    </div>
  );
}
const shortenUrl = async (longUrl: string) => {
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
function UrlHandler({
  setShortUrl,
}: {
  setShortUrl: Dispatch<React.SetStateAction<string>>;
}) {
  const defaultVal = "https://ui.shadcn.com/docs/components/carousel";
  const [longUrl, setLongUrl] = useState(defaultVal);
  const handleShortUrl = async (longUrl: string) => {
    const shortUrl = await shortenUrl(longUrl);
    setShortUrl(shortUrl);
  };
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="name">Long URL</Label>
      <ClearableInput inputVal={longUrl} setInputVal={setLongUrl} />
      <Button
        className="w-full font-bold"
        variant="custom"
        onClick={() => handleShortUrl(longUrl)}
      >
        Generate Short URL
      </Button>
    </div>
  );
}
// type iPopUp = {  longUrl: string }
export default function Popup() {
  const text = "bit.ly/4ee2kgf";
  const [shortUrl, setShortUrl] = useState(text);

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Create Short Link</CardTitle>
        <CardDescription>
          Generate a{" "}
          <a href="https://bitly.com" target="_blank">
            Bitly
          </a>{" "}
          short link in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <UrlHandler setShortUrl={setShortUrl} />
          <div className="flex flex-col space-y-1.5">
            <CopyButton text={shortUrl} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
