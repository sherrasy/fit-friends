Инструкция по запуску приложения

1. Создать докер образы (команда - билд сервиса и затем образа)

- Перейти в директорию backend `cd backend`

- Выполнить команды

```bash
nx run notify:buildDockerImage
nx run uploader:buildDockerImage
nx run users:buildDockerImage
nx run workouts:buildDockerImage
nx run bff:buildDockerImage
```

- Перейти в директорию backend `cd frontend`

- Выполнить команду

```bash
npm run buildDockerImage
```

2. Создать env файлы. В каждой директории приложены необходимые `.fit-friends.<...>.env-example`.

3. Создать внешнюю сеть

```bash
docker network create fit-friends.rabbit
docker network create fit-friends.bff
```

4. Поднять контейнеры:

- В директории `backend`

```bash
docker compose -f ./apps/uploader/docker-compose.stage.yml up -d
docker compose -f ./apps/notify/docker-compose.stage.yml up -d
docker compose -f ./apps/users/docker-compose.stage.yml up -d
docker compose -f ./apps/workouts/docker-compose.stage.yml up -d
docker compose -f ./apps/bff/docker-compose.stage.yml up -d

```

Для заполнения моковыми данными сервисов users и workouts необходимо выполнить команды миграции и заполнения из файлов seed.ts в соответствующих контейнерах

```bash
 npx prisma migrate dev --name 'updated model' --schema ./schema.prisma --skip-generate --skip-seed
 npx ts-node ./assets/prisma/seed.ts
```

- В директории `frontend`

```bash
docker compose -f docker-compose.stage.yml up -d
```

5. После запуска всех контейнеров приложение будет доступно на `http://localhost:4001/`
