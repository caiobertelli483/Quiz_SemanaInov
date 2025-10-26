"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, RotateCcw, Plus, Edit } from "lucide-react"

type QuizResultsProps = {
  playerAScore: number
  playerBScore: number
  totalQuestions: number
  onRestartSameQuiz: () => void
  onCreateNewQuiz: () => void
  onEditQuestions: () => void
}

export function QuizResults({
  playerAScore,
  playerBScore,
  totalQuestions,
  onRestartSameQuiz,
  onCreateNewQuiz,
  onEditQuestions,
}: QuizResultsProps) {
  const winner = playerAScore > playerBScore ? "A" : playerBScore > playerAScore ? "B" : "Empate"

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <Trophy className="h-20 w-20 mx-auto mb-4 text-yellow-300 drop-shadow-lg" />
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">Fim do Quiz!</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card
          className={`p-8 text-center border-4 transition-all bg-white/95 backdrop-blur-sm shadow-2xl ${
            winner === "A" ? "border-blue-500 scale-105" : "border-border"
          }`}
        >
          <div className="text-lg font-medium text-muted-foreground mb-2">Jogador A</div>
          <div className="text-6xl font-bold text-blue-600 mb-2">{playerAScore}</div>
          <div className="text-sm text-muted-foreground">de {totalQuestions} pontos</div>
          {winner === "A" && (
            <div className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-bold shadow-lg">
              🏆 VENCEDOR!
            </div>
          )}
        </Card>

        <Card
          className={`p-8 text-center border-4 transition-all bg-white/95 backdrop-blur-sm shadow-2xl ${
            winner === "B" ? "border-yellow-500 scale-105" : "border-border"
          }`}
        >
          <div className="text-lg font-medium text-muted-foreground mb-2">Jogador B</div>
          <div className="text-6xl font-bold text-yellow-600 mb-2">{playerBScore}</div>
          <div className="text-sm text-muted-foreground">de {totalQuestions} pontos</div>
          {winner === "B" && (
            <div className="mt-4 inline-block px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-bold shadow-lg">
              🏆 VENCEDOR!
            </div>
          )}
        </Card>
      </div>

      {winner === "Empate" && (
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded-xl font-bold text-xl shadow-lg">
            🤝 Empate! Ambos jogaram muito bem!
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onRestartSameQuiz}
          size="lg"
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 shadow-xl"
        >
          <RotateCcw className="h-5 w-5" />
          Recomeçar Quiz
        </Button>

        <Button
          onClick={onEditQuestions}
          size="lg"
          variant="outline"
          className="gap-2 bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white border-2 border-white/50"
        >
          <Edit className="h-5 w-5" />
          Editar Perguntas
        </Button>

        <Button
          onClick={onCreateNewQuiz}
          size="lg"
          variant="outline"
          className="gap-2 bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white border-2 border-white/50"
        >
          <Plus className="h-5 w-5" />
          Criar Novo Quiz
        </Button>
      </div>
    </div>
  )
}
