import {useState, useEffect, useRef} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {allQuotes} from "@/data/quotes.tsx";
import {GuessInput, type Guess} from "@/components/game/GuessInput.tsx";
import {Play, AudioLines} from "lucide-react";

interface Quote {
  id: number | string;
  audio: string;
  text: string;
  correct: {
    class: string;
    personality: string;
    gender: string;
  };
}

type GameStatus = "playing" | "won" | "lost";

export default function Game() {
  const [targetQuote, setTargetQuote] = useState<Quote | null>(null);
  const [attempts, setAttempts] = useState<Guess[]>([]);
  const [gameState, setGameState] = useState<GameStatus>("playing");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const maxAttempts = 7;

  useEffect(() => {
    const quotes = allQuotes as Quote[];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setTargetQuote(randomQuote);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (targetQuote) {
      audioRef.current = new Audio(`/audio/${targetQuote.audio}`);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [targetQuote]);

  const playAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .catch((err) => console.error("Audio playback failed:", err));
    setIsPlaying(true);
  };

  const handleGuess = (guess: Guess) => {
    if (gameState !== "playing" || !targetQuote) return;

    const isCorrect =
      guess.personality.toLowerCase() ===
      targetQuote.correct.personality.toLowerCase();

    if (isCorrect) {
      setGameState("won");
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
    } else {
      const newAttempts = [...attempts, guess];
      setAttempts(newAttempts);

      if (newAttempts.length >= maxAttempts) {
        setGameState("lost");
      }
    }
  };

  if (!targetQuote)
    return (
      <div className="text-center p-10 text-primary animate-pulse">
        INITIATING VOX LINK...
      </div>
    );

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      <Card className="border-2 border-primary/20 bg-black/60 backdrop-blur-md shadow-2xl">
        <CardHeader className="text-center border-b border-white/5 mb-4">
          <CardTitle className="text-2xl tracking-[0.3em] text-primary font-black">
            VOX TRANSMISSION
          </CardTitle>
          <p className="text-[10px] uppercase text-muted-foreground tracking-widest">
            Atoma Prime - Segmentum Obscurus
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-full h-16 bg-zinc-950 rounded border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="flex items-end gap-1 h-8">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-primary transition-all duration-300 ${isPlaying ? "animate-bounce" : "h-2 opacity-30"}`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    height: isPlaying ? "100%" : "8px",
                  }}
                />
              ))}
            </div>
          </div>

          <Button
            size="lg"
            variant="outline"
            className={`w-24 h-24 rounded-full border-4 transition-all ${isPlaying ? "border-primary animate-pulse" : "border-primary/20 hover:border-primary"}`}
            onClick={playAudio}
            disabled={isPlaying}
          >
            {isPlaying ? <AudioLines className="animate-pulse" /> : <Play />}
          </Button>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-[10px] uppercase tracking-tighter text-muted-foreground">
              <span>Signal Integrity</span>
              <span>
                {attempts.length} / {maxAttempts} Failed Decryptions
              </span>
            </div>
            <Progress
              value={(attempts.length / maxAttempts) * 100}
              className="h-1 bg-white [&>div]:bg-red-600"
            />
          </div>
        </CardContent>
      </Card>

      {gameState === "won" && (
        <div className="bg-green-500/10 border border-green-500/50 p-6 rounded-lg text-center shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <h2 className="text-green-400 font-black tracking-tighter text-xl mb-1">
            IDENTIFIED: {targetQuote.correct.personality.toUpperCase()}
          </h2>
          <p className="text-xs text-green-300/70 italic">
            "The Emperor protects those who listen."
          </p>
          <Button
            className="mt-4 bg-green-600 hover:bg-green-500 text-white"
            onClick={() => window.location.reload()}
          >
            Next Assignment
          </Button>
        </div>
      )}

      {gameState === "lost" && (
        <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-lg text-center">
          <h2 className="text-red-400 font-black text-xl mb-1">SIGNAL LOST</h2>
          <p className="text-xs text-red-300/70 mb-4">
            The voice was the {targetQuote.correct.personality}.
          </p>
          <Button
            variant="destructive"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="bg-green-500/10 border p-6 rounded-lg text-center shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            Submit Identification
          </p>
          <GuessInput
            onGuess={handleGuess}
            attempts={attempts}
            disabled={isPlaying}
          />

          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {attempts.map((g, i) => (
              <div
                key={i}
                className="text-[10px] bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-1 rounded"
              >
                {g.personality} ✕
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
