"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer, Zap, Edit } from "lucide-react"
import type { Question } from "@/app/page"

type QuizGameProps = {
  questions: Question[]
  onGameEnd: (scoreA: number, scoreB: number) => void
  onEdit: () => void
}

type GamePhase = "waiting" | "answering" | "feedback"

export function QuizGame({ questions, onGameEnd, onEdit }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [phase, setPhase] = useState<GamePhase>("waiting")
  const [timer, setTimer] = useState(5)
  const [activePlayer, setActivePlayer] = useState<"A" | "B" | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)
  const [showCorrect, setShowCorrect] = useState(false)

  const currentQ = questions[currentQuestion]

  // Timer countdown
  useEffect(() => {
    if (phase === "waiting" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [phase, timer])

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (phase === "waiting" && !activePlayer && timer === 0) {
        if (e.key === "a" || e.key === "A") {
          e.preventDefault()
          setActivePlayer("A")
          setPhase("answering")
        } else if (e.key === "l" || e.key === "L") {
          e.preventDefault()
          setActivePlayer("B")
          setPhase("answering")
        }
      }
    },
    [phase, activePlayer, timer],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowCorrect(true)
    setPhase("feedback")

    const isCorrect = answerIndex === currentQ.correctAnswer
    if (isCorrect) {
      if (activePlayer === "A") {
        setScoreA((s) => s + 1)
      } else {
        setScoreB((s) => s + 1)
      }
    } else {
      if (activePlayer === "A") {
        setScoreB((s) => s + 1)
      } else {
        setScoreA((s) => s + 1)
      }
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1)
      setPhase("waiting")
      setTimer(5)
      setActivePlayer(null)
      setSelectedAnswer(null)
      setShowCorrect(false)
    } else {
      onGameEnd(scoreA, scoreB)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header with scores */}
      <div className="flex items-center justify-between mb-8">
        <Card className="px-6 py-4 bg-linear-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
          <div className="text-sm font-medium opacity-90">Jogador A (Tecla A)</div>
          <div className="text-3xl font-bold">{scoreA}</div>
        </Card>

        <div className="flex flex-col items-center gap-2">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
            <div className="text-sm text-muted-foreground mb-1">Pergunta</div>
            <div className="text-2xl font-bold text-primary">
              {currentQuestion + 1} / {questions.length}
            </div>
          </div>
          <Button onClick={onEdit} variant="outline" size="sm" className="gap-2 bg-white/90 backdrop-blur-sm shadow">
            <Edit className="h-4 w-4" />
            Editar Perguntas
          </Button>
        </div>

        <Card className="px-6 py-4 bg-linear-to-br from-yellow-400 to-yellow-500 text-gray-900 border-0 shadow-xl">
          <div className="text-sm font-medium opacity-90">Jogador B (Tecla L)</div>
          <div className="text-3xl font-bold">{scoreB}</div>
        </Card>
      </div>

      {/* Question card */}
      <Card className="p-8 mb-6 border-2 bg-white/95 backdrop-blur-sm shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-balance">{currentQ.question}</h2>

        {phase === "waiting" && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-primary/10 rounded-xl mb-4">
              <Timer className="h-8 w-8 text-primary animate-pulse" />
              <span className="text-5xl font-bold text-primary">{timer}s</span>
            </div>
            {timer > 0 ? (
              <p className="text-lg text-muted-foreground mb-4">Aguarde o timer acabar...</p>
            ) : (
              <p className="text-lg font-bold text-primary mb-4 animate-pulse">Quem responde primeiro?</p>
            )}
            <div className="flex gap-4 justify-center text-sm">
              <div
                className={`px-4 py-2 rounded-lg font-medium transition-all ${timer === 0 ? "bg-blue-500 text-white animate-pulse" : "bg-blue-100 text-blue-700"}`}
              >
                Jogador A: Tecla A
              </div>
              <div
                className={`px-4 py-2 rounded-lg font-medium transition-all ${timer === 0 ? "bg-yellow-400 text-gray-900 animate-pulse" : "bg-yellow-100 text-yellow-700"}`}
              >
                Jogador B: Tecla L
              </div>
            </div>
          </div>
        )}

        {(phase === "answering" || phase === "feedback") && (
          <>
            <div className="text-center mb-6">
              <div
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg shadow-lg ${
                  activePlayer === "A" ? "bg-blue-500 text-white" : "bg-yellow-400 text-gray-900"
                }`}
              >
                <Zap className="h-5 w-5" />
                Jogador {activePlayer} responde!
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === currentQ.correctAnswer
                const showAsCorrect = showCorrect && isCorrect
                const showAsWrong = showCorrect && isSelected && !isCorrect

                return (
                  <Button
                    key={index}
                    onClick={() => phase === "answering" && handleAnswer(index)}
                    disabled={phase === "feedback"}
                    className={`h-auto py-4 px-6 text-lg font-medium transition-all ${
                      showAsCorrect
                        ? "bg-green-500 hover:bg-green-500 text-white border-green-600"
                        : showAsWrong
                          ? "bg-red-500 hover:bg-red-500 text-white border-red-600"
                          : "bg-card hover:bg-accent text-card-foreground"
                    }`}
                    variant={isSelected && !showCorrect ? "default" : "outline"}
                  >
                    {option}
                  </Button>
                )
              })}
            </div>
          </>
        )}
      </Card>

      {phase === "feedback" && (
        <div className="text-center">
          <div
            className={`inline-block px-6 py-3 rounded-xl font-bold text-lg mb-4 shadow-lg ${
              selectedAnswer === currentQ.correctAnswer ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {selectedAnswer === currentQ.correctAnswer
              ? "✓ Resposta Correta!"
              : `✗ Errado! A resposta certa é: ${currentQ.options[currentQ.correctAnswer]}`}
          </div>
          <div>
            <Button onClick={nextQuestion} size="lg" className="px-8 shadow-lg">
              {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
