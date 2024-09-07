import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
'use client'

import { useState } from 'react'
import { Check, Copy } from "lucide-react"
import { X } from "lucide-react"

export function CopyButton({ text = "Hello, world!" }: { text?: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not supported by this browser');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-2">
      <div className="flex items-center space-x-2 bg-secondary p-2 rounded-md border-2">
        <span className="text-secondary-foreground flex-grow " aria-label="Text to copy">
          {text}
        </span>
        <Button
          onClick={handleCopy}
          aria-label={isCopied ? "Text copied" : "Copy text"}
          variant="custom"
          size="icon"
          className="relative bg-blue-600"
        >
          {isCopied ? <Check className="h-4 w-4 fixed z-20 text-green-300" /> : <Copy className="h-4 w-4 fixed z-20 text-white" />}
        </Button>
      </div>
    </div>
  )
}


export function ClearableInput({ defaultValue }: {defaultValue: string}) {
   const [inputValue, setInputValue] = useState(defaultValue);

  // Function to handle input changes
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  // Function to clear the input field
  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={inputValue}
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
          <X className=" size-6 fixed z-20 "/>
        </Button>
      </div>
    </div>
  );
}
// type iPopUp = {  longUrl: string }
export default function Popup() {
  const text = "bit.ly/h3ksol"
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Create Short Link</CardTitle>
        <CardDescription>Generate a <a href="https://bitly.com" target="_blank">Bitly</a> short link in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Long URL</Label>
            <ClearableInput defaultValue="https://ui.shadcn.com/docs/components/carousel"/>
            <Button className="w-full font-bold" variant="custom" >Generate Short URL</Button>
          </div>

          <div className="flex flex-col space-y-1.5">
            <CopyButton text={text}/>
          </div>
         </div>
      </CardContent>
    </Card>
  )
}
