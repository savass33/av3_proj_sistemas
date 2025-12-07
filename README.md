# 📚 Sistema de Microsserviços - Catálogo de Livros

> **Projeto Acadêmico de Alto Nível** - Sistema distribuído para gerenciamento de catálogo de livros com arquitetura de microsserviços

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-Academic-yellow.svg)](LICENSE)

---

## 📋 Visão Geral

Sistema distribuído desenvolvido com **arquitetura de microsserviços** para gerenciamento completo de um catálogo de livros, incluindo gestão de usuários, catálogo de produtos, processamento de pedidos, pagamentos e notificações. O projeto demonstra conceitos avançados de:

- ✅ **Arquitetura de Microsserviços** com comunicação REST
- ✅ **Desacoplamento de Serviços** via APIs independentes
- ✅ **Event-Driven Architecture** com notificações assíncronas
- ✅ **Containerização** com Docker e Docker Compose
- ✅ **Frontend Moderno** com React + TypeScript + Vite
- ✅ **Persistência Distribuída** com múltiplos bancos de dados
- ✅ **Service Discovery** via variáveis de ambiente
- ✅ **Health Checks** e orquestração de containers

### 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CAMADA DE APRESENTAÇÃO                            │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │              Frontend React (Vite + TypeScript)                     │  │
│  │                     Porta: 5173 (dev) / 80 (prod)                   │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP/REST
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CAMADA DE MICROSSERVIÇOS                            │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │  USUÁRIOS   │  │  CATÁLOGO   │  │   PEDIDOS   │  │  PAGAMENTO  │      │
│  │  (8081)     │◀─│  (8084)     │◀─│   (8085)    │◀─│  (8082)     │      │
│  │             │  │             │  │             │  │             │      │
│  │ Cadastro e  │  │ Gestão de   │  │ Criação e   │  │ Processa    │      │
│  │ Autenticação│  │ Livros      │  │ Gestão de   │  │ Pagamentos  │      │
│  │ de Usuários │  │             │  │ Pedidos     │  │             │      │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘      │
│         │                │                │                │              │
│         └────────────────┴────────────────┴────────────────┘              │
│                                      │                                     │
│                                      ▼                                     │
│                            ┌─────────────────┐                            │
│                            │  NOTIFICAÇÃO    │                            │
│                            │    (8083)       │                            │
│                            │                 │                            │
│                            │ Envia notifica- │                            │
│                            │ ções aos users  │                            │
│                            └────────┬────────┘                            │
└─────────────────────────────────────┼───────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CAMADA DE PERSISTÊNCIA                              │
│                                                                             │
│                     ┌───────────────────────────┐                          │
│                     │      MySQL 8.0 Server     │                          │
│                     │      Porta: 3306          │                          │
│                     └───────────┬───────────────┘                          │
│                                 │                                           │
│         ┌───────────┬───────────┼───────────┬───────────┐                 │
│         ▼           ▼           ▼           ▼           ▼                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │usuarios_ │ │ livros_  │ │livraria_ │ │pagamento_│ │notificao_│       │
│  │   db     │ │   db     │ │   db     │ │   db     │ │   db     │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘

                    Docker Network: microservices-network
```

### 🎯 Objetivos Acadêmicos

Este projeto foi desenvolvido para demonstrar competências em:

1. **Arquitetura de Software**
   - Design de sistemas distribuídos
   - Separação de responsabilidades (SRP)
   - Baixo acoplamento e alta coesão

2. **Desenvolvimento Backend**
   - Spring Boot e ecossistema Spring
   - RESTful APIs com melhores práticas
   - Persistência com JPA/Hibernate

3. **DevOps e Containerização**
   - Docker e orquestração de containers
   - Configuração de ambientes (dev/prod)
   - CI/CD ready architecture

4. **Desenvolvimento Frontend**
   - React moderno com TypeScript
   - State management e context API
   - Integração com APIs REST

---

## 🚀 Como Executar

### Pré-requisitos

- **Docker** >= 20.10.0
- **Docker Compose** >= 2.0.0
- **Node.js** >= 18.0.0 (apenas para desenvolvimento frontend)
- **Java** >= 17 (apenas para desenvolvimento local sem Docker)
- **Maven** >= 3.8.0 (apenas para desenvolvimento local sem Docker)

### 🐳 Método 1: Docker Compose (Recomendado)

Este é o método mais simples para executar todo o sistema.

```bash
# Clone o repositório
git clone https://github.com/savass33/av3_proj_sistemas.git
cd av3_proj_sistemas

# Inicie todos os serviços
docker-compose up --build

# Ou em modo detached (background)
docker-compose up -d --build

# Verifique o status dos containers
docker-compose ps

# Visualize os logs
docker-compose logs -f

# Pare todos os serviços
docker-compose down

# Pare e remova volumes (limpa dados)
docker-compose down -v
```

**Tempo estimado de inicialização:** 5-10 minutos (primeira execução)

### 🔧 Método 2: Desenvolvimento Local

Para desenvolvimento individual de cada microsserviço:

#### 1. Configure o MySQL

```sql
-- Crie os bancos de dados necessários
CREATE DATABASE usuarios_db;
CREATE DATABASE livros_db;
CREATE DATABASE livraria_db;
CREATE DATABASE pagamento_db;
CREATE DATABASE notificacao_db;

-- Configure o usuário (se necessário)
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

#### 2. Inicie os Microsserviços

```bash
# Terminal 1 - Serviço de Usuários
cd microservicos/usuarios
./mvnw spring-boot:run

# Terminal 2 - Serviço de Catálogo
cd microservicos/livros
./mvnw spring-boot:run

# Terminal 3 - Serviço de Pedidos
cd microservicos/pedidos
./mvnw spring-boot:run

# Terminal 4 - Serviço de Pagamento
cd microservicos/pagamento
./mvnw spring-boot:run

# Terminal 5 - Serviço de Notificação
cd microservicos/notificacao
./mvnw spring-boot:run
```

#### 3. Inicie o Frontend (Opcional)

```bash
# Terminal 6 - Frontend React
cd frontend
npm install
npm run dev

# Acesse: http://localhost:5173
```

### 📦 Build Scripts Auxiliares

O projeto inclui scripts para facilitar o build:

**Windows:**
```powershell
.\build-all.ps1
```

**Linux/Mac:**
```bash
chmod +x build-all.sh
./build-all.sh
```

---

## 📡 API Documentation

### 1️⃣ Serviço de Usuários (Porta 8081)

Responsável pelo gerenciamento de usuários do sistema.

**Base URL:** `http://localhost:8081`

#### Endpoints

