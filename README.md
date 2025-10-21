# 🧩 Desafio Backend — Sistema de Pagamentos

API RESTful para um sistema de pagamentos simplificado desenvolvido com NestJS, Prisma e PostgreSQL.

## 🚀 Requisitos

- Node.js (v18+)
- PostgreSQL

## ⚙️ Configuração

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd payment-api
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Preencha a variável `DATABASE_URL` com os dados da sua conexão PostgreSQL.

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
    ```

4.  **Execute as migrações do banco de dados:**
    Este comando criará as tabelas necessárias no seu banco.
    ```bash
    npx prisma migrate dev
    ```

## ▶️ Rodando a Aplicação

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

## 🧪 Testando a API

### Criar um Cliente

**Endpoint:** `POST /customers`

**Body:**

```json
{
  "name": "Elias Santos",
  "email": "elias.santos@example.com",
  "document": "12345678901",
  "phone": "11987654321"
}
```

**Exemplo com cURL:**

```bash
curl -X POST http://localhost:3000/customers \
-H "Content-Type: application/json" \
-d '{
  "name": "Elias Santos",
  "email": "elias.santos@example.com",
  "document": "12345678901",
  "phone": "11987654321"
}'
```

### Criar uma Cobrança (Boleto)

**Endpoint:** `POST /charges`

> **Nota:** Substitua o `customerId` pelo ID retornado na criação do cliente.

**Body:**

```json
{
  "customerId": "b9a5f3e4-5c6d-4f8a-9b3e-2c1d9f0a7b6c",
  "amount": 5000,
  "paymentMethod": "BOLETO",
  "boletoDueDate": "2025-12-31T23:59:59.000Z"
}
```

**Exemplo com cURL:**

```bash
curl -X POST http://localhost:3000/charges \
-H "Content-Type: application/json" \
-d '{
  "customerId": "SEU_CUSTOMER_ID",
  "amount": 5000,
  "paymentMethod": "BOLETO",
  "boletoDueDate": "2025-12-31T23:59:59.000Z"
}'
```
