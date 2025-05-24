#!/bin/bash
DIR="/home/ec2-user/web-nextjs-app"
if [ -d "$DIR" ]; then
  rm -rf ${DIR}
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  sudo mkdir ${DIR}
fi

#!/bin/bash
echo "BeforeInstall: Instalando Docker"
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -aG docker ec2-user