# Installation von Docker Containern
Wie man Docker installiert wird am besten auf der Seite von [Docker](https://docs.docker.com/engine/install/debian/) selbst erklärt.  
  
Ich baue meine Docker Container am liebsten mit docker-compose.

## Portainer
Trotzdem ist Portainer ganz interessant, um eine grafische Übersicht aller laufenden (und nicht laufenden) Docker Container zu haben.  
Meine Dienste laufen alle unter `/opt/docker/`  

```sh
sudo mkdir -p /opt/docker/portainer
cd /opt/docker/portainer
sudo nano docker-compose.yml

docker compose pull
docker compose up -d
```  
Inhalt der `docker-compose.yml`
```yml
version: '3'

services:
  portainer:
    image: portainer/portainer-ce:latest
    command: -H unix:///var/run/docker.sock
    container_name: portainer
    restart: unless-stopped
    ports:
      - 9000:9000
      - 8000:8000
    security_opt:
      - no-new-privileges:true
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./_data:/data
```
Das Volume für Data wird in demselben Order angelegt, in dem auch die `docker-compose.yml` liegt