# SwiftURL

SwiftURL is a high-performance URL shortening service built with **Node.js, Fastify, Redis, and MongoDB**. It provides fast and reliable URL shortening, analytics tracking, and rate-limiting features.

## Features
- **Shorten Long URLs**: Convert long URLs into short, easily shareable links.
- **Fast Performance**: Uses Redis caching for quick lookups.
- **Analytics Tracking**: Tracks click counts, last click timestamps, and device types.
- **Rate Limiting**: Prevents abuse using a Redis-based rate limiter.
- **User Authentication**: Secure JWT-based authentication.
- **QR Code Generation**: Generates QR codes for each shortened URL.

## Tech Stack
- **Backend:** Node.js, Fastify
- **Database:** MongoDB (stores user and URL data)
- **Cache:** Redis (stores frequently accessed short URLs & rate limiting data)
- **Authentication:** JWT
- **Storage:** Cloudinary (for QR codes)

## Flowchart: Redis Cache and MongoDB Query (How It Works)

```plaintext
+----------------+        
|  User Request  |        
+----------------+        
        |                   
        V      
+----------------------+
|  Rate Limit Check   |
+----------------------+
    Allowed? (Yes/No)
    |        |
   YES       | NO
    |        |         +--------------------+
    |        |----->   | Block Request (429)|  ------>  END
    |                  +--------------------+
    V
+--------------------+     
|  Check Redis Cache |     
+--------------------+     
        |                   
        V                   
+----------------+      No       +--------------------+
|  Cache Hit?    | ------------> | Query MongoDB for  |
+----------------+               |        Data        |
        |                        +--------------------+
       Yes                         |          |         
        |                          V          V        
        V                    +---------------------+   
+--------------------+       | Store Data in Redis |   
| Return Cached Data |       |       Cache         |   
+--------------------+       +---------------------+   
           |                        |               
           V                        V               
        +----------------------------------------+   
        |           Return Data to User          |  
        +----------------------------------------+  

```
## Installation

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB
- Redis

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/ShreyasGanesh911/SwiftURL.git
   cd SwiftURL
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure your environment variables:

   ```env
    PORT = 8000
    MONGO_URI = mongodb://localhost:27017/db_name
    SALT_ROUNDS = XXXX
    JWT_KEY = "someKeyHere"
    CLOUDINARY_NAME = "xxxxx"
    CLOUDINARY_API_SECRET = "xxxxx"
    CLOUDINARY_API_KEY = "xxxxx"
    END_POINT = "http://localhost:8000"
   ```
4. Build TypeScript Files:
   ```sh
   npm run build
   ```
5. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/v1/user/register` – Register a new user
- `POST /api/v1/user/login` – Log in a user
- `POST /api/v1/user/logout` – Log out a user

### URL Shortening
- `POST /api/v1/url` – Generate short URL
- `GET /api/v1/url`  – Get all URLs
- `GET /api/v1/url/:id` – Get analytics for a short URL
- `DELETE /api/v1/url/:id` – Delete a URL

### Short URL check
- `GET /{short}` - Redirect to long URL

## Documentation
Postman API documentation

## ToDo
- Frontend 📊
   - Build a simple dashboard using Next.js
   - Show analytics
   - Implement user authentication for managing URLs
- Backend 🔐
    - Track country & region of users
    - Enable user-defined expiry for short URLs
    
   

