import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const questionsFilePath = path.join(process.cwd(), 'data', 'questions.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(questionsFilePath, 'utf8')
    const questions = JSON.parse(fileContents)
    return NextResponse.json(questions)
  } catch (error) {
    console.error('Error reading questions:', error)
    return NextResponse.json(
      { error: 'Failed to load questions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const questions = await request.json()
    await fs.writeFile(questionsFilePath, JSON.stringify(questions, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving questions:', error)
    return NextResponse.json(
      { error: 'Failed to save questions' },
      { status: 500 }
    )
  }
}
