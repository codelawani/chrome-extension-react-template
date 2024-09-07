import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type TShortUrl = { text: string; success: boolean };

export default function CopyButton({ text, success }: TShortUrl) {
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
          {success ? <Success text={text} /> : <Error text={text} />}
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
function Success({ text }: { text: string }) {
  return <p className="text-blue-400 font-light text-sm">{text}</p>;
}
export function Error({ text }: { text: string }) {
  return <p className="text-red-500 font-bold">{text + "!"}</p>;
}
