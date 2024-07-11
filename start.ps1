docker-compose down

# Construir a imagem do backend
docker build -t wallet-wise-back-end-image:latest ./backend

# Construir a imagem do frontend
docker build -t wallet-wise-frontend-image:latest ./frontend

# Iniciar os containers com reconstrução das imagens e recriação dos containers
docker-compose up --build --force-recreate --remove-orphans