"use client"

import { useState, useEffect } from "react"
import { QuizSetup } from "@/components/quiz-setup"
import { QuizGame } from "@/components/quiz-game"
import { QuizResults } from "@/components/quiz-results"

export type Question = {
  question: string
  options: string[]
  correctAnswer: number
}

export type GameState = "setup" | "playing" | "results"

export default function QuizPage() {
  const [gameState, setGameState] = useState<GameState>("setup")
  const [questions, setQuestions] = useState<Question[]>([])
  const [playerAScore, setPlayerAScore] = useState(0)
  const [playerBScore, setPlayerBScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar perguntas do servidor ao iniciar
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/api/questions')
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data) && data.length > 0) {
            setQuestions(data)
          }
        }
      } catch (e) {
        console.error("Failed to load questions from server", e)
      } finally {
        setIsLoading(false)
      }
    }
    loadQuestions()
  }, [])

  // Salvar perguntas no servidor quando alteradas
  const saveQuestions = async (newQuestions: Question[]) => {
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestions),
      })
    } catch (e) {
      console.error("Failed to save questions to server", e)
    }
  }

  const startGame = (newQuestions: Question[]) => {
    setQuestions(newQuestions)
    saveQuestions(newQuestions)
    setPlayerAScore(0)
    setPlayerBScore(0)
    setGameState("playing")
  }

  const endGame = (scoreA: number, scoreB: number) => {
    setPlayerAScore(scoreA)
    setPlayerBScore(scoreB)
    setGameState("results")
  }

  const restartWithSameQuestions = () => {
    setPlayerAScore(0)
    setPlayerBScore(0)
    setGameState("playing")
  }

  const createNewQuiz = () => {
    setGameState("setup")
    setPlayerAScore(0)
    setPlayerBScore(0)
    setQuestions([])
  }

  const editQuestions = () => {
    setGameState("setup")
  }

  const updateQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions)
    saveQuestions(newQuestions)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-linear-to-br from-blue-600 via-blue-400 to-yellow-400 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Carregando perguntas...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-600 via-blue-400 to-yellow-400 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Logo MRS como marca d'água */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5"
        style={{
          backgroundImage: "url('/logo-mrs.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "50%",
        }}
      />

      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10">
        {gameState === "setup" && (
          <QuizSetup onStart={startGame} initialQuestions={questions} onUpdate={updateQuestions} />
        )}
        {gameState === "playing" && <QuizGame questions={questions} onGameEnd={endGame} onEdit={editQuestions} />}
        {gameState === "results" && (
          <QuizResults
            playerAScore={playerAScore}
            playerBScore={playerBScore}
            totalQuestions={questions.length}
            onRestartSameQuiz={restartWithSameQuestions}
            onCreateNewQuiz={createNewQuiz}
            onEditQuestions={editQuestions}
          />
        )}
      </div>
    </main>
  )
}