| Método | Endpoint | Descrição | Body | Response |
|--------|----------|-----------|------|----------|
| POST | `/user` | Criar novo usuário | `{"nome": "string", "email": "string", "telefone": "string"}` | `201 Created` |
| GET | `/user` | Listar todos os usuários | - | `200 OK` |
| GET | `/user/{id}` | Buscar usuário por ID | - | `200 OK` / `404 Not Found` |

#### Exemplo de Requisição

**Criar Usuário:**
```bash
curl -X POST http://localhost:8081/user \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Paulo Silva",
    "email": "paulo@email.com",
    "telefone": "85999999999"
  }'
```

**Response:**
```json
{
  "id": 1,
  "nome": "Paulo Silva",
  "email": "paulo@email.com",
  "telefone": "85999999999"
}
```

---

### 2️⃣ Serviço de Catálogo de Livros (Porta 8084)

Gerencia o catálogo de livros e processa compras.

**Base URL:** `http://localhost:8084`

#### Endpoints - Livros

| Método | Endpoint | Descrição | Body | Response |
|--------|----------|-----------|------|----------|
| POST | `/livros` | Adicionar livro ao catálogo | `{"titulo": "string", "autor": "string", "categoria": "string", "preco": number}` | `201 Created` |
| GET | `/livros` | Listar todos os livros | - | `200 OK` |
| GET | `/livros/{id}` | Buscar livro por ID | - | `200 OK` / `404 Not Found` |
| DELETE | `/livros/{id}` | Remover livro do catálogo | - | `204 No Content` |
| GET | `/livros/buscar?titulo={titulo}` | Buscar livros por título | - | `200 OK` |
| GET | `/livros/categoria/{categoria}` | Buscar livros por categoria | - | `200 OK` |

#### Endpoints - Compras

| Método | Endpoint | Descrição | Body | Response |
|--------|----------|-----------|------|----------|
| POST | `/compras` | Realizar compra de livro | `{"usuarioId": number, "livroId": number, "valor": number, "meioPagamento": "string"}` | `201 Created` |

#### Meios de Pagamento Aceitos

- `CARTAO` - Cartão de Crédito/Débito
- `BOLETO` - Boleto Bancário
- `PIX` - Pagamento via PIX

#### Exemplo de Requisição

**Adicionar Livro:**
```bash
curl -X POST http://localhost:8084/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "categoria": "Engenharia de Software",
    "preco": 89.90
  }'
```

**Realizar Compra:**
```bash
curl -X POST http://localhost:8084/compras \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId": 1,
    "livroId": 1,
    "valor": 89.90,
    "meioPagamento": "PIX"
  }'
```

**Response:**
```json
{
  "id": 1,
  "usuarioId": 1,
  "livroId": 1,
  "valor": 89.90,
  "meioPagamento": "PIX",
  "status": "PROCESSADO",
  "dataCompra": "2025-12-07T18:30:00"
}
```

---

### 3️⃣ Serviço de Pedidos (Porta 8085)

Gerencia os pedidos de livros realizados pelos usuários.

**Base URL:** `http://localhost:8085`

#### Endpoints

| Método | Endpoint | Descrição | Body | Response |
|--------|----------|-----------|------|----------|
| POST | `/pedidos/{usuarioId}/{livroId}` | Criar novo pedido | - | `201 Created` |
| GET | `/pedidos` | Listar todos os pedidos | - | `200 OK` |
| GET | `/pedidos/{id}` | Buscar pedido por ID | - | `200 OK` / `404 Not Found` |
| PUT | `/pedidos/{id}/status` | Atualizar status do pedido | Query param: `status=CONFIRMADO` | `200 OK` |

#### Status de Pedido

- `PENDENTE` - Pedido criado, aguardando processamento
- `CONFIRMADO` - Pedido confirmado
- `PROCESSANDO` - Pedido em processamento
- `CONCLUIDO` - Pedido concluído
- `CANCELADO` - Pedido cancelado

#### Exemplo de Requisição

**Criar Pedido:**
```bash
curl -X POST http://localhost:8085/pedidos/1/1
```

**Atualizar Status:**
```bash
curl -X PUT "http://localhost:8085/pedidos/1/status?status=CONFIRMADO"
```

**Response:**
```json
{
  "id": 1,
  "usuarioId": 1,
  "livroId": 1,
  "preco": 89.90,
  "status": "CONFIRMADO",
  "dataCriacao": "2025-12-07T18:30:00"
}
```

---

### 4️⃣ Serviço de Pagamento (Porta 8082)

Processa os pagamentos e integra com o serviço de notificação.

**Base URL:** `http://localhost:8082`

#### Endpoints

| Método | Endpoint | Descrição | Body | Response |
|--------|----------|-----------|------|----------|
| POST | `/pagamentos` | Processar pagamento | `{"usuarioId": number, "livroId": number, "valor": number, "meioPagamento": "string"}` | `201 Created` |
| GET | `/pagamentos` | Listar todos os pagamentos | - | `200 OK` |
| GET | `/pagamentos/{id}` | Buscar pagamento por ID | - | `200 OK` / `404 Not Found` |
| DELETE | `/pagamentos/{id}` | Cancelar pagamento | - | `204 No Content` |

#### Exemplo de Requisição

```bash
curl -X POST http://localhost:8082/pagamentos \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId": 1,
    "livroId": 1,
    "valor": 89.90,
    "meioPagamento": "CARTAO"
  }'
```

**Response:**
```json
{
  "id": 1,
  "usuarioId": 1,
  "livroId": 1,
  "valor": 89.90,
  "meioPagamento": "CARTAO",
  "status": "APROVADO",
  "data": "2025-12-07T18:30:00"
}
```

**⚠️ Nota:** Este serviço é chamado automaticamente pelo endpoint `/compras` do Catálogo. Após processar o pagamento, aciona automaticamente o serviço de Notificação.

---

### 5️⃣ Serviço de Notificação (Porta 8083)

Gerencia notificações enviadas aos usuários.

**Base URL:** `http://localhost:8083`

#### Endpoints

| Método | Endpoint | Descrição | Body | Response |
|--------|----------|-----------|------|----------|
| POST | `/notificacoes` | Criar notificação | `{"usuarioId": number, "tipo": "string", "titulo": "string", "mensagem": "string", "dados": "string"}` | `201 Created` |
| GET | `/notificacoes` | Listar todas as notificações | - | `200 OK` |
| GET | `/notificacoes/{id}` | Buscar notificação por ID | - | `200 OK` / `404 Not Found` |
| GET | `/notificacoes/usuario/{usuarioId}` | Listar notificações de um usuário | - | `200 OK` |
| POST | `/notificacoes/reprocessar-pendentes` | Reprocessar notificações com falha | - | `200 OK` |

#### Tipos de Notificação

- `PAGAMENTO` - Notificações relacionadas a pagamentos
- `PEDIDO` - Notificações relacionadas a pedidos
- `SISTEMA` - Notificações do sistema

