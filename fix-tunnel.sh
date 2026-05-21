#!/bin/bash

# Configuration
TUNNEL_PM2_NAME="cf-tunnel"

# Couleurs pour la lisibilité
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}===> Installation de Cloudflared (Méthode Directe) & Redémarrage <===${NC}"

# 1. Téléchargement du paquet .deb
echo -e "${GREEN}[1/4] Téléchargement du dernier paquet cloudflared...${NC}"
wget -q --show-progress "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb" -O /tmp/cloudflared.deb

# 2. Installation via dpkg
echo -e "${GREEN}[2/4] Installation du paquet...${NC}"
sudo dpkg -i /tmp/cloudflared.deb
sudo apt-get install -f -y

# 3. Vérification de l'installation
echo -e "${GREEN}[3/4] Vérification de la version...${NC}"
if command -v cloudflared &> /dev/null; then
    cloudflared --version
else
    echo -e "${RED}Erreur : L'installation de cloudflared a échoué.${NC}"
    exit 1
fi

# Nettoyage
rm -f /tmp/cloudflared.deb

# 4. Redémarrage du processus PM2 et logs
echo -e "${GREEN}[4/4] Redémarrage de $TUNNEL_PM2_NAME dans PM2...${NC}"
pm2 restart "$TUNNEL_PM2_NAME" || echo -e "${RED}Note : Le processus PM2 n'existait pas.${NC}"

echo -e "${BLUE}--- Affichage des logs (20 dernières lignes) ---${NC}"
pm2 logs "$TUNNEL_PM2_NAME" --lines 20 --no-daemon
