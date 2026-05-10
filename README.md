## Student
- Name: Stukalov Nikita Oleksandrovich
- Group: 232/1

## Практичне заняття №5 — JWT Authentication + Guards + RBAC

> **Примітка:** Файл `.env` додано лише для навчальних цілей. У реальних проектах `.env` не повинен потрапляти до репозиторію.

### Структура репозиторію
```
.
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── register.dto.ts
│   │   │   └── login.dto.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── auth.controller.ts
│   ├── users/
│   │   ├── user.entity.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── common/
│   │   ├── enums/
│   │   │   └── role.enum.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   └── pipes/
│   │       └── trim.pipe.ts
│   ├── categories/ ...
│   ├── products/ ...
│   ├── migrations/
│   ├── data-source.ts
│   ├── main.ts
│   └── app.module.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
```

### API Endpoints
| Method | URL | Auth | Role |
|--------|-----|------|------|
| POST | /auth/register | - | - |
| POST | /auth/login | - | - |
| GET | /api/categories | - | - |
| POST | /api/categories | JWT | admin |
| PATCH | /api/categories/:id | JWT | admin |
| DELETE | /api/categories/:id | JWT | admin |
| GET | /api/products | - | - |
| POST | /api/products | JWT | admin |
| PATCH | /api/products/:id | JWT | admin |
| DELETE | /api/products/:id | JWT | admin |

### Тест реєстрації
```text
$ curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "password123", "name": "Admin"}'

{"email":"admin@test.com","name":"Admin","id":1,"role":"user","createdAt":"2026-05-10T22:15:45.015Z"}
```

### Тест логіну
```text
$ curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "password123"}'

{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Nzg0NTEzNjMsImV4cCI6MTc3ODQ1NDk2M30.6TeHJgVdcfHo4Bira0pPYx3Qu6hf6esflaebdVsHKhA"}
```

### Тест 401 — запит без токена
```text
$ curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Hacked Product", "price": 1}'

{"message":"Missing authorization token","error":"Unauthorized","statusCode":401}
```

### Тест 403 — запит з роллю user
```text
$ curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <USER_TOKEN>" \
  -d '{"name": "Blocked Product", "price": 99}'

{"message":"Insufficient permissions","error":"Forbidden","statusCode":403}
```

### Тест успішного створення від admin
```text
$ curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -d '{"name": "MacBook Pro", "price": 2499.99, "stock": 10}'

{"name":"MacBook Pro","price":2499.99,"stock":10,"description":null,"id":4,"isActive":true,"createdAt":"2026-05-10T22:15:59.801Z","updatedAt":"2026-05-10T22:15:59.801Z"}
```