#### Status de Notificação

- `PENDENTE` - Aguardando envio
- `ENVIADA` - Notificação enviada com sucesso
- `FALHA` - Falha no envio

#### Exemplo de Requisição

```bash
curl -X GET http://localhost:8083/notificacoes/usuario/1
```

**Response:**
```json
[
  {
    "id": 1,
    "usuarioId": 1,
    "tipo": "PAGAMENTO",
    "titulo": "Pagamento Confirmado",
    "mensagem": "Seu pagamento de R$ 89.90 foi confirmado!",
    "dados": "{\"livroId\": 1, \"valor\": 89.90}",
    "status": "ENVIADA",
    "tentativas": 1,
    "dataCriacao": "2025-12-07T18:30:00"
  }
]
```

**⚠️ Nota:** Este serviço é acionado automaticamente pelo serviço de Pagamento após confirmar um pagamento com sucesso.

---

## 🔄 Fluxos de Negócio

### Fluxo 1: Compra Completa (End-to-End)

Este é o fluxo principal do sistema, envolvendo todos os microsserviços.

```
┌──────────┐
│ Cliente  │
└─────┬────┘
      │
      │ 1. POST /user (criar usuário se não existir)
      ▼
┌─────────────────┐
│ Serviço         │
│ Usuários (8081) │
└────────┬────────┘
         │ ✓ Usuário criado (ID: 1)
         │
         │ 2. GET /livros (listar catálogo)
         ▼
┌─────────────────┐
│ Serviço         │
│ Catálogo (8084) │
└────────┬────────┘
         │ ✓ Lista de livros disponíveis
         │
         │ 3. POST /compras (realizar compra)
         ▼
┌─────────────────┐
│ Serviço         │──────────┐
│ Catálogo (8084) │          │ 3a. Valida livro existe
└────────┬────────┘          │
         │                   │
         │ 3b. POST /pagamentos (processar)
         ▼
┌─────────────────┐
│ Serviço         │
│ Pagamento (8082)│
└────────┬────────┘
         │ ✓ Pagamento aprovado
         │
         │ 3c. POST /notificacoes (enviar)
         ▼
┌─────────────────┐
│ Serviço         │──────────┐
│ Notificação     │          │ 3d. GET /user/{id} (validar)
│ (8083)          │◀─────────┘
└────────┬────────┘
         │ ✓ Notificação enviada
         │
         │ 4. GET /notificacoes/usuario/{id}
         ▼
┌──────────┐
│ Cliente  │
└──────────┘
```

#### Passo a Passo Detalhado

1. **Criar Usuário** (se necessário)
   ```bash
   curl -X POST http://localhost:8081/user \
     -H "Content-Type: application/json" \
     -d '{"nome": "João Silva", "email": "joao@email.com", "telefone": "85988888888"}'
   ```

2. **Listar Livros Disponíveis**
   ```bash
   curl http://localhost:8084/livros
   ```

3. **Realizar Compra** (aciona pagamento e notificação automaticamente)
   ```bash
   curl -X POST http://localhost:8084/compras \
     -H "Content-Type: application/json" \
     -d '{
       "usuarioId": 1,
       "livroId": 1,
       "valor": 89.90,
       "meioPagamento": "PIX"
     }'
   ```

4. **Consultar Notificações Recebidas**
   ```bash
   curl http://localhost:8083/notificacoes/usuario/1
   ```

**✅ Resultado Esperado:** 
- Compra processada com sucesso
- Pagamento aprovado
- Notificação enviada ao usuário

---

### Fluxo 2: Gestão de Pedidos

Fluxo alternativo usando o microsserviço de Pedidos.

```
┌──────────┐
│ Cliente  │
└─────┬────┘
      │
      │ 1. POST /pedidos/{usuarioId}/{livroId}
      ▼
┌─────────────────┐
│ Serviço         │──────────┐
│ Pedidos (8085)  │          │ 1a. GET /user/{id}
└────────┬────────┘          │     (validar usuário)
         │                   │
         │◀──────────────────┘
         │                   
         │──────────┐        
         │          │ 1b. GET /livros/{id}
         │          │     (validar livro e obter preço)
         │◀─────────┘
         │
         │ ✓ Pedido criado (Status: PENDENTE)
         │
         │ 2. PUT /pedidos/{id}/status?status=CONFIRMADO
         ▼
┌─────────────────┐
│ Serviço         │
│ Pedidos (8085)  │
└────────┬────────┘
         │ ✓ Status atualizado
         ▼
┌──────────┐
│ Cliente  │
└──────────┘
```

#### Passo a Passo

1. **Criar Pedido**
   ```bash
   curl -X POST http://localhost:8085/pedidos/1/1
   ```

2. **Listar Todos os Pedidos**
   ```bash
   curl http://localhost:8085/pedidos
   ```

3. **Consultar Pedido Específico**
   ```bash
   curl http://localhost:8085/pedidos/1
   ```

4. **Atualizar Status do Pedido**
   ```bash
   curl -X PUT "http://localhost:8085/pedidos/1/status?status=CONFIRMADO"
   ```

---

### Fluxo 3: Recuperação de Notificações Pendentes

Sistema de retry para notificações que falharam.

```
┌──────────────────┐
│ Admin/Sistema    │
└────────┬─────────┘
         │
         │ 1. POST /notificacoes/reprocessar-pendentes
         ▼
┌─────────────────┐
│ Serviço         │
│ Notificação     │
│ (8083)          │
└────────┬────────┘
         │
         │ ├─ Busca notificações com status FALHA
         │ ├─ Tenta reenviar cada notificação
         │ ├─ Atualiza status para ENVIADA ou incrementa tentativas
         │ └─ Retorna relatório de reprocessamento
         │
         ▼
┌──────────────────┐
│ Admin/Sistema    │
└──────────────────┘
```

---

## 🗄️ Modelo de Dados

### Database: usuarios_db

```sql
CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(50),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);
```

**Descrição:** Armazena informações dos usuários do sistema.

---

### Database: livros_db

```sql
CREATE TABLE livros (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    preco DOUBLE NOT NULL,
    estoque INT DEFAULT 0,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria),
    INDEX idx_titulo (titulo)
);
```

**Descrição:** Catálogo de livros disponíveis para venda.

---

### Database: livraria_db

```sql
CREATE TABLE pedido (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    livro_id BIGINT NOT NULL,
    preco DOUBLE NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDENTE',
    data_criacao DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    INDEX idx_usuario (usuario_id),
    INDEX idx_status (status),
    INDEX idx_data (data_criacao)
);
```

**Descrição:** Gerencia os pedidos realizados pelos usuários.

**Status Possíveis:**
- `PENDENTE` - Aguardando confirmação
- `CONFIRMADO` - Pedido confirmado
- `PROCESSANDO` - Em processamento
- `CONCLUIDO` - Finalizado
- `CANCELADO` - Cancelado

