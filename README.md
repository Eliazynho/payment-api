# 🚀 Desafio Backend — API de Pagamentos

API RESTful robusta e escalável para um sistema de pagamentos simplificado, desenvolvida como parte de um desafio técnico. O projeto foi construído com NestJS, Prisma e PostgreSQL, seguindo as melhores práticas de desenvolvimento de software.

**Live API Disponível em:** **[https://payment-api-0456.onrender.com](https://payment-api-0456.onrender.com)**

---

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

## 📚 Documentação da API (Swagger UI)

A documentação interativa da API, onde é possível visualizar e testar todos os endpoints, está disponível em:

**Live:** **[https://payment-api-0456.onrender.com/api-docs](https://payment-api-0456.onrender.com/api-docs)**

(Para desenvolvimento local, a documentação estará em `http://localhost:3000/api-docs` após iniciar o projeto).

## 🧪 Testando a API (Live)

Você pode testar a API ao vivo usando ferramentas como cURL, Insomnia ou Postman.

**Exemplo de criação de cliente com cURL e Idempotência:**

```bash
curl -X POST https://payment-api-0456.onrender.com/customers \
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

## ⚙️ Configuração do Ambiente Local (Opcional)

**Pré-requisitos:**

- Node.js (v18+)
- NPM ou Yarn
- PostgreSQL

<!-- end list -->

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Eliazynho/payment-api.git
    cd payment-api
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    - Copie o arquivo `.env.example` para `.env`: `cp .env.example .env`
    - Preencha a variável `DATABASE_URL` no arquivo `.env`:

    <!-- end list -->

    ```env
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/payment_challenge?schema=public"
    ```

4.  **Execute as migrações do banco de dados:**

    ```bash
    npx prisma migrate dev
    ```

## ▶️ Rodando a Aplicação Localmente

Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`.

## 🧪 Rodando os Testes Localmente

Para executar a suíte de testes unitários:

```bash
npm run test
```
