# Express Modular Monolith Backend

A production-ready Express.js backend with modular-monolith architecture, featuring authentication, CRUD operations, and multiple service integrations.

## 🏗️ Project Structure

```
src/
├── app.ts                      # Express app initialization
├── server.ts                   # Server startup & graceful shutdown
├── routes.ts                   # Route aggregation
├── config/                     # Configuration files
│   ├── env.ts                 # Environment validation
│   ├── db.ts                  # Prisma database client
│   ├── redis.ts               # Redis client
│   ├── cloudinary.ts          # Cloudinary setup
│   └── meilisearch.ts         # MeiliSearch client
├── modules/                    # Domain modules (microservice-style)
│   ├── auth/                  # Authentication module
│   ├── users/                 # User management
│   ├── hotels/                # Hotel CRUD
│   ├── flights/               # Flight CRUD
│   └── activities/            # Activity CRUD
└── shared/                     # Shared utilities
    ├── utils/                 # Helper functions
    ├── middleware/            # Express middleware
    └── constants/             # App constants
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Database URL (PostgreSQL)
- JWT secret
- Redis credentials
- Optional: Cloudinary, MeiliSearch

### 3. Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Users
- `GET /api/users` - List all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Hotels
- `GET /api/hotels` - List all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels` - Create hotel (protected)
- `PUT /api/hotels/:id` - Update hotel (protected)
- `DELETE /api/hotels/:id` - Delete hotel (protected)

### Flights
- `GET /api/flights` - List all flights
- `GET /api/flights/:id` - Get flight by ID
- `POST /api/flights` - Create flight (protected)
- `PUT /api/flights/:id` - Update flight (protected)
- `DELETE /api/flights/:id` - Delete flight (protected)

### Activities
- `GET /api/activities` - List all activities
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities` - Create activity (protected)
- `PUT /api/activities/:id` - Update activity (protected)
- `DELETE /api/activities/:id` - Delete activity (protected)

## 🔐 Authentication

Protected routes require JWT token in Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🏛️ Architecture

Each module follows a layered architecture:

```
Routes → Controller → Service → Repository → Database
```

- **Routes**: Define HTTP endpoints
- **Controller**: Handle requests/responses
- **Service**: Business logic
- **Repository**: Database operations
- **Types**: Zod schemas & TypeScript types

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Validation**: Zod
- **Auth**: JWT + bcrypt
- **Upload**: Cloudinary
- **Search**: MeiliSearch

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
```

## 🔧 Production Build

```bash
npm run build
npm start
```

## 📦 Example Request

### Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Create Hotel
```bash
curl -X POST http://localhost:3000/api/hotels \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Grand Hotel",
    "location": "New York",
    "price": 299.99,
    "rating": 4.5
  }'
```
