import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import CopyButton from "./copy-button";
import UrlHandler from "./url-handler";
import { TShortUrl } from "@/lib/types";

export default function Popup() {
  const dummy = { text: "bit.ly/4ee2kgf", success: true };
  const [shortUrl, setShortUrl] = useState<TShortUrl>(dummy);

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Create Short Link</CardTitle>
        <CardDescription>
          Generate a fake{" "}
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
            <CopyButton text={shortUrl.text} success={shortUrl.success} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
