# Utilise l'image de Node.js version 16 comme base pour la construction.
FROM node:16 as build
# Définit /app comme le répertoire de travail dans le conteneur.
WORKDIR /app
# Copie les fichiers package.json et package-lock.json (s'il existe) dans le répertoire de travail.
COPY package*.json ./
# Exécute npm install pour installer les dépendances listées dans package.json.
RUN npm install
# Copie tous les fichiers du projet dans le répertoire de travail du conteneur.
COPY . .
# Exécute le script de build défini dans package.json pour construire l'application Angular.
RUN npm run build

# Commence une nouvelle étape en utilisant l'image Nginx basée sur Alpine.
FROM nginx:alpine
# Copie les fichiers de l'application Angular construits dans le répertoire de Nginx.
COPY --from=build /app/dist/food-delivery-app /usr/share/nginx/html
# Déclare que le conteneur écoute sur le port 80.
EXPOSE 80
# Démarre Nginx en mode foreground pour éviter de s'exécuter en arrière-plan.
CMD ["nginx", "-g", "daemon off;"]
