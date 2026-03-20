import React, {useState, useEffect, useMemo} from "react";
// 1. Import BOTH the data and the Type definition from your data file
import {allQuotes, type Quote} from "@/data/quotes.tsx";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Card, CardContent} from "@/components/ui/card";
import {Play, Search, Music2, Download} from "lucide-react";

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const downloadAudio = (filename: string) => {
    const link = document.createElement("a");
    link.href = `/audio/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    return () => {
      if (activeAudio) {
        activeAudio.pause();
      }
    };
  }, [activeAudio]);

  const quotes = allQuotes as Quote[];

  const filteredQuotes = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return quotes.filter(
      (quote) =>
        quote.text.toLowerCase().includes(lowerSearch) ||
        quote.correct.personality.toLowerCase().includes(lowerSearch),
    );
  }, [searchTerm, quotes]);

  const playPreview = (filename: string) => {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }

    const newAudio = new Audio(`/audio/${filename}`);
    newAudio.play().catch((err) => console.error("Playback failed:", err));
    setActiveAudio(newAudio);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* ... rest of your JSX ... */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.2)]">
          VOX ARCHIVE
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          Authorized personnel only // Decrypted logs
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          placeholder="Search by quote text or personality..."
          className="pl-10 bg-zinc-950 border-zinc-800 focus:border-primary transition-colors"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">
        Showing {filteredQuotes.length} transmission logs
      </p>

      <ScrollArea className="h-150 rounded-md border border-zinc-800 bg-black/20 p-4">
        <div className="space-y-3">
          {filteredQuotes.map((quote) => (
            <Card
              key={quote.id}
              className="bg-zinc-900/40 border-zinc-800 hover:border-primary/30 transition-all hover:bg-zinc-900/60 group"
            >
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20 font-bold uppercase">
                      {quote.correct.personality}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase">
                      {quote.correct.class} ({quote.correct.gender})
                    </span>
                  </div>
                  <p className="text-sm text-zinc-200 italic truncate group-hover:text-white transition-colors">
                    "{quote.text}"
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full h-10 w-10 bg-zinc-800 hover:bg-primary hover:text-black transition-all"
                    onClick={() => playPreview(quote.audio)}
                  >
                    <Play className="h-4 w-4 fill-current" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full h-10 w-10 bg-zinc-800 hover:bg-primary hover:text-black transition-all"
                    onClick={() => downloadAudio(quote.audio)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredQuotes.length === 0 && (
            <div className="text-center py-20 text-zinc-600">
              <Music2 className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="uppercase text-xs tracking-widest">
                No matching vox logs found in the warp.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="bg-primary/5 border border-primary/10 p-4 rounded text-[10px] text-primary/60">
        <p className="font-bold mb-1">DATA RECOVERY STATUS:</p>
        <div className="flex gap-4">
          <span>
            VETERAN: <span className="text-green-500">COMPLETE</span>
          </span>
          <span>
            ZEALOT: <span className="text-yellow-500">80%</span>
          </span>
          <span>
            OGRYN: <span className="text-red-500">MISSING</span>
          </span>
        </div>
      </div>
    </div>
  );
}
