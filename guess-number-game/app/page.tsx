"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, RotateCcw, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GuessNumberGame() {
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [guess, setGuess] = useState<string>("")
  const [message, setMessage] = useState<string>("أهلا بك! خمن رقماً بين 1 و 100")
  const [attempts, setAttempts] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<"high" | "low" | "correct" | null>(null)
  const [shake, setShake] = useState<boolean>(false)

  // Initialize the game
  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess("")
    setMessage("أهلا بك! خمن رقماً بين 1 و 100")
    setAttempts(0)
    setGameOver(false)
    setFeedback(null)
  }

  const handleGuess = () => {
    const guessNumber = Number.parseInt(guess)

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      setMessage("الرجاء إدخال رقم صحيح بين 1 و 100")
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (guessNumber === targetNumber) {
      setMessage(`مبروك! لقد خمنت الرقم الصحيح ${targetNumber} في ${newAttempts} محاولات`)
      setGameOver(true)
      setFeedback("correct")
    } else if (guessNumber < targetNumber) {
      setMessage("تخمينك منخفض جداً! حاول مرة أخرى")
      setFeedback("low")
    } else {
      setMessage("تخمينك مرتفع جداً! حاول مرة أخرى")
      setFeedback("high")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-emerald-50 to-teal-100 p-4">
      <Card
        className={cn(
          "w-full max-w-md shadow-lg transition-all",
          shake && "animate-shake",
          gameOver && feedback === "correct" && "border-emerald-500",
        )}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-emerald-700">لعبة خمن الرقم</CardTitle>
          <CardDescription className="text-emerald-600">خمن رقماً بين 1 و 100</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            {feedback === "high" && <ArrowDown className="h-16 w-16 text-blue-500 animate-bounce" />}
            {feedback === "low" && <ArrowUp className="h-16 w-16 text-red-500 animate-bounce" />}
            {feedback === "correct" && <Trophy className="h-16 w-16 text-yellow-500 animate-pulse" />}
            {feedback === null && <div className="h-16 w-16" />}
          </div>

          <div className="text-center font-medium text-lg text-emerald-800 min-h-[3rem]">{message}</div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Input
              type="number"
              min={1}
              max={100}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="أدخل تخمينك هنا"
              className="text-center text-lg"
              onKeyDown={(e) => e.key === "Enter" && !gameOver && handleGuess()}
              disabled={gameOver}
            />
            {!gameOver ? (
              <Button onClick={handleGuess} className="bg-emerald-600 hover:bg-emerald-700">
                تخمين
              </Button>
            ) : (
              <Button onClick={startNewGame} className="bg-emerald-600 hover:bg-emerald-700">
                <RotateCcw className="mr-2 h-4 w-4" />
                لعبة جديدة
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Badge variant="outline" className="text-emerald-700">
            المحاولات: {attempts}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={startNewGame}
            className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            إعادة تشغيل
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
