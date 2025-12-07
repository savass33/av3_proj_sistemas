# 🚀 Guia Completo de Deploy no Render.com

## ⚠️ Problemas Comuns e Soluções

### Por que o deploy falha?

1. **❌ Banco de Dados não configurado**
   - Render.com NÃO oferece MySQL gratuito
   - Você precisa usar um serviço externo

2. **❌ Variáveis de ambiente faltando**
   - DB_HOST, DB_USER, DB_PASSWORD devem ser configuradas

3. **❌ Free tier tem limitações**
   - Serviços dormem após 15 minutos de inatividade
   - Build pode levar 10-15 minutos por serviço

---

## 📋 Pré-requisitos

### 1. Banco de Dados MySQL/PostgreSQL

Você precisa de um banco de dados hospedado. Opções **GRATUITAS**:

#### Opção A: Railway (Recomendado - MySQL)
```
1. Acesse: https://railway.app
2. Crie conta (GitHub login)
3. New Project → Provision MySQL
4. Copie as credenciais:
   - MYSQL_HOST
   - MYSQL_USER  
   - MYSQL_PASSWORD
   - MYSQL_DATABASE
```

#### Opção B: PlanetScale (MySQL)
```
1. Acesse: https://planetscale.com
2. Crie conta gratuita
3. Create database → Copie connection string
```

#### Opção C: Aiven (PostgreSQL/MySQL)
```
1. Acesse: https://aiven.io
2. Free tier: 1 database gratuito
3. Crie MySQL/PostgreSQL service
```

#### Opção D: Render PostgreSQL (Grátis mas expira)
```
1. No Render Dashboard
2. New → PostgreSQL
3. Free tier (expira em 90 dias)
4. Você precisará migrar de MySQL para PostgreSQL
```

---

## 🔧 Configuração Passo a Passo

### Passo 1: Configurar Banco de Dados

Depois de criar seu banco, você terá credenciais como:

```
Host: mysql-xxxx.railway.app
Port: 3306
User: root
Password: abc123xyz
Database: railway
```

### Passo 2: Criar os 5 Databases

Conecte ao seu MySQL e crie:

```sql
CREATE DATABASE usuarios_db;
CREATE DATABASE livros_db;
CREATE DATABASE livraria_db;
CREATE DATABASE pagamento_db;
CREATE DATABASE notificacao_db;
```

**Via Railway CLI:**
```bash
# Instale o CLI
npm install -g @railway/cli

# Login
railway login

# Conecte ao MySQL
railway connect mysql

# Execute os CREATEs acima
```

### Passo 3: Atualizar render.yaml

Edite o arquivo `render.yaml` e substitua em TODOS os serviços:

```yaml
- key: DB_HOST
  value: mysql-xxxx.railway.app  # ← SEU HOST
- key: DB_USER
  value: root  # ← SEU USER
- key: DB_PASSWORD
  value: abc123xyz  # ← SUA SENHA
```

### Passo 4: Commit e Push

```bash
git add render.yaml
git commit -m "Configure database for Render deploy"
git push origin main
```

### Passo 5: Deploy no Render

#### Via Dashboard (Recomendado):

1. **Acesse:** https://dashboard.render.com
2. **New** → **Blueprint**
3. **Connect Repository:** `savass33/av3_proj_sistemas`
4. **Branch:** `main`
5. **Apply**

O Render vai:
- Detectar o `render.yaml`
- Criar 6 serviços automaticamente
- Fazer build de cada um (15-20 min total)

#### Via Render CLI (Alternativa):

```bash
# Instale o CLI
npm install -g render-cli

# Login
render login

# Deploy
render blueprint launch
```

---

## 📊 Monitoramento do Deploy

### Verificar Status:

1. **Dashboard:** https://dashboard.render.com
2. Clique em cada serviço
3. Veja os **Logs** em tempo real
4. Status deve ficar **Live** (verde)

### Logs por Serviço:

```bash
# Via CLI
render logs ms-usuarios
render logs ms-catalogo
render logs ms-pedidos
render logs ms-pagamento
render logs ms-notificacao
```

---

## 🔍 Troubleshooting

### Erro: "Connection refused" ou "Communications link failure"

**Causa:** Banco de dados não acessível

**Solução:**
```yaml
# Verifique se o host está correto
- key: DB_HOST
  value: mysql-xxxx.railway.app  # NÃO localhost!

# Adicione porta se necessário
spring.datasource.url=jdbc:mysql://${DB_HOST}:3306/...
```

### Erro: "Unknown database 'usuarios_db'"

**Causa:** Databases não foram criados

**Solução:**
```sql
-- Conecte ao MySQL e crie os 5 databases
CREATE DATABASE IF NOT EXISTS usuarios_db;
CREATE DATABASE IF NOT EXISTS livros_db;
CREATE DATABASE IF NOT EXISTS livraria_db;
CREATE DATABASE IF NOT EXISTS pagamento_db;
CREATE DATABASE IF NOT EXISTS notificacao_db;
```

### Erro: "This service is sleeping"

**Causa:** Free tier dorme após 15 min

**Solução:**
- Normal no plano gratuito
- Primeiro acesso demora ~30s para "acordar"
- Considere upgrade para Starter ($7/mês por serviço)

### Erro de Build: "mvnw: Permission denied"

**Causa:** Permissões perdidas no Windows

**Solução:** Já corrigido no Dockerfile com `RUN chmod +x mvnw`

### Erro: "Port already in use"

**Causa:** Render usa variável `PORT` automaticamente

**Solução:** 
```properties
# Não precisa configurar porta!
# Render injeta automaticamente PORT
# Spring Boot usa server.port=${PORT:8080}
```

---

## ✅ Verificação de Sucesso

### 1. Todos os serviços Live:

```
✓ ms-usuarios: https://ms-usuarios-xxxx.onrender.com
✓ ms-catalogo: https://ms-catalogo-xxxx.onrender.com  
✓ ms-pedidos: https://ms-pedidos-xxxx.onrender.com
✓ ms-pagamento: https://ms-pagamento-xxxx.onrender.com
✓ ms-notificacao: https://ms-notificacao-xxxx.onrender.com
✓ frontend: https://livraria-frontend-xxxx.onrender.com
```

### 2. Teste os endpoints:

```bash
# Usuários
curl https://ms-usuarios-xxxx.onrender.com/user

# Catálogo
curl https://ms-catalogo-xxxx.onrender.com/livros

# Pedidos
curl https://ms-pedidos-xxxx.onrender.com/pedidos
```

### 3. Atualize o frontend:

Depois do deploy, atualize as URLs no Render Dashboard:

```
Settings → Environment → Edit

VITE_API_USERS=https://ms-usuarios-xxxx.onrender.com
VITE_API_CATALOG=https://ms-catalogo-xxxx.onrender.com
VITE_API_PAYMENT=https://ms-pagamento-xxxx.onrender.com
VITE_API_NOTIFICATION=https://ms-notificacao-xxxx.onrender.com
VITE_API_ORDER=https://ms-pedidos-xxxx.onrender.com
```

Depois → **Manual Deploy** → **Clear build cache & deploy**

---

## 💰 Custos

### Plano Free (Atual):
- ✅ 750 horas/mês por serviço
- ✅ Build automático
- ❌ Serviços dormem após 15min
- ❌ Limitação de CPU/RAM
- ❌ No SLA

**Total: 6 serviços = GRÁTIS**

### Plano Starter (Recomendado para produção):
- ✅ Sem sleep
- ✅ Mais CPU/RAM
- ✅ SLA
- 💵 $7/mês por serviço

**Total: 6 serviços × $7 = $42/mês**

---

## 🎯 Checklist Completo

- [ ] Banco de dados MySQL criado (Railway/PlanetScale/Aiven)
- [ ] 5 databases criados (usuarios_db, livros_db, etc)
- [ ] Credenciais do banco copiadas
- [ ] render.yaml atualizado com DB_HOST, DB_USER, DB_PASSWORD
- [ ] Código commitado e pushed para GitHub
- [ ] Blueprint criado no Render
- [ ] Todos os 6 serviços com status "Live"
- [ ] Logs verificados (sem erros)
- [ ] Endpoints testados (retornam JSON)
- [ ] URLs do frontend atualizadas
- [ ] Frontend redeployado

---

## 🚨 Solução Rápida se Tudo Falhar

Se estiver com muitos problemas, use esta configuração simplificada:

### Use o Render PostgreSQL (Free):

1. **Crie PostgreSQL no Render:**
   - New → PostgreSQL
   - Free tier
   - Copie `Internal Database URL`

2. **Adicione driver PostgreSQL nos pom.xml:**

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

3. **Atualize application.properties:**

```properties
spring.datasource.url=${DATABASE_URL}
# Não precisa de username/password, DATABASE_URL tem tudo
```

4. **No render.yaml:**

```yaml
envVars:
  - key: DATABASE_URL
    fromDatabase:
      name: postgresql-database
      property: connectionString
```

---

## 📞 Suporte

**Render Docs:** https://render.com/docs
**Railway Docs:** https://docs.railway.app
**Este projeto:** https://github.com/savass33/av3_proj_sistemas

---

**Última atualização:** Dezembro 2025
