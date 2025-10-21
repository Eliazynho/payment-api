# 🚀 Desafio Backend — API de Pagamentos

API RESTful robusta e escalável para um sistema de pagamentos simplificado, desenvolvida como parte de um desafio técnico. O projeto foi construído com NestJS, Prisma e PostgreSQL, seguindo as melhores práticas de desenvolvimento de software.

## ✨ Features Principais

O projeto cumpre todos os requisitos obrigatórios e inclui diversas funcionalidades avançadas para garantir qualidade, segurança e observabilidade.

- **Gestão de Clientes:** Endpoint para criação de clientes com validação de dados e tratamento de duplicidade (`email` e `documento`).
- **Criação de Cobranças:** Endpoint para criação de cobranças associadas a clientes, suportando múltiplos métodos de pagamento (`PIX`, `Cartão de Crédito`, `Boleto`).
- **Documentação Interativa:** Documentação completa e testável da API gerada automaticamente com **Swagger (OpenAPI)**.
- **Testes Abrangentes:** Suíte de testes unitários com **Jest** para garantir a confiabilidade das regras de negócio.
- **Segurança Essencial:**
  - **Rate Limiting:** Proteção contra ataques de força bruta e abuso da API (limite de 10 reqs/min por IP).
  - **Headers de Segurança:** Uso do **Helmet** para proteger contra vulnerabilidades web comuns.
- **Observabilidade e Monitoramento:**
  - **Health Check:** Endpoint `/health` que verifica a saúde da aplicação e a conectividade com o banco de dados.
  - **Logging Estruturado:** Logs contextuais e padronizados para facilitar a depuração.
- **Boas Práticas de API:**
  - **Padronização de Erros:** Filtro de exceção global que garante respostas de erro consistentes.
  - **Controle de Idempotência:** Prevenção de criação de recursos duplicados em caso de re-tentativas de rede através do header `Idempotency-Key`.
  - **Gestão de Configuração:** Uso do `@nestjs/config` para gerenciar variáveis de ambiente de forma segura.

## 🛠️ Tecnologias Utilizadas

- **Backend:** NestJS
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Testes:** Jest
- **Documentação:** Swagger
- **Segurança:** Helmet, Throttler (Rate Limiter)

## ⚙️ Configuração do Ambiente

**Pré-requisitos:**

- Node.js (v18+)
- NPM ou Yarn
- PostgreSQL

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
    - Copie o arquivo `.env.example` para `.env`: `cp .env.example .env`
    - Preencha a variável `DATABASE_URL` no arquivo `.env`:

    ```env
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/payment_challenge?schema=public"
    ```

4.  **Execute as migrações do banco de dados:**
    ```bash
    npx prisma migrate dev
    ```

## ▶️ Rodando a Aplicação

Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`.

## 🧪 Rodando os Testes

Para executar a suíte de testes unitários:

```bash
npm run test
```

## 📚 Documentação da API

A documentação interativa da API (Swagger) está disponível em:

**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

A partir dela, é possível visualizar e testar todos os endpoints disponíveis.

**Exemplo de teste com Idempotência (usando cURL):**

```bash
curl -X POST http://localhost:3000/customers \
-H "Content-Type: application/json" \
-H "Idempotency-Key: a-unique-key-for-this-request-123" \
-d '{
  "name": "Cliente Teste",
  "email": "teste.idempotencia@example.com",
  "document": "11122233344",
  "phone": "11912345678"
}'
```

> Se você executar o mesmo comando duas vezes, a segunda requisição retornará a resposta da primeira sem criar um novo cliente.

---
