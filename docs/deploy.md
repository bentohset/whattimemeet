# Deployment

## Deploy updated web server

TODO: automate this using GithubActions and lambda function
TODO: release server and staging server

- ensure no downtime on deployment; fallback server

1. Push latest version to DockerHub

```
make docker-push
```

2. SSH into ec2

3. Update the image and re-run
   On ec2:

```
updateimage
```

## Deploy on EC2 from scratch

1. initialize EC2 instance

- best to use Ubuntu distro

2. ssh into EC2

3. install docker on EC2 instance

```
sudo apt-get update
sudo apt-get install docker.io -y
sudo systemctl start docker
```

Manage as non-root users:

```
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

4. create macros to pull, push and start docker images
   `nano ~/.bashrc`

```
startimage() {
  docker run -d -p 8080:8080 -e APP_ENV=development --env-file .env.development bentohset/whattimemeet:latest;
}

stopimage() {
  local last_container=$(docker ps -q -n 1)
  if [ -n "$last_container" ]; then
    echo "Stopping the last Docker container: $last_container"
    docker stop "$last_container"
  else
    echo "No running Docker containers found."
  fi
}


update() {
  docker pull bentohset/whattimemeet:latest
  stopimage
  startimage
}

logsimage() {
  local last_container=$(docker ps -q -n 1)
  if [ -n "$last_container" ]; then
    echo "Getting logs: $last_container"
    docker logs "$last_container"
  else
    echo "No running Docker containers found."
  fi
}

```

`source ~/.bashrc`

5. start the server

- pull the image
- start the image
- check if its running

6. configure DNS record to point to EC2 public IP

- create a new DNS record type A
- subdomain `api`
- value: public ipv4 of ec2

7. install nginx

```
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

8. install certbot

- for auto https renewal and nginx configuration to domain

```
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
```

- domain name: api.DOMAIN

9. check if server is up

sudo nano /etc/nginx/sites-available/default
sudo systemctl restart nginx
