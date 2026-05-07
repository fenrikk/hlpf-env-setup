## Student
- Name: Stukalov Nikita Oleksandrovich
- Group: 232/1

## Практичне заняття №4 — DTO + class-validator + Pipes

> **Примітка:** Файл `.env` додано лише для навчальних цілей. У реальних проектах `.env` не повинен потрапляти до репозиторію.

### Структура репозиторію
```
.
├── src/
│   ├── categories/
│   │   ├── dto/
│   │   │   ├── create-category.dto.ts
│   │   │   └── update-category.dto.ts
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── common/
│   │   └── pipes/
│   │       └── trim.pipe.ts
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

### Тест валідації — порожнє ім'я категорії
```text
$ curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": ""}'

{"message":["name must be longer than or equal to 2 characters"],"error":"Bad Request","statusCode":400}
```

### Тест валідації — від'ємна ціна продукту
```text
$ curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Bad Product", "price": -5}'

{"message":["price must not be less than 0.01"],"error":"Bad Request","statusCode":400}
```

### Тест валідації — зайве поле
```text
$ curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "isAdmin": true}'

{"message":["property isAdmin should not exist"],"error":"Bad Request","statusCode":400}
```

### Тест TrimPipe
```text
$ curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "  Home Appliances  "}'

{"name":"Home Appliances","description":null,"id":4,"createdAt":"2026-05-07T06:53:04.153Z"}
```

### Тест валідне створення продукту
```text
$ curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "iPhone 16", "price": 1099.99, "stock": 30, "categoryId": 1}'

{"name":"iPhone 16","price":1099.99,"stock":30,"category":{"id":1},"description":null,"id":3,"isActive":true,"createdAt":"2026-05-07T06:53:11.322Z","updatedAt":"2026-05-07T06:53:11.322Z"}
```

### Тест кількох помилок одразу
```text
$ curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "", "price": -5, "stock": -10}'

{"message":["name must be longer than or equal to 2 characters","price must not be less than 0.01","stock must not be less than 0"],"error":"Bad Request","statusCode":400}
```
