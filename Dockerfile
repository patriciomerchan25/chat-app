# Usar una imagen base de Node.js
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente del proyecto Angular
COPY ./src ./src
COPY ./angular.json ./angular.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.app.json ./tsconfig.app.json
COPY ./tsconfig.spec.json ./tsconfig.spec.json

# Compilar la aplicación Angular
RUN npm run build -- --configuration=production

# Copiar el código fuente del servidor Node.js
COPY ./serverChatNode ./serverChatNode

# Instalar dependencias del servidor Node.js
WORKDIR /app/serverChatNode
RUN npm install

# Volver al directorio de trabajo principal
WORKDIR /app

# Exponer los puertos necesarios
EXPOSE 8084 4500

# Comando para iniciar tanto el servidor Node.js como un servidor web para servir la aplicación Angular
CMD ["sh", "-c", "node serverChatNode/server.js & npx http-server ./dist/chat-sockets/browser -p 8084 -c-1 --proxy http://localhost:8084?"]