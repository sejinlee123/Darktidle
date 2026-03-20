import {Outlet, Link} from "react-router-dom";
import {Button} from "@/components/ui/button";

export default function Layout() {
  return (
    <div className="dark relative min-h-screen flex flex-col text-zinc-100 selection:bg-primary selection:text-black font-mono">
      {/* 1. FIXED BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/darktide_city_wallpaper.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 2. ATMOSPHERIC OVERLAYS */}
      {/* Tinted Overlay: Using a very dark green-black instead of pure zinc */}
      <div className="fixed inset-0 z-0 bg-[#020402]/90 pointer-events-none" />

      {/* CRT SCANLINE EFFECT: Adds those thin horizontal lines seen on old monitors */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,4px_100%]" />

      {/* 3. NAVIGATION HEADER */}
      <header className="sticky z-20 border-b border-primary/20 p-4 flex justify-between items-center bg-black/60 backdrop-blur-xl top-0">
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-primary drop-shadow-[0_0_8px_rgba(74,222,128,0.6)] uppercase italic">
            DARKTIDLE
          </h1>
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary/40 font-bold">
            Vox-Relay System // Active
          </span>
        </div>

        <nav className="flex gap-2">
          {["Home", "Play", "Library", "Leaderboard", "About"].map((item) => (
            <Button
              key={item}
              variant="ghost"
              asChild
              className="text-primary/60 hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/30"
            >
              <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                {item}
              </Link>
            </Button>
          ))}
        </nav>
      </header>

      {/* 4. MAIN CONTENT */}
      <main className="relative z-10 flex-1 container mx-auto py-8 px-4">
        {/* We wrap the outlet in a container that applies a subtle green glow to the central area */}
        <div className="drop-shadow-[0_0_25px_rgba(74,222,128,0.05)]">
          <Outlet />
        </div>
      </main>

      {/* 5. FOOTER */}
      <footer className="relative z-10 border-t border-primary/10 bg-black/80 py-8 text-center backdrop-blur-md">
        <div className="space-y-1 opacity-60">
          <p className="text-[9px] text-primary/80 uppercase tracking-[0.6em] font-bold">
            Property of the Holy Inquisition
          </p>
          <p className="text-[8px] text-red-500/80 uppercase tracking-[0.4em]">
            Unauthorized Access is Punishable by Death
          </p>
        </div>
      </footer>
    </div>
  );
}
