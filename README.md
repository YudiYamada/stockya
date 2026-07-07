# Stockya

Stockya é uma aplicação web para gestão de estoque e vendas, com um painel de métricas, cadastro de produtos, registro de vendas e acompanhamento do desempenho do negócio.

## Visualize o Projeto Clicando [AQUI](https://stockya-sigma.vercel.app/)

## ✨ Funcionalidades

- Dashboard com indicadores de receita, vendas, produtos em estoque e produtos mais vendidos.
- Gestão de produtos com criação, edição e exclusão.
- Gestão de vendas com relacionamento direto aos produtos.
- Interface moderna, responsiva e intuitiva.

## 🛠️ Tecnologias utilizadas

- Next.js 14
- React + TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- shadcn/ui

## ▶️ Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/stockya.git
cd stockya
```

2. Instale as dependências:

```bash
npm install
```

3. Suba o banco PostgreSQL com Docker:

```bash
docker compose up -d
```

4. Crie um arquivo .env na raiz do projeto com a seguinte variável:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/app"
```

5. Execute as migrações do Prisma:

```bash
npx prisma migrate deploy
```

6. Inicie o projeto:

```bash
npm run dev
```

A aplicação ficará disponível em http://localhost:3000.

## 📁 Estrutura principal

- app/ — páginas, componentes e telas principais do sistema.
- app/\_data-access/ — consultas e acesso aos dados.
- prisma/ — schema do banco e migrations.

## 👨‍💻 Autor

- **[Yudi Yamada](https://www.linkedin.com/in/yudi-yamada-0a10181b9/)**