---

### Database: pagamento_db

```sql
CREATE TABLE pagamento (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    livro_id BIGINT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    meio_pagamento VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_usuario (usuario_id),
    INDEX idx_status (status),
    INDEX idx_data (data)
);
```

**Descrição:** Registra todas as transações de pagamento.

**Meios de Pagamento:**
- `CARTAO` - Cartão de Crédito/Débito
- `PIX` - Pagamento instantâneo
- `BOLETO` - Boleto bancário

**Status Possíveis:**
- `PENDENTE` - Aguardando processamento
- `APROVADO` - Pagamento aprovado
- `RECUSADO` - Pagamento recusado
- `CANCELADO` - Pagamento cancelado

---

### Database: notificacao_db

```sql
CREATE TABLE notificacoes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensagem VARCHAR(1000) NOT NULL,
    dados VARCHAR(2000),
    status VARCHAR(50) DEFAULT 'PENDENTE',
    tentativas INT DEFAULT 0,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_envio DATETIME,
    INDEX idx_usuario (usuario_id),
    INDEX idx_status (status),
    INDEX idx_tipo (tipo),
    INDEX idx_data (data_criacao)
);
```

**Descrição:** Gerencia notificações enviadas aos usuários.

**Tipos:**
- `PAGAMENTO` - Notificações de pagamento
- `PEDIDO` - Notificações de pedido
- `SISTEMA` - Notificações do sistema

**Status:**
- `PENDENTE` - Aguardando envio
- `ENVIADA` - Enviada com sucesso
- `FALHA` - Falha no envio

---

### Diagrama de Relacionamentos

```
┌──────────────┐
│  usuarios    │
│  (usuarios_  │
│     db)      │
└───────┬──────┘
        │
        │ (usuarioId)
        │
        ├────────────────────────────────────┐
        │                                    │
        ▼                                    ▼
┌──────────────┐                    ┌──────────────┐
│   pedido     │                    │  pagamento   │
│ (livraria_   │                    │ (pagamento_  │
│     db)      │                    │     db)      │
└───────┬──────┘                    └───────┬──────┘
        │                                   │
        │ (livroId)                         │
        │                                   │
        ▼                                   │
┌──────────────┐                            │
│   livros     │                            │
│  (livros_    │◄───────────────────────────┘
│     db)      │        (livroId)
└──────────────┘

        │ (usuarioId)
        │
        ▼
┌──────────────┐
│notificacoes  │
│(notificacao_ │
│     db)      │
└──────────────┘
```

**Nota:** Os relacionamentos entre tabelas são mantidos a nível de aplicação (via IDs), não há chaves estrangeiras no banco de dados devido à arquitetura de microsserviços.

---

## 🛠️ Stack Tecnológica

### Backend - Microsserviços

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Java** | 17 LTS | Linguagem de programação |
| **Spring Boot** | 3.2.0 / 3.5.7 / 4.0.0 | Framework para microsserviços |
| **Spring Data JPA** | - | ORM e persistência |
| **Hibernate** | 6.3.1+ | Provider JPA |
| **Spring Web** | - | REST APIs |
| **Spring Cloud OpenFeign** | 2023.0.0 | Comunicação entre serviços |
| **MySQL Connector/J** | 8.0+ | Driver JDBC |
| **Maven** | 3.8+ | Gerenciador de dependências |

### Frontend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | 18+ | Library UI |
| **TypeScript** | 5+ | Type safety |
| **Vite** | 5+ | Build tool e dev server |
| **Axios** | 1.6+ | Cliente HTTP |
| **TailwindCSS** | 3+ | Framework CSS |
| **React Router** | 6+ | Roteamento |

### Infraestrutura

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Docker** | 20.10+ | Containerização |
| **Docker Compose** | 2.0+ | Orquestração de containers |
| **MySQL** | 8.0 | Banco de dados relacional |
| **Git** | 2.x | Controle de versão |
| **GitHub** | - | Repositório remoto |

### DevOps e Deployment

| Tecnologia | Uso |
|------------|-----|
| **Render** | Platform as a Service (PaaS) para deployment |
| **Docker Hub** | Registro de imagens Docker |
| **GitHub Actions** | CI/CD (potencial) |

---

## 📝 Variáveis de Ambiente

### Configurações Comuns

Todas as aplicações Spring Boot suportam as seguintes variáveis:

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `DB_HOST` | `localhost` | Hostname do servidor MySQL |
| `DB_USER` | `root` | Usuário do banco de dados |
| `DB_PASSWORD` | `root` | Senha do banco de dados |
| `SERVER_PORT` | Varia por serviço | Porta HTTP do serviço |

### Serviço de Usuários (8081)

```properties
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:3306/usuarios_db
server.port=8081
```

### Serviço de Catálogo (8084)

```properties
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:3306/livros_db
server.port=8084
pagamento.service.url=http://${PAGAMENTO_HOST:localhost}:8082
```

### Serviço de Pedidos (8085)

```properties
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:3306/livraria_db
server.port=8085
usuarios.service.url=http://${USUARIOS_HOST:localhost}:8081
livros.service.url=http://${CATALOGO_HOST:localhost}:8084
```

### Serviço de Pagamento (8082)

```properties
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:3306/pagamento_db
server.port=8082
notificacao.service.url=http://${NOTIFICACAO_HOST:localhost}:8083
```

### Serviço de Notificação (8083)

```properties
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:3306/notificacao_db
server.port=8083
usuarios.service.url=http://${USUARIOS_HOST:localhost}:8081
```

### Docker Compose

No ambiente Docker, as variáveis são configuradas automaticamente:

```yaml
environment:
  DB_HOST: db
  DB_USER: root
  DB_PASSWORD: root
  USUARIOS_HOST: usuarios
  CATALOGO_HOST: catalogo
  PAGAMENTO_HOST: pagamento
  NOTIFICACAO_HOST: notification
```

### Frontend

```typescript
// Detecção automática de ambiente
const API_BASE = import.meta.env.MODE === 'development' 
  ? 'http://localhost' 
  : 'https://production-url.com';
```

---

## 🧪 Testes e Validação

### Teste Manual Completo

Um script completo para testar todos os fluxos do sistema:

