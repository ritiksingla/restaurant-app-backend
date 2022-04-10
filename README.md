# Run locally

### Environment variables
- Set config.env file with following keys
	- PORT
	- MONGO_URI
	- SECRET

### Run with default settings
- If changing the node.dockerfile then change the image tag in docker-compose.yml or delete mentioned image
```sh
docker-compose up -d
```

### Change port number
- change the port number in docker-compose.yml file to `<port>:5000`

### Change node version
- change NODE_VERSION in docker-compose.yml file to appropriate docker node tag

---

# Docker tutorial
## Build and run application image

### Build image
```sh
docker build --tag <registry>/<imageName>:<tag> -f <customFileName>.dockerfile .
```

### Push to dockerhub
```sh
docker push <imageName>
```

### Run container
```sh
docker run --rm -p <externalPort>:<internalPort> (-d|-it) (--network=<networkName>) (--name=<containerName>) <imageName>
```

### View container logs
```sh
docker logs <containerId>
```

## Container volumes

### Creating a container volume
```sh
docker run -p <ports> -v ${PWD}:<defaultVolumePath> <imageName>
```
- Example:
```sh
${PWD}/logs:/var/www/logs
```
#### Developing inside a container
- If we make any changes in the code then we have to rebuild the image
- We can mount the container storage while it is running using volumes and it will unmount automatically when container stops
- Process monitor performs a hot reload by restarting the application in the container
- Example:
```sh
${PWD}/src:/app/src
```

### Remove volume from last container
```sh
docker rm -v <lastContainerName>
```

## Communicating between multiple containers

### Create a bridge network
```sh
docker network create --driver <driverEnum> <networkName>
```
- <driverEnum> used in this project is bridge and <networkName> is isolated_network

### Interactive Terminal (run some file like seeder files run)
```sh
docker exec -it <containerName> sh
```

### Docker Compose
- create and start the containers
```sh
docker-compose -d up
```
- don't create any dependable services and only rebuild given container
```sh
docker-compose up -d --no-deps <containerName>
```
- take all containers down and remove
```sh
docker-compose down
```
- remove volumes and images too
```sh
docker-compose down --rmi all --volumes
```

### Utilities
```sh
docker inspect <containerName>
```