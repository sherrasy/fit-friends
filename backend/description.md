# Fit-friends

## Запуск приложения

Сервисы:

- notify - отправка email уведомлений
- uploader - загрузка медиа файлов в базу данных
- users - пользователи
- workouts - тренировки

### Перейти в папку проекта

```bash
cd backend
```

### Установить зависимости

```bash
npm install
```

### Запуск контейнеров

```bash
docker compose -f apps/notify/docker-compose.dev.yml --project-name "fit-friends-notify" up -d

docker compose -f apps/uploader/docker-compose.dev.yml --project-name "fit-friends-uploader" up -d

docker compose -f apps/users/docker-compose.dev.yml --project-name "fit-friends-users" up -d

docker compose -f apps/workouts/docker-compose.dev.yml --project-name "fit-friends-workouts" up -d
```

### Начальное наполнение данных

Для сервисов users и workouts используется PrismaORM, поэтому необходимо сформировать таблицы и добавить начальные данные

> Пользователи

```bash
nx run users:"db:migrate"
nx run users:"db:generate"
```

После запуска сервиса необходимо выполнить

```bash
nx run users:"db:seed"
```

> Тренировки

```bash
nx run workouts:"db:migrate"
nx run workouts:"db:generate"
```

После запуска сервиса необходимо выполнить

```bash
nx run workouts:"db:seed"
```

### Соединение с сервисами

```bash
nx run notify:serve
nx run uploader:serve
nx run users:serve
nx run workouts:serve
```

### Взаимодействие с сервисами

Для использования сервисов предусмотрены тестовые файлы с запросами окружения в директории каждого модуля сервиса .имя сервиса.http

### Спецификация

> Пользователи

http://localhost:3001/spec#/

> Тренировки

http://localhost:3000/spec#/

## Сценарии

Все сценарии работы с NX приведены в файле project.json в поле target соответствующего сервиса, запуск осуществляется командой

```bash
nx run <имя сервиса>:<сценарий поля target>
```

## Переменные окружения

Для использования сервисов предусмотрены тестовые файлы с переменными окружения в директории каждого сервиса .имя сервиса.env.example
