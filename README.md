## Student
- Name: Stukalov Nikita Oleksandrovich
- Group: 232/1

## Практичне заняття №2 — NestJS + PostgreSQL + Redis

> **Примітка:** Файл `.env` додано лише для навчальних цілей. У реальних проектах `.env` не повинен потрапляти до репозиторію.

## Структура репозиторію
```
.
├── src/              # NestJS source code
├── Dockerfile
├── docker-compose.yml
├── .env.example      # шаблон змінних оточення
└── README.md
```

## Запуск проекту
```bash
cp .env.example .env   # налаштувати значення
docker compose up --build
```

## Перевірка сервісів
```text
NAME                        IMAGE                COMMAND                  SERVICE    CREATED          STATUS                PORTS
hlpf-env-setup-app-1        hlpf-env-setup-app   "docker-entrypoint.s…"   app        47 seconds ago   Up 46 seconds         0.0.0.0:3000->3000/tcp
hlpf-env-setup-postgres-1   postgres:16-alpine   "docker-entrypoint.s…"   postgres   8 days ago       Up 8 days (healthy)   0.0.0.0:5432->5432/tcp
hlpf-env-setup-redis-1      redis:7-alpine       "docker-entrypoint.s…"   redis      8 days ago       Up 8 days (healthy)   0.0.0.0:6379->6379/tcp
```

## Перевірка PostgreSQL
```text
$ docker compose exec postgres psql -U nestuser -d nestdb -c '\l'

                                                      List of databases
   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges   
-----------+----------+----------+-----------------+------------+------------+------------+------------+-----------------------
 nestdb    | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | 
 postgres  | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | 
 template0 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
 template1 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
(4 rows)
```

## Перевірка Redis
```text
$ docker compose exec redis redis-cli ping
PONG
```

## Перевірка застосунку
```text
$ curl http://localhost:3000
Hello World!
```

## Логи NestJS (фрагмент)
```text
app-1  | > hlpf-env-setup@0.0.1 start:dev
app-1  | > nest start --watch
app-1  |
app-1  | [7:58:38 PM] Found 0 errors. Watching for file changes.
app-1  |
app-1  | [Nest] LOG [NestFactory] Starting Nest application...
app-1  | [Nest] LOG [InstanceLoader] TypeOrmModule dependencies initialized
app-1  | [Nest] LOG [InstanceLoader] ConfigHostModule dependencies initialized
app-1  | [Nest] LOG [InstanceLoader] AppModule dependencies initialized
app-1  | [Nest] LOG [InstanceLoader] ConfigModule dependencies initialized
app-1  | [Nest] LOG [InstanceLoader] CacheModule dependencies initialized
app-1  | [Nest] LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized
app-1  | [Nest] LOG [RoutesResolver] AppController {/}:
app-1  | [Nest] LOG [RouterExplorer] Mapped {/, GET} route
app-1  | [Nest] LOG [NestApplication] Nest application successfully started
```
