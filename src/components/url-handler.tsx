import { Dispatch, useState } from "react";
import { Label } from "./ui/label";
import ClearableInput from "./clearable-input";
import { Button } from "./ui/button";
import { TShortUrl } from "@/lib/types";
import { shortenUrl, validateUrl } from "@/lib/utils";

export default function UrlHandler({
  setShortUrl,
}: {
  setShortUrl: Dispatch<React.SetStateAction<TShortUrl>>;
}) {
  const defaultVal = "https://ui.shadcn.com/docs/components/carousel";
  const [longUrl, setLongUrl] = useState(defaultVal);
  const handleShortUrl = async (longUrl: string) => {
    try {
      const res = validateUrl(longUrl);
      const shortUrlString = await shortenUrl(res);
      setShortUrl({ text: shortUrlString, success: true });
    } catch (err: any) {
      setShortUrl({ text: err.message as string, success: false });
    }
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
