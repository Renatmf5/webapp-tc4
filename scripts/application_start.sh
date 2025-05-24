DIR="/home/ec2-user/web-nextjs-app"

echo "ApplicationStart: Iniciando a aplicação" | tee -a /home/ec2-user/web-nextjs-app/deploy.log

# Conceder permissões
sudo chmod -R 777 ${DIR}

# Navegar para o diretório da aplicação
cd ${DIR}

# Identificar o caminho do binário do Node.js
NODE_BIN=$(readlink -f $(which node))

# Conceder permissões ao binário do Node.js
sudo setcap 'cap_net_bind_service=+ep' $NODE_BIN


echo "Permissões setcap aplicadas ao Node.js" | tee -a /home/ec2-user/web-nextjs-app/deploy.log

export NODE_ENV=production
export NEXT_PUBLIC_API_BASE_URL='https://api.grupo-ever-rmf.com/api/v1/'
export PORT=80

# Parar e remover qualquer contêiner existente com o mesmo nome
docker stop web-nextjs-app || true
docker rm web-nextjs-app || true

# Iniciar o contêiner Docker
docker run -d -p 80:80 --name web-nextjs-app web-nextjs-app