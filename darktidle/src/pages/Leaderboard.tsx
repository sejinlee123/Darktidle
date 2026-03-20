import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Trophy, Medal, Target, User} from "lucide-react";

// Mock data for the leaderboard
const topArchivists = [
  {rank: 1, name: "Varlet_77", streak: 42, accuracy: "98%", class: "Veteran"},
  {rank: 2, name: "Beloveds_BFF", streak: 38, accuracy: "94%", class: "Psyker"},
  {
    rank: 3,
    name: "Ration_Hoarder",
    streak: 31,
    accuracy: "89%",
    class: "Ogryn",
  },
  {
    rank: 4,
    name: "Tertium_Ghost",
    streak: 25,
    accuracy: "91%",
    class: "Veteran",
  },
  {
    rank: 5,
    name: "Chainsword_Enthusiast",
    streak: 19,
    accuracy: "85%",
    class: "Zealot",
  },
];

export default function Leaderboard() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-primary">
          VOX ARCHIVE RANKINGS
        </h1>
        <p className="text-muted-foreground uppercase text-[10px] tracking-[0.3em]">
          TOP PERFORMING AGENTS // ATOMA PRIME SECTOR
        </p>
      </div>

      <div className="grid gap-6">
        {/* Top 3 Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topArchivists.slice(0, 3).map((agent, i) => (
            <Card
              key={agent.name}
              className={`bg-zinc-950 border-zinc-800 ${i === 0 ? "border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.1)]" : ""}`}
            >
              <CardContent className="pt-6 text-center space-y-2">
                <div className="flex justify-center">
                  {i === 0 && <Trophy className="text-yellow-500 h-8 w-8" />}
                  {i === 1 && <Medal className="text-zinc-400 h-8 w-8" />}
                  {i === 2 && <Medal className="text-amber-700 h-8 w-8" />}
                </div>
                <p className="font-black text-lg tracking-tight">
                  {agent.name}
                </p>
                <div className="text-[10px] text-primary uppercase font-bold tracking-widest">
                  {agent.streak} STREAK
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main List */}
        <Card className="bg-zinc-950 border-zinc-800 overflow-hidden">
          <CardHeader className="border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-4">
              <Target className="text-primary h-5 w-5" />
              <CardTitle className="text-xl">Grand Archivists</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase text-zinc-500 tracking-widest border-b border-zinc-800">
                    <th className="px-6 py-4 font-medium">Rank</th>
                    <th className="px-6 py-4 font-medium">Agent</th>
                    <th className="px-6 py-4 font-medium">Class</th>
                    <th className="px-6 py-4 font-medium text-right">
                      Max Streak
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {topArchivists.map((agent) => (
                    <tr
                      key={agent.rank}
                      className="group hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-zinc-500 font-mono">
                          #{agent.rank.toString().padStart(2, "0")}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-primary/30">
                          <User className="h-4 w-4 text-zinc-500" />
                        </div>
                        <span className="font-bold text-sm">{agent.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs uppercase tracking-tighter text-zinc-400">
                          {agent.class}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-primary font-black">
                          {agent.streak}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Your Personal Status Footer */}
        <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-widest">
              Your Current Ranking: #1,402
            </span>
          </div>
          <button className="text-[10px] uppercase font-bold text-primary hover:underline">
            Refresh Vox-Link
          </button>
        </div>
      </div>
    </div>
  );
}
