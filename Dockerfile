# Utilise une image Node.js comme base
FROM node:22

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire le projet TypeScript
RUN npm run build
RUN npx prisma generate

EXPOSE 3000

# Définir la commande par défaut pour lancer l'application
CMD ["node", "dist/index.js"]


