import * as React from "react";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {personalities} from "@/data/quotes.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// 1. Define the shape of a single personality option

// 2. Define the shape of the Guess object sent back to the parent
export interface Guess {
  personality: string;
}

// 3. Define the Props for this component
interface GuessInputProps {
  onGuess: (guess: Guess) => void;
  attempts: Guess[]; // Add this
  disabled?: boolean;
}

export function GuessInput({
  onGuess,
  attempts,
  disabled = false,
}: GuessInputProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const availableOptions = personalities.filter(
    (p) => !attempts.some((guess) => guess.personality === p.value),
  );
  return (
    <div className="w-full space-y-2 transition-all duration-300">
      {/* The Main Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-12 justify-between bg-zinc-950 border-primary/20 hover:border-primary/50 text-primary transition-all uppercase tracking-tighter",
          isOpen && "border-b-0 rounded-b-none", // Flatten bottom when open
        )}
        disabled={disabled}
      >
        {value
          ? personalities.find((p) => p.value === value)?.label
          : "INITIALIZE DECRYPTION..."}
        <ChevronsUpDown
          className={cn(
            "ml-2 h-5 w-5 shrink-0 opacity-50 text-primary transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      {/* The Expandable Section */}
      {isOpen && (
        <div className="border-x border-b border-primary/30 bg-zinc-950 overflow-hidden relative animate-in fade-in slide-in-from-top-2 duration-200 rounded-b-md">
          {/* Scanline Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-50 opacity-[0.05]"
            style={{
              background:
                "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(0, 255, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 255, 0, 0.06))",
              backgroundSize: "100% 2px, 3px 100%",
            }}
          />

          <Command
            className="bg-transparent"
            filter={(value, search) => {
              if (value.toLowerCase().includes(search.toLowerCase())) return 1;
              return 0;
            }}
          >
            {/* White Search Bar */}
            <div className="flex items-center bg-black px-3">
              <CommandInput
                placeholder="ENTER AGENT CREDENTIALS..."
                className="h-12 text-white placeholder:text-zinc-500 uppercase text-sm border-none focus:ring-0 w-full"
                autoFocus
              />
            </div>

            <CommandList className="max-h-64 border-t border-primary/10">
              <CommandEmpty className="text-primary/40 py-10 text-center text-[10px] uppercase tracking-[0.2em]">
                -- NO MATCH FOUND IN VOX ARCHIVE --
              </CommandEmpty>
              <CommandGroup>
                {availableOptions.map((p) => (
                  <CommandItem
                    key={p.value}
                    value={p.label}
                    className="aria-selected:bg-primary aria-selected:text-black text-primary/80 cursor-pointer transition-colors uppercase text-xs py-4 px-4"
                    onSelect={(currentValue) => {
                      const selected = personalities.find(
                        (item) =>
                          item.label.toLowerCase() ===
                          currentValue.toLowerCase(),
                      );
                      if (selected) {
                        onGuess({personality: selected.value});
                        setIsOpen(false);
                        setValue("");
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-3 h-4 w-4",
                        value === p.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {p.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
