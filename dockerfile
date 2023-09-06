# Imagem oficial do Node.js como base
FROM node:18.17.0

# Prisma CLI global
RUN npm install -g prisma

# diretório de trabalho
WORKDIR /app

# Porta
EXPOSE 4466

# Executa o Prisma CLI
CMD ["prisma"]
