# 🎫 Symplä - Protótipo de IHC (Engenharia de Usabilidade)

Este projeto é um protótipo funcional inspirado na plataforma **Sympla**, desenvolvido como parte da disciplina de **Interação Humano-Computador (IHC)** no **IFMG - Campus Ouro Branco**.

O objetivo principal foi aplicar conceitos de **Engenharia de Usabilidade** para criar uma experiência de compra de ingressos fluida, intuitiva e segura, seguindo as **10 Heurísticas de Nielsen**.

---

# 🚀 Como Rodar o Projeto

## 📋 Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- npm (geralmente instalado junto com o Node.js)

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto:

```bash
cd nome-do-projeto
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Executando o Projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Após iniciar, o terminal exibirá uma URL semelhante a:

```bash
http://localhost:5173
```

Abra essa URL no navegador para acessar o sistema.

---

# 📊 Relatório de Engenharia de Usabilidade

O desenvolvimento deste software seguiu as **Heurísticas de Nielsen**, focando em transformar requisitos técnicos em uma experiência de uso eficiente e agradável.

---

# 🧠 Aplicação das Heurísticas de Nielsen

## 🔹 Heurística #1 — Visibilidade do Status do Sistema

### ✅ Feedback em tempo real
Nos formulários de checkout, o sistema valida os campos enquanto o usuário digita, alterando automaticamente as cores das bordas:

- Verde → Campo válido
- Vermelho → Campo com erro

Isso fornece retorno imediato ao usuário sobre o status das informações preenchidas.

### ✅ Status de Login
O Header da aplicação reflete o estado global de autenticação, exibindo:

- Perfil do usuário autenticado
- Opção de login quando não autenticado

---

## 🔹 Heurística #5 — Prevenção de Erros

### ✅ Trava de autenticação
O sistema impede que o usuário avance para o pagamento sem estar logado, abrindo automaticamente o modal de autenticação para evitar quebra no fluxo de navegação.

### ✅ Validação de assentos
Para eventos do tipo **Teatro**, a compra só é liberada quando a quantidade de assentos selecionados corresponde exatamente à quantidade de ingressos escolhidos.

---

## 🔹 Heurística #6 — Reconhecimento em vez de Memorização

### ✅ Login contextual
O modal de login utiliza efeito de *backdrop blur*, permitindo que o usuário continue visualizando a página atual durante a autenticação, sem perder o contexto da compra.

---

## 🔹 Heurística #9 — Ajuda os usuários a reconhecerem, diagnosticarem e recuperarem-se de erros

Mensagens de erro específicas são exibidas abaixo dos campos inválidos, como por exemplo:

- "E-mail inválido"
- "Os e-mails não conferem"

Isso orienta o usuário de forma clara durante a correção dos dados.

---

# 🛠️ Desafios Técnicos e Soluções

Durante o desenvolvimento, foram aplicadas soluções arquiteturais para garantir robustez e organização do protótipo.

---

## 🔹 Context API para Autenticação Global

Foi implementado um `AuthProvider` utilizando a **Context API**, responsável por:

- Gerenciar o estado global de autenticação
- Controlar a abertura e fechamento do modal de login
- Evitar *prop drilling* entre componentes

---

## 🔹 Lógica Condicional de Assentos

Foi desenvolvido um sistema capaz de diferenciar automaticamente:

### 🎵 Eventos de Show
- Setores livres
- Sem marcação individual de lugares

### 🎭 Eventos de Teatro
- Assentos numerados
- Controle de ocupação
- Bloqueio de lugares já reservados

---

## 🔹 Gestão de Cache do Vite

Foram realizadas limpezas programadas do cache de *pre-bundle* do Vite para resolver instabilidades relacionadas ao:

- HMR (*Hot Module Replacement*)
- Fast Refresh
- Injeção de funções via Context API

---

## 🔹 Mock de Dados Realista

Criação de um banco de dados simulado (`mockData.ts`) contendo:

- Eventos
- Atrações
- Regras de ingressos
- Dados de usuários
- QR Codes dinâmicos

O objetivo foi aproximar o comportamento da aplicação de um ambiente real de produção.

---

# 📦 Requisitos Funcionais Implementados

- [x] Login via modal
- [x] Navegação SPA
- [x] Checkout funcional
- [x] Ingresso nominal
- [x] Histórico de ingressos
- [x] Ticket digital com QR Code
- [x] Seleção dinâmica de assentos
- [x] Controle de autenticação global

---

# 🧰 Tecnologias Utilizadas

## Frontend
- React.js
- Vite
- TypeScript

## Estilização
- Tailwind CSS

## Roteamento
- React Router DOM

## Ícones
- Lucide Icons

---

# 📁 Estrutura Geral do Projeto

```bash
src/
├── components/
├── pages/
├── contexts/
├── data/
├── routes/
├── types/
└── assets/
```

---

# 🎯 Objetivos Acadêmicos

Este projeto foi desenvolvido com foco em:

- Engenharia de Usabilidade
- Interação Humano-Computador
- Arquitetura Frontend
- Experiência do Usuário (UX)
- Interfaces Responsivas
- Validação de Fluxos
- Aplicação prática das Heurísticas de Nielsen

---

# 👨‍💻 Desenvolvido por

**Victor Franco** e **Luana Neres**
Software Engineer | IFMG - Campus Ouro Branco