# --- Estágio 1: Build (Compilação) ---
# Usa uma imagem com Java JDK completo para compilar
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copia os arquivos do Maven Wrapper (para garantir que temos o Maven)
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Dá permissão de execução ao mvnw (caso tenha perdido no Windows)
RUN chmod +x mvnw

# Baixa as dependências (Cache Layer)
RUN ./mvnw dependency:go-offline

# Copia o código fonte
COPY src ./src

# Compila o projeto e gera o .jar na pasta target
RUN ./mvnw clean package -DskipTests

# --- Estágio 2: Runtime (Execução) ---
# Usa uma imagem Java JRE mais leve apenas para rodar
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copia o .jar gerado no estágio anterior
COPY --from=build /app/target/*.jar app.jar

# Define a porta (O Render vai sobrescrever a variável PORT, mas expomos 8080 por padrão)
EXPOSE 8080

# Comando para iniciar
ENTRYPOINT ["java", "-jar", "app.jar"]