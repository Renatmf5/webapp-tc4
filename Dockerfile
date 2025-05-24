# Use uma imagem base oficial do Node.js
FROM node:18-alpine

# Instale o PM2 globalmente
RUN npm install -g pm2

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY package.json package-lock.json ./
COPY . .

# Instale as dependências
RUN npm install

# Construa o projeto Next.js
RUN npm run build

# Exponha a porta que o Next.js usará
EXPOSE 80

# Comando para iniciar o PM2 com o arquivo ecosystem.config.js
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]