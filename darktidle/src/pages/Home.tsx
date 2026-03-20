import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Radio, Shield, AudioLines, Trophy} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 py-10">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black tracking-tighter text-primary drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
          DARKTIDLE
        </h1>
        <p className="text-muted-foreground tracking-widest uppercase text-sm">
          Vox-Link Identification Training // Tertium Hive
        </p>
      </div>

      {/* Main Action Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-4">
        {/* Play Card */}
        <Card className="flex flex-col bg-zinc-950 border-primary/20 hover:border-primary/50 transition-all group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Daily Assignment</CardTitle>
              <Radio className="text-primary group-hover:animate-pulse" />
            </div>
            <CardDescription>
              Decrypt the vox-transmission and identify the agent.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/80 text-black font-bold"
            >
              <Link to="/play">INITIALIZE MISSION</Link>
            </Button>
          </CardContent>
        </Card>
        {/* Library Card */}
        <Card className="flex flex-col bg-zinc-950 border-primary/20 hover:border-primary/50 transition-all group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Vox Archive</CardTitle>
              <AudioLines className="text-primary group-hover:animate-pulse" />
            </div>
            <CardDescription>Review all vox traffic records.</CardDescription>
          </CardHeader>

          <CardContent className="mt-auto">
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/80 text-black font-bold"
            >
              <Link to="/library">ACCESS DATABASE</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats/Flavor Row */}
      <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/5 w-full max-w-2xl">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase">
          <Shield className="w-4 h-4" />
          <span>Active Agents: 21</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase">
          <Trophy className="w-4 h-4" />
          <span>Best Streak: 5 Days</span>
        </div>
      </div>
    </div>
  );
}
