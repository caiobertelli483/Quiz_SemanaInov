"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Play } from "lucide-react"
import type { Question } from "@/app/page"

type QuizSetupProps = {
  onStart: (questions: Question[]) => void
  initialQuestions?: Question[]
  onUpdate?: (questions: Question[]) => void
}

export function QuizSetup({ onStart, initialQuestions, onUpdate }: QuizSetupProps) {
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions && initialQuestions.length > 0
      ? initialQuestions
      : [
          {
            question: "Qual é a capital do Brasil?",
            options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
            correctAnswer: 2,
          },
        ],
  )

  useEffect(() => {
    if (onUpdate) {
      onUpdate(questions)
    }
  }, [questions, onUpdate])

  const addQuestion = () => {
    if (questions.length < 11) {
      setQuestions([
        ...questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
        },
      ])
    }
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setQuestions(newQuestions)
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].options[oIndex] = value
    setQuestions(newQuestions)
  }

  const canStart =
    questions.length >= 1 && questions.every((q) => q.question.trim() && q.options.every((o) => o.trim()))

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">Quiz Visão Computacional</h1>
        <p className="text-lg text-white/90 drop-shadow">Configure de 1 a 11 perguntas para a batalha</p>
      </div>

      <div className="space-y-6 mb-8">
        {questions.map((q, qIndex) => (
          <Card
            key={qIndex}
            className="p-6 border-2 hover:border-primary/50 transition-colors bg-white/95 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <Label className="text-lg font-semibold text-primary">Pergunta {qIndex + 1}</Label>
              {questions.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Digite a pergunta..."
                  value={q.question}
                  onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctAnswer === oIndex}
                      onChange={() => updateQuestion(qIndex, "correctAnswer", oIndex)}
                      className="w-4 h-4 accent-primary"
                    />
                    <Input
                      placeholder={`Opção ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      className={q.correctAnswer === oIndex ? "border-primary" : ""}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        {questions.length < 11 && (
          <Button
            onClick={addQuestion}
            variant="outline"
            size="lg"
            className="gap-2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
          >
            <Plus className="h-5 w-5" />
            Adicionar Pergunta ({questions.length}/11)
          </Button>
        )}

        <Button
          onClick={() => onStart(questions)}
          disabled={!canStart}
          size="lg"
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 shadow-xl"
        >
          <Play className="h-5 w-5" />
          Iniciar Quiz
        </Button>
      </div>
    </div>
  )
}
