Инструкция по запуску приложения

1. Установить зависимости в директории `backend` и `frontend`

2. Поднять контейнеры в директории `backend`

```bash
docker compose -f ./apps/uploader/docker-compose.dev.yml --project-name "fit-friends-uploader" up -d
docker compose -f ./apps/notify/docker-compose.dev.yml --project-name "fit-friends-notify" up -d
docker compose -f ./apps/users/docker-compose.dev.yml --project-name "fit-friends-users" up -d
docker compose -f ./apps/workouts/docker-compose.dev.yml --project-name "fit-friends-workouts" up -d
```

3. Запустить приложения

- В директории `backend`

```bash
npx nx run-many --target=serve --all --maxParallel=5
```

Для заполнения моковыми данными сервисов users и workouts необходимо выполнить команды миграции и заполнения из файлов seed.ts в соответствующих контейнерах

```bash
nx run workouts:fillDb
nx run users:fillDb

```

- В директории `frontend`

```bash
npm start
```

5. После запуска всех контейнеров приложение будет доступно на `http://localhost:4001/`