```bash
#!/bin/bash

echo "=== TESTE COMPLETO DO SISTEMA ==="
echo ""

# 1. Criar Usuário
echo "1️⃣ Criando usuário..."
USER_RESPONSE=$(curl -s -X POST http://localhost:8081/user \
  -H "Content-Type: application/json" \
  -d '{"nome": "Paulo Silva", "email": "paulo@email.com", "telefone": "85999999999"}')
echo "✓ Usuário criado: $USER_RESPONSE"
echo ""

# 2. Criar Livros
echo "2️⃣ Adicionando livros ao catálogo..."
BOOK1=$(curl -s -X POST http://localhost:8084/livros \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Clean Code", "autor": "Robert C. Martin", "categoria": "Engenharia de Software", "preco": 89.90}')
echo "✓ Livro 1: $BOOK1"

BOOK2=$(curl -s -X POST http://localhost:8084/livros \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Domain-Driven Design", "autor": "Eric Evans", "categoria": "Arquitetura de Software", "preco": 120.00}')
echo "✓ Livro 2: $BOOK2"
echo ""

# 3. Listar Livros
echo "3️⃣ Listando catálogo..."
CATALOG=$(curl -s http://localhost:8084/livros)
echo "✓ Catálogo: $CATALOG"
echo ""

# 4. Realizar Compra (aciona pagamento e notificação)
echo "4️⃣ Realizando compra..."
COMPRA=$(curl -s -X POST http://localhost:8084/compras \
  -H "Content-Type: application/json" \
  -d '{"usuarioId": 1, "livroId": 1, "valor": 89.90, "meioPagamento": "PIX"}')
echo "✓ Compra: $COMPRA"
echo ""

# 5. Verificar Notificações
echo "5️⃣ Verificando notificações..."
sleep 2
NOTIFICATIONS=$(curl -s http://localhost:8083/notificacoes/usuario/1)
echo "✓ Notificações: $NOTIFICATIONS"
echo ""

# 6. Criar Pedido
echo "6️⃣ Criando pedido..."
PEDIDO=$(curl -s -X POST http://localhost:8085/pedidos/1/2)
echo "✓ Pedido criado: $PEDIDO"
echo ""

# 7. Atualizar Status do Pedido
echo "7️⃣ Atualizando status do pedido..."
PEDIDO_UPDATE=$(curl -s -X PUT "http://localhost:8085/pedidos/1/status?status=CONFIRMADO")
echo "✓ Pedido atualizado: $PEDIDO_UPDATE"
echo ""

# 8. Listar Todos os Pedidos
echo "8️⃣ Listando todos os pedidos..."
ALL_PEDIDOS=$(curl -s http://localhost:8085/pedidos)
echo "✓ Pedidos: $ALL_PEDIDOS"
echo ""

# 9. Listar Todos os Pagamentos
echo "9️⃣ Listando todos os pagamentos..."
ALL_PAYMENTS=$(curl -s http://localhost:8082/pagamentos)
echo "✓ Pagamentos: $ALL_PAYMENTS"
echo ""

echo "=== TESTES CONCLUÍDOS COM SUCESSO! ==="
```

### PowerShell Version (Windows)

```powershell
Write-Host "=== TESTE COMPLETO DO SISTEMA ===" -ForegroundColor Green
Write-Host ""

# 1. Criar Usuário
Write-Host "1️⃣ Criando usuário..." -ForegroundColor Cyan
$userBody = @{
    nome = "Paulo Silva"
    email = "paulo@email.com"
    telefone = "85999999999"
} | ConvertTo-Json

$user = Invoke-RestMethod -Uri "http://localhost:8081/user" -Method Post -Body $userBody -ContentType "application/json"
Write-Host "✓ Usuário criado: ID=$($user.id)" -ForegroundColor Green
Write-Host ""

# 2. Criar Livros
Write-Host "2️⃣ Adicionando livros..." -ForegroundColor Cyan
$book1Body = @{
    titulo = "Clean Code"
    autor = "Robert C. Martin"
    categoria = "Engenharia de Software"
    preco = 89.90
} | ConvertTo-Json

$book1 = Invoke-RestMethod -Uri "http://localhost:8084/livros" -Method Post -Body $book1Body -ContentType "application/json"
Write-Host "✓ Livro 1 criado: ID=$($book1.id)" -ForegroundColor Green

# 3. Realizar Compra
Write-Host "3️⃣ Realizando compra..." -ForegroundColor Cyan
$compraBody = @{
    usuarioId = 1
    livroId = 1
    valor = 89.90
    meioPagamento = "PIX"
} | ConvertTo-Json

$compra = Invoke-RestMethod -Uri "http://localhost:8084/compras" -Method Post -Body $compraBody -ContentType "application/json"
Write-Host "✓ Compra realizada!" -ForegroundColor Green

# 4. Verificar Notificações
Write-Host "4️⃣ Verificando notificações..." -ForegroundColor Cyan
Start-Sleep -Seconds 2
$notifications = Invoke-RestMethod -Uri "http://localhost:8083/notificacoes/usuario/1"
Write-Host "✓ Total de notificações: $($notifications.Count)" -ForegroundColor Green

Write-Host ""
Write-Host "=== TESTES CONCLUÍDOS! ===" -ForegroundColor Green
```

### Testes Automatizados (Sugestões)

Embora este projeto acadêmico não inclua testes automatizados completos, aqui estão sugestões para implementação:

#### JUnit 5 + MockMVC

```java
@SpringBootTest
@AutoConfigureMockMvc
class UsuarioControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void deveCriarUsuarioComSucesso() throws Exception {
        String usuarioJson = """
            {
                "nome": "Teste",
                "email": "teste@email.com",
                "telefone": "85999999999"
            }
            """;
        
        mockMvc.perform(post("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(usuarioJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.nome").value("Teste"));
    }
}
```

#### Testes de Integração com Testcontainers

```java
@SpringBootTest
@Testcontainers
class IntegrationTest {
    
    @Container
    static MySQLContainer<?> mysql = new MySQLContainer<>("mysql:8.0");
    
    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mysql::getJdbcUrl);
        registry.add("spring.datasource.username", mysql::getUsername);
        registry.add("spring.datasource.password", mysql::getPassword);
    }
}
```

### Verificação de Saúde dos Serviços

```bash
# Verificar se todos os containers estão rodando
docker-compose ps

# Verificar logs de um serviço específico
docker-compose logs -f usuarios

# Verificar conectividade dos serviços
curl -I http://localhost:8081/user
curl -I http://localhost:8084/livros
curl -I http://localhost:8085/pedidos
curl -I http://localhost:8082/pagamentos
curl -I http://localhost:8083/notificacoes
```

### Métricas e Monitoramento (Sugestões)

Para ambientes de produção, considere adicionar:

- **Spring Boot Actuator** - Health checks e métricas
- **Prometheus** - Coleta de métricas
- **Grafana** - Visualização de métricas
- **ELK Stack** - Centralização de logs
- **Zipkin/Jaeger** - Distributed tracing

---

## 🐛 Troubleshooting

### Problemas Comuns e Soluções

#### 1. Containers não iniciam

**Sintoma:** `docker-compose up` falha ou containers ficam reiniciando

