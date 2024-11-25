# Etapa 1: Construção do projeto
FROM node:20 AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração e dependências para o container
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Constrói o projeto para produção
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
FROM nginx:stable-alpine

# Define o diretório de trabalho para servir os arquivos
WORKDIR /usr/share/nginx/html

# Remove os arquivos padrão do Nginx
RUN rm -rf ./*

# Copia os arquivos construídos para o servidor Nginx
COPY --from=builder /app/dist .

# Copia um arquivo de configuração customizado do Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposição da porta 80 para servir a aplicação
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
