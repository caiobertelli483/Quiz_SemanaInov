# Quiz Semana de Inovação 🎮

Quiz interativo de perguntas e respostas para 2 jogadores, desenvolvido com Next.js 14 e TypeScript.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Como rodar o projeto

### 1️⃣ Clone o repositório

```powershell
git clone https://github.com/caiobertelli483/Quiz_SemanaInov.git
cd Quiz_SemanaInov
```

### 2️⃣ Instale as dependências

```powershell
npm install
```

### 3️⃣ Execute o servidor de desenvolvimento

```powershell
npm run dev
```

### 4️⃣ Acesse no navegador

Abra [http://localhost:3000](http://localhost:3000)


## 📁 Estrutura do projeto

```
Quiz_SemanaInov/
├── app/
│   ├── api/questions/     # API de persistência de perguntas
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/
│   ├── ui/                # Componentes UI (Button, Card, Input, Label)
│   ├── quiz-game.tsx      # Componente do jogo
│   ├── quiz-results.tsx   # Componente de resultados
│   └── quiz-setup.tsx     # Componente de configuração
├── data/
│   └── questions.json     # Banco de perguntas
├── lib/
│   └── utils.ts           # Funções utilitárias
├── package.json           # Dependências do projeto
└── README.md             # Este arquivo
```

`