**Soluções:**
```bash
# Limpar containers e volumes anteriores
docker-compose down -v

# Remover imagens antigas
docker-compose down --rmi all

# Rebuild completo
docker-compose build --no-cache
docker-compose up -d
```

#### 2. Erro de conexão com MySQL

**Sintoma:** `Communications link failure` ou `Connection refused`

**Soluções:**
```bash
# Verificar se o MySQL está rodando
docker-compose ps db

# Verificar logs do MySQL
docker-compose logs db

# Recriar o container do MySQL
docker-compose rm -f db
docker-compose up -d db

# Aguardar o MySQL ficar healthy
docker-compose ps
```

**Configuração do MySQL:**
```bash
# Acessar o MySQL e criar databases manualmente se necessário
docker exec -it mysql-db mysql -uroot -proot

CREATE DATABASE IF NOT EXISTS usuarios_db;
CREATE DATABASE IF NOT EXISTS livros_db;
CREATE DATABASE IF NOT EXISTS livraria_db;
CREATE DATABASE IF NOT EXISTS pagamento_db;
CREATE DATABASE IF NOT EXISTS notificacao_db;
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Porta já em uso

**Sintoma:** `Bind for 0.0.0.0:8081 failed: port is already allocated`

**Soluções:**

**Windows:**
```powershell
# Identificar processo usando a porta
netstat -ano | findstr :8081

# Matar processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Identificar processo
lsof -i :8081

# Matar processo
kill -9 <PID>
```

#### 4. Serviços não se comunicam

**Sintoma:** `Connection refused` entre microsserviços

**Verificações:**

```bash
# Verificar se todos estão na mesma rede Docker
docker network inspect av3_proj_sistemas_microservices-network

# Testar conectividade entre containers
docker exec usuarios-service ping -c 3 catalogo-service
docker exec pedidos-service curl http://usuarios:8081/user

# Verificar variáveis de ambiente
docker exec pedidos-service env | grep HOST
```

**Correção de hosts:**
- No Docker: use nomes dos serviços (`usuarios`, `catalogo`, `db`)
- Localmente: use `localhost`

#### 5. Frontend não conecta ao backend

**Sintoma:** CORS errors ou `Network Error`

**Soluções:**

1. Verificar se os serviços backend estão rodando:
```bash
curl http://localhost:8081/user
curl http://localhost:8084/livros
curl http://localhost:8085/pedidos
```

2. Verificar configuração do frontend:
```typescript
// frontend/src/services/api.ts
const API_BASE = import.meta.env.MODE === 'development' 
  ? 'http://localhost'  // ✓ Desenvolvimento local
  : 'https://your-production-url.com';  // ✗ Produção
