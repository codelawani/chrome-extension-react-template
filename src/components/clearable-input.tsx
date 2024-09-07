import { Dispatch } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
export default function ClearableInput({
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
