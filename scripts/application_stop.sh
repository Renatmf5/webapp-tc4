#!/bin/bash
echo "ApplicationStop: Parando o contêiner Docker"

# Parar e remover o contêiner
docker stop web-nextjs-app || true
docker rm web-nextjs-app || true