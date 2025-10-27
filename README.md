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

## 🎮 Como jogar

1. **Configure as perguntas**: Edite as perguntas existentes ou adicione novas (até 11 perguntas)
2. **Inicie o quiz**: Clique em "Iniciar Quiz"
3. **Aguarde o timer**: Quando o timer chegar a 0, os jogadores podem responder
4. **Responda primeiro**:
   - **Jogador A**: Pressione **CAPS LOCK**
   - **Jogador B**: Pressione **ENTER**
5. **Selecione a resposta**: Clique na opção correta
6. **Pontuação**: 
   - Acertou = +1 ponto para quem respondeu
   - Errou = +1 ponto para o adversário

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

## 💾 Sistema de persistência

As perguntas são salvas automaticamente em `data/questions.json` através de uma API REST:

- **GET** `/api/questions` - Carrega as perguntas
- **POST** `/api/questions` - Salva as perguntas editadas

## 🛠️ Tecnologias utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **Lucide React** - Ícones
- **Radix UI** - Componentes acessíveis

## 📝 Scripts disponíveis

```powershell
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Verifica erros de linting
```

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com melhorias:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para a Semana de Inovação.

## 👨‍💻 Autor

**Caio Bertelli** - [GitHub](https://github.com/caiobertelli483)

---

⭐ Se este projeto foi útil, considere dar uma estrela no repositório!
