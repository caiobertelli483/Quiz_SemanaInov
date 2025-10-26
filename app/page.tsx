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

const STORAGE_KEY = "quiz-questions"

export default function QuizPage() {
  const [gameState, setGameState] = useState<GameState>("setup")
  const [questions, setQuestions] = useState<Question[]>([])
  const [playerAScore, setPlayerAScore] = useState(0)
  const [playerBScore, setPlayerBScore] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuestions(parsed)
        }
      } catch (e) {
        console.error("Failed to load saved questions", e)
      }
    }
  }, [])

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions))
    }
  }, [questions])

  const startGame = (newQuestions: Question[]) => {
    setQuestions(newQuestions)
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
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-yellow-400 relative overflow-hidden">
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
