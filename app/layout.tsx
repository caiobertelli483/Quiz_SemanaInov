import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Quiz Visão Computacional - Semana da Inovação",
  description: "Quiz interativo para 2 jogadores sobre Visão Computacional",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