```

3. Verificar @CrossOrigin nos controllers:
```java
@CrossOrigin(origins = "*")  // Permitir todas origens (dev)
```

#### 6. Maven build falha

**Sintoma:** Erro durante `./mvnw clean package`

**Soluções:**

```bash
# Limpar cache do Maven
./mvnw clean
rm -rf ~/.m2/repository/*

# Forçar download de dependências
./mvnw dependency:purge-local-repository
./mvnw clean install

# Verificar versão do Java
java -version  # Deve ser 17+
```

#### 7. Erro "Table doesn't exist"

**Sintoma:** `Table 'database.table' doesn't exist`

**Solução:**

Hibernate deve criar tabelas automaticamente. Verificar:

```properties
# application.properties
spring.jpa.hibernate.ddl-auto=update  # ✓ Correto
# spring.jpa.hibernate.ddl-auto=none  # ✗ Não cria tabelas
```

Se persistir, criar manualmente:
```bash
docker exec mysql-db mysql -uroot -proot -e "USE usuarios_db; SHOW TABLES;"
```

#### 8. Out of Memory Error

**Sintoma:** `java.lang.OutOfMemoryError: Java heap space`

**Solução:**

Aumentar memória do container no `docker-compose.yml`:

```yaml
services:
  usuarios:
    environment:
      JAVA_OPTS: "-Xmx512m -Xms256m"
    deploy:
      resources:
        limits:
          memory: 1G
```

#### 9. Logs não aparecem

**Sintoma:** Logs não são exibidos no console

**Soluções:**

```bash
# Ver logs de todos os serviços
docker-compose logs

# Seguir logs em tempo real
docker-compose logs -f

# Logs de um serviço específico
docker-compose logs -f usuarios

# Últimas 100 linhas
docker-compose logs --tail=100 usuarios
```

#### 10. Erro 500 nas requisições

**Sintoma:** Internal Server Error nas chamadas da API

**Debug:**

```bash
# Ver logs detalhados do serviço
docker-compose logs --tail=50 <service-name>

# Acessar container e verificar
docker exec -it <container-name> bash
cat /app/logs/application.log
```

**Verificar:**
- Validação de dados no body da requisição
- Enum values (ex: `CARTAO`, não `Cartão de Crédito`)
- IDs existem no banco de dados
- Serviços dependentes estão rodando

### Comandos Úteis de Debug

```bash
# Status de todos os containers
docker-compose ps

# Uso de recursos
docker stats

# Inspecionar container
docker inspect <container-name>

# Acessar shell do container
docker exec -it <container-name> /bin/bash

# Ver variáveis de ambiente
docker exec <container-name> env

# Testar conectividade de rede
docker exec <container-name> ping <outro-service>

# Reiniciar apenas um serviço
docker-compose restart <service-name>

# Recriar apenas um serviço
docker-compose up -d --force-recreate <service-name>
```

### Validação de Saúde do Sistema

Checklist para verificar se tudo está funcionando:

```bash
# ✓ MySQL rodando e healthy
docker-compose ps db | grep "healthy"

# ✓ Todos os serviços rodando
docker-compose ps | grep "Up"

# ✓ Portas acessíveis
curl -I http://localhost:8081/user
curl -I http://localhost:8084/livros
curl -I http://localhost:8085/pedidos
curl -I http://localhost:8082/pagamentos
curl -I http://localhost:8083/notificacoes

# ✓ Databases criados
docker exec mysql-db mysql -uroot -proot -e "SHOW DATABASES;"

# ✓ Comunicação entre serviços
docker exec pedidos-service curl -s http://usuarios:8081/user
```

---

## 📁 Estrutura do Projeto

```
av3_proj_sistemas/
│
├── 📄 docker-compose.yml          # Orquestração de todos os serviços
├── 📄 init.sql                    # Script de inicialização do MySQL
├── 📄 seed-data.sql               # Dados iniciais para teste
├── 📄 README.md                   # Documentação principal
├── 📄 DEPLOYMENT.md               # Guia de deployment
├── 📄 TESTES.md                   # Documentação de testes
├── 📄 render.yaml                 # Configuração para Render.com
├── 📜 build-all.ps1               # Script de build (Windows)
├── 📜 build-all.sh                # Script de build (Linux/Mac)
│
├── 🎨 frontend/                   # Aplicação React
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   ├── 📄 tsconfig.json
│   ├── 📄 tailwind.config.js
│   ├── 📄 Dockerfile
│   ├── 📂 src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── 📂 components/
│   │   │   └── Layout.tsx
│   │   ├── 📂 context/
│   │   │   └── UserContext.tsx
│   │   ├── 📂 pages/
│   │   │   ├── Catalog.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   ├── NotificationsPage.tsx
│   │   │   └── UsersPage.tsx
│   │   ├── 📂 services/
│   │   │   └── api.ts
│   │   └── 📂 types/
│   │       └── index.ts
│   └── 📂 public/
│
└── 🔧 microservicos/              # Microsserviços Backend
    │
    ├── 📦 usuarios/               # Serviço de Usuários (8081)
    │   ├── 📄 pom.xml
    │   ├── 📄 Dockerfile
    │   ├── 📜 mvnw / mvnw.cmd
    │   └── 📂 src/
    │       ├── 📂 main/
    │       │   ├── 📂 java/com/catalogo/usuarios/
    │       │   │   ├── UsuarioApplication.java
    │       │   │   ├── 📂 controller/
    │       │   │   │   └── UsuarioController.java
    │       │   │   ├── 📂 model/
    │       │   │   │   └── Usuario.java
    │       │   │   ├── 📂 repository/
    │       │   │   │   └── UsuarioRepository.java
    │       │   │   └── 📂 service/
    │       │   │       └── UsuarioService.java
    │       │   └── 📂 resources/
    │       │       └── application.properties
    │       └── 📂 test/
    │
    ├── 📦 livros/                 # Serviço de Catálogo (8084)
    │   ├── 📄 pom.xml
    │   ├── 📄 Dockerfile
    │   ├── 📜 mvnw / mvnw.cmd
    │   └── 📂 src/
    │       ├── 📂 main/
    │       │   ├── 📂 java/com/catalogo/livros/
    │       │   │   ├── LivrosApplication.java
    │       │   │   ├── 📂 controller/
    │       │   │   │   ├── LivroController.java
    │       │   │   │   └── CompraController.java
    │       │   │   ├── 📂 model/
    │       │   │   │   ├── Livro.java
    │       │   │   │   └── Compra.java
    │       │   │   ├── 📂 repository/
    │       │   │   │   └── LivroRepository.java
    │       │   │   ├── 📂 service/
    │       │   │   │   ├── LivroService.java
    │       │   │   │   └── CompraService.java
    │       │   │   └── 📂 client/
    │       │   │       └── PagamentoClient.java
    │       │   └── 📂 resources/
    │       │       └── application.properties
    │       └── 📂 test/
    │
    ├── 📦 pedidos/                # Serviço de Pedidos (8085)
    │   ├── 📄 pom.xml
    │   ├── 📄 Dockerfile
    │   ├── 📜 mvnw / mvnw.cmd
    │   └── 📂 src/
    │       ├── 📂 main/
    │       │   ├── 📂 java/com/catalogo_livros/pedidos/
    │       │   │   ├── PedidoApplication.java
    │       │   │   ├── 📂 controller/
    │       │   │   │   └── PedidoController.java
    │       │   │   ├── 📂 model/
    │       │   │   │   └── Pedido.java
    │       │   │   ├── 📂 repository/
    │       │   │   │   └── PedidoRepository.java
    │       │   │   ├── 📂 service/
    │       │   │   │   └── PedidoService.java
    │       │   │   └── 📂 client/
    │       │   │       ├── UsuarioClient.java
    │       │   │       └── LivroClient.java
    │       │   └── 📂 resources/
    │       │       └── application.properties
    │       └── 📂 test/
    │
    ├── 📦 pagamento/              # Serviço de Pagamento (8082)
    │   ├── 📄 pom.xml
    │   ├── 📄 Dockerfile
    │   ├── 📜 mvnw / mvnw.cmd
    │   └── 📂 src/
    │       ├── 📂 main/
    │       │   ├── 📂 java/com/pagamento/
    │       │   │   ├── PagamentoApplication.java
    │       │   │   ├── 📂 controller/
    │       │   │   │   └── PagamentoController.java
    │       │   │   ├── 📂 model/
    │       │   │   │   ├── Pagamento.java
    │       │   │   │   └── MeioPagamento.java (enum)
    │       │   │   ├── 📂 repository/
    │       │   │   │   └── PagamentoRepository.java
    │       │   │   ├── 📂 service/
    │       │   │   │   └── PagamentoService.java
    │       │   │   └── 📂 client/
    │       │   │       └── NotificacaoClient.java
    │       │   └── 📂 resources/
    │       │       └── application.properties
    │       └── 📂 test/
    │
    └── 📦 notificacao/            # Serviço de Notificação (8083)
        ├── 📄 pom.xml
        ├── 📄 Dockerfile
        ├── 📜 mvnw / mvnw.cmd
        └── 📂 src/
            ├── 📂 main/
            │   ├── 📂 java/com/notificacao/
            │   │   ├── NotificacaoApplication.java
            │   │   ├── 📂 controller/
            │   │   │   └── NotificacaoController.java
            │   │   ├── 📂 model/
            │   │   │   ├── Notificacao.java
            │   │   │   ├── TipoNotificacao.java (enum)
            │   │   │   └── StatusNotificacao.java (enum)
            │   │   ├── 📂 repository/
            │   │   │   └── NotificacaoRepository.java
            │   │   ├── 📂 service/
            │   │   │   └── NotificacaoService.java
            │   │   └── 📂 client/
            │   │       └── UsuarioClient.java
            │   └── 📂 resources/
            │       └── application.properties
            └── 📂 test/
```

### Padrões de Arquitetura Utilizados

Cada microsserviço segue a arquitetura em camadas:

1. **Controller Layer** - Recebe requisições HTTP e retorna responses
2. **Service Layer** - Contém lógica de negócio
3. **Repository Layer** - Acesso a dados (JPA)
4. **Model Layer** - Entidades e DTOs
5. **Client Layer** - Comunicação com outros microsserviços (Feign)

---

## 🚢 Deployment

### Render.com (Produção)

O projeto está configurado para deploy automático no Render.com.

**Arquivos de configuração:**
- `render.yaml` - Definição de serviços
- `Dockerfile` (em cada microsserviço) - Build de containers

**URLs de Produção:**
```
Usuários:     https://ms-usuarios-XXX.onrender.com
Catálogo:     https://ms-catalogo-XXX.onrender.com
Pedidos:      https://ms-pedidos-XXX.onrender.com
Pagamento:    https://ms-pagamento-XXX.onrender.com
Notificação:  https://ms-notificacao-XXX.onrender.com
Frontend:     https://catalogo-livros-XXX.onrender.com
```

### Docker Registry

Para publicar imagens no Docker Hub:

```bash
# Login no Docker Hub
docker login

# Tag das imagens
docker tag av3_proj_sistemas-usuarios:latest seuurepository/usuarios:latest
docker tag av3_proj_sistemas-catalogo:latest yourrepository/catalogo:latest
docker tag av3_proj_sistemas-pedidos:latest yourrepository/pedidos:latest
docker tag av3_proj_sistemas-pagamento:latest yourrepository/pagamento:latest
docker tag av3_proj_sistemas-notification:latest yourrepository/notificacao:latest

# Push para Docker Hub
docker push yourrepository/usuarios:latest
docker push yourrepository/catalogo:latest
docker push yourrepository/pedidos:latest
docker push yourrepository/pagamento:latest
docker push yourrepository/notificacao:latest
```

### Kubernetes (Opcional)

Para deploy em Kubernetes, exemplo de deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: usuarios-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: usuarios
  template:
    metadata:
      labels:
        app: usuarios
    spec:
      containers:
      - name: usuarios
        image: yourrepository/usuarios:latest
        ports:
        - containerPort: 8081
        env:
        - name: DB_HOST
          value: mysql-service
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: username
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: password
```

---

## 🎓 Conceitos Acadêmicos Demonstrados

### 1. Arquitetura de Microsserviços

**Princípios Aplicados:**
- ✅ Serviços independentes e autônomos
- ✅ Comunicação via REST APIs
- ✅ Banco de dados por serviço (Database per Service)
- ✅ Desacoplamento de componentes
- ✅ Escalabilidade horizontal
- ✅ Resiliência e fault tolerance

### 2. Design Patterns

**Padrões Implementados:**
- **Repository Pattern** - Abstração de acesso a dados
- **Service Layer Pattern** - Separação de lógica de negócio
- **DTO Pattern** - Transferência de dados entre camadas
- **Client Pattern** - Comunicação entre microsserviços (Feign)
- **Factory Pattern** - Criação de objetos complexos
- **MVC Pattern** - Organização do frontend React

### 3. Princípios SOLID

- **S**ingle Responsibility - Cada classe tem uma única responsabilidade
- **O**pen/Closed - Aberto para extensão, fechado para modificação
- **L**iskov Substitution - Interfaces e abstrações bem definidas
- **I**nterface Segregation - Interfaces específicas por contexto
- **D**ependency Inversion - Dependência de abstrações, não implementações

### 4. RESTful API Design

**Boas Práticas:**
- Uso correto de verbos HTTP (GET, POST, PUT, DELETE)
- Status codes apropriados (200, 201, 404, 500)
- URLs semânticas e resource-based
- Content negotiation (JSON)
- CORS configurado adequadamente

### 5. Persistência e ORM

**Conceitos:**
- JPA/Hibernate para mapeamento objeto-relacional
- Transações e gerenciamento de estado
- Lazy vs Eager loading
- Queries JPQL
- Database migration com DDL auto

### 6. Containerização e Orquestração

**Práticas:**
- Multi-stage Docker builds para otimização
- Docker Compose para ambientes locais
- Networking entre containers
- Health checks e readiness probes
- Volume management para persistência

### 7. Comunicação entre Serviços

**Abordagens:**
- REST API síncrona com OpenFeign
- Service discovery via DNS (nomes de containers)
- Circuit breaker (conceito, não implementado)
- Retry logic (conceito, não implementado)

---

## 📚 Referências e Recursos

### Livros Recomendados

1. **Building Microservices** - Sam Newman
2. **Domain-Driven Design** - Eric Evans  
3. **Clean Code** - Robert C. Martin
4. **Spring in Action** - Craig Walls
5. **Designing Data-Intensive Applications** - Martin Kleppmann

### Documentação Oficial

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Spring Cloud OpenFeign](https://spring.io/projects/spring-cloud-openfeign)
- [Docker Documentation](https://docs.docker.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tutoriais e Artigos

- [Microservices.io](https://microservices.io/)
- [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.html)
- [12 Factor App](https://12factor.net/)
- [REST API Tutorial](https://restfulapi.net/)

---

## 👥 Contribuições

Este é um projeto acadêmico desenvolvido para fins educacionais.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Guia de Estilo

- Seguir convenções de código Java (Google Java Style Guide)
- Usar ESLint e Prettier no frontend
- Documentar métodos públicos com Javadoc
- Escrever commits descritivos em português
- Adicionar testes quando possível

---

## 📄 Licença

Projeto Acadêmico - **Universidade de Fortaleza (UNIFOR)** - 2025

Desenvolvido como trabalho de avaliação para a disciplina de Sistemas Distribuídos.

---

## 👨‍💻 Autor

**Paulo Silva**
- GitHub: [@savass33](https://github.com/savass33)
- Repositório: [av3_proj_sistemas](https://github.com/savass33/av3_proj_sistemas)

---

## 🙏 Agradecimentos

- Professor orientador pela orientação no desenvolvimento do projeto
- Colegas de turma pelo feedback e testes
- Comunidade Spring e React pelos excelentes frameworks e documentação
- Stack Overflow e comunidades de desenvolvedores

---

## 📊 Status do Projeto

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Tests](https://img.shields.io/badge/Tests-Manual-yellow)
![Coverage](https://img.shields.io/badge/Coverage-TBD-orange)

**Última atualização:** Dezembro 2025

---

## 🔮 Melhorias Futuras

### Funcionalidades

- [ ] Autenticação e autorização (JWT)
- [ ] Gerenciamento de estoque de livros
- [ ] Carrinho de compras
- [ ] Histórico de pedidos por usuário
- [ ] Sistema de avaliações e reviews
- [ ] Recomendações de livros baseadas em compras anteriores
- [ ] Dashboard administrativo
- [ ] Relatórios e analytics

### Técnicas

- [ ] Testes automatizados (JUnit, Mockito, TestContainers)
- [ ] CI/CD com GitHub Actions
- [ ] API Gateway (Spring Cloud Gateway)
- [ ] Service Discovery (Eureka)
- [ ] Distributed Tracing (Zipkin/Jaeger)
- [ ] Centralized Logging (ELK Stack)
- [ ] Metrics e Monitoring (Prometheus + Grafana)
- [ ] Circuit Breaker (Resilience4j)
- [ ] Event-driven architecture (Kafka/RabbitMQ)
- [ ] Caching (Redis)
- [ ] API Documentation (Swagger/OpenAPI)
- [ ] Rate Limiting
- [ ] Load Balancing

---

<div align="center">

**⭐ Se este projeto foi útil para seus estudos, considere dar uma estrela no repositório! ⭐**

Made with ❤️ for learning purposes

</div>
