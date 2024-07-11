# Wallet Wise App - Backend

O Wallet Wise App é uma aplicação Full-Stack desenvolvida para o controle financeiro pessoal. A principal funcionalidade da aplicação é permitir que os usuários gerenciem suas finanças de forma eficiente e organizada, proporcionando uma visão clara de suas entradas e saídas de valores em um formato mensal.

## Pré-requisitos

Antes de executar o projeto, certifique-se de que o **PostgreSQL** está instalado e funcionando. Você pode executar o PostgreSQL via Docker ou instalá-lo localmente. Ajuste as configurações de conexão no arquivo `application.properties` conforme necessário.

Além disso, é necessário ter o **Java 21** instalado em sua máquina para compilar e executar o projeto. Você pode baixar o JDK 21 a partir do [site oficial do OpenJDK](https://jdk.java.net/21/).

## Como Executar

Para executar o backend localmente, siga os passos abaixo:

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/LinikerThiers/wallet-wise.git
    ```

2. **Navegue para o diretório do backend:**
    ```bash
    cd wallet-wise/walletwise-backend
    ```

3. **Construa o projeto com Maven:**
    ```bash
    ./mvnw clean install -DskipTests
    ```

4. **Execute o projeto:**
    ```bash
    ./mvnw spring-boot:run
    ```

   Ou, se preferir, você pode executar o arquivo JAR:
    ```bash
    java -jar target/walletwise-0.0.1-SNAPSHOT.jar
    ```

## Configuração do Banco de Dados

- **URL de Conexão:** `jdbc:postgresql://localhost:5432/walletwise`
- **Usuário:** `yourusername`
- **Senha:** `yourpassword`

Certifique-se de atualizar as credenciais e a URL de conexão no arquivo `src/main/resources/application.properties`.
