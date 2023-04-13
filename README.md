# speed-mern-app-demo-frontend

Speed your MERN app by REDIS

## Manage application

### Start application

```sh
# to start docker app
docker compose up -d
```

Note:

- **Open browser at http://localhost:3000 to view application**
- Can change API connection details or ports by the environment variables in .env file

### Other commands

```sh
# to stop docker app
docker compose down

# to stop & also delete volumes (mongodb & redis data)
docker compose down -v

# to rebuild all images & start
docker compose  up -d --build

# to rebuild image of specific service (after any code changes)
docker-compose build --no-cache <service_name>
# example
docker-compose build --no-cache movie_frontend_service
```
