import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Info, Github, ShieldAlert, Cpu} from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-primary">
          PROJECT: DARKTIDLE
        </h1>
        <p className="text-muted-foreground uppercase text-[10px] tracking-[0.3em]">
          Classified Information // Level 4 Clearance Required
        </p>
      </div>

      <div className="grid gap-6">
        {/* The Concept */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Cpu className="text-primary h-5 w-5" />
            </div>
            <CardTitle className="text-xl">The Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-400 leading-relaxed">
            <p>
              Darktidle is a fan-made audio recognition game inspired by{" "}
              <strong>Heardle</strong>. The goal is simple: identify the
              character personality from the voice lines found within the hive
              city of Tertium.
            </p>
          </CardContent>
        </Card>

        {/* How to Play */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Info className="text-primary h-5 w-5" />
            </div>
            <CardTitle className="text-xl">How to Play</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-zinc-400">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Listen to the audio transmission provided by the vox-link.
              </li>
              <li>Submit your identification using the search terminal.</li>
              <li>
                You have <strong>7 attempts</strong> to identify the correct
                personality.
              </li>
              <li>Incorrect guesses will be logged as failed decryptions.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Legal/Credits */}
        <Card className="bg-zinc-950 border-red-900/30 border-2">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <ShieldAlert className="text-red-500 h-5 w-5" />
            </div>
            <CardTitle className="text-xl text-red-400">Legal Notice</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-zinc-500 space-y-3">
            <p>
              This is a non-commercial, fan-made project. All audio assets,
              characters, and world-building elements are property of{" "}
              <strong>Fatshark AB</strong> and
              <strong> Games Workshop</strong>.
            </p>
            <p>
              Darktidle is not affiliated with, endorsed, or sponsored by
              Fatshark or Games Workshop. We just really like the voice acting
              in Darktide.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer Links */}
      <div className="flex justify-center gap-6 pt-6">
        <a
          href="https://github.com/"
          target="_blank"
          className="flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-sm"
        >
          <Github className="h-4 w-4" />
          Source Code
        </a>
      </div>
    </div>
  );
}
