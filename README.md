<h1 align="center">
  Wallet Wise App
</h1>

<p align="center">
 <img src="https://github.com/LinikerThiers/wallet-wise/assets/89757097/d5a64dee-bba2-4d8d-9391-73d4d1b1ce46" alt="WalletWise Logo" width=60px heigth=60px />
</p>

## Descrição do Projeto

O **Wallet Wise App** é uma aplicação Full-Stack desenvolvida para o controle financeiro pessoal. 
A principal funcionalidade da aplicação é permitir que os usuários gerenciem suas finanças de forma eficiente e organizada, proporcionando 
uma visão clara de suas entradas e saídas de valores em um formato mensal. 

### Funcionalidades Principais

- **Controle Mensal de Renda**: O aplicativo permite que os usuários registrem e monitorem suas receitas e despesas de forma detalhada. Cada transação pode ser categorizada e analisada, facilitando o acompanhamento das finanças ao longo do tempo.
  <div align="center">
    <img src="https://github.com/LinikerThiers/wallet-wise/assets/89757097/56059169-9a5e-4c2f-9cb1-389464ba723a" width="500px" height="auto" style="margin-right: 20px;" />
    <img src="https://github.com/LinikerThiers/wallet-wise/assets/89757097/e242d539-ca0e-461f-a215-d5e5d679ebed" width="500px" height="auto" />
  </div>

- **Interface Intuitiva**: A aplicação apresenta uma interface de usuário moderna e intuitiva, desenvolvida com React e estilizada com Tailwind CSS. Isso garante uma experiência de usuário fluida e agradável, com fácil navegação e visualização clara das informações financeiras.
  <div align="center">
    <img src="https://github.com/LinikerThiers/wallet-wise/assets/89757097/7df1a2c2-6f7d-4451-a3e8-4c515036b7c1" width="200px" height="auto" />
  </div>

- **Dashboard Personalizado**: Os usuários têm acesso a um painel de controle que exibe um resumo das transações do mês atual, incluindo o total de entradas, saídas e saldo disponível. Essa visão geral ajuda os usuários a monitorar suas finanças de maneira eficaz e tomar decisões informadas.
   <div align="center">
    <img src="https://github.com/LinikerThiers/wallet-wise/assets/89757097/c033964f-fcfa-44de-b947-3065c04e5a65" width="500px" height="auto" />
  </div>

- **Ambiente Dockerizado**: O projeto é containerizado com Docker, permitindo que a aplicação seja executada em qualquer ambiente compatível com Docker. Isso facilita a configuração e a execução do aplicativo, garantindo que todos os componentes funcionem de forma integrada e sem conflitos.

## Tecnologia Utilizada

- **ViteJS**  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="45px" height="45px" style="vertical-align: middle; margin-right: 10px;" />

- **React**  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="45px" height="45px" style="vertical-align: middle; margin-right: 10px;" />

- **Tailwind CSS**  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="45px" height="45px" style="vertical-align: middle; margin-right: 10px;" />

- **Spring Boot**  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg" width="45px" height="45px" style="vertical-align: middle; margin-right: 10px;" />

- **PostgreSQL**  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="45px" height="45px" style="vertical-align: middle; margin-right: 10px;" />

- **Docker**  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg" width="45px" height="45px" style="vertical-align: middle; margin-right: 10px;" />

## Funcionalidades

- **Controle Mensal de Renda**: Permite visualizar e gerenciar entradas e saídas financeiras mensais.
- **Status dos últimos 5 meses**: Permite visualizar a quantidade de entrada e saída dos últimos 5 meses.
- **Interface de Usuário**: Desenvolvida com React e estilizada com Tailwind CSS para uma experiência de usuário intuitiva e agradável.
- **Processamento de Dados**: Utiliza o backend em Spring Boot para processar e gerenciar dados, com armazenamento eficiente em PostgreSQL.

## Como Executar

A executação deve ser feita com o Docker Compose, caso desejado, é possível executar cada projeto manualmente e localmente seguindo as instruções de seus respectivos arquivos README.

1. **Certifique-se de que o Docker e o Docker Compose estão instalados** em seu sistema.

2. **Clonar o repositório**:
    ```bash
    git clone https://github.com/LinikerThiers/wallet-wise.git
    ```

3. **Navegar para o diretório do projeto**:
    ```bash
    cd wallet-wise
    ```

4. **Executar o script de inicialização**:

   - **No terminal (Linux/Mac)**:
     ```bash
     chmod +x start.sh
     ./start.sh
     ```

   - **No PowerShell (Windows)**:
     ```powershell
     ./start.ps1
     ```
   **Observação**: Certifique-se de que o PowerShell permite a execução de scripts.

- Acessar aplicação em `http://localhost:5173`.
   
