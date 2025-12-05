# Docker Setup Guide - ReportGenerator

This guide explains how to build and run the ReportGenerator application using Docker and Docker Compose.

## Prerequisites

- Docker Desktop installed (or Docker Engine + Docker Compose)
- OpenAI API key for AI features
- Optional: GLM API key for design suggestions

## Quick Start

### 1. Setup Environment Variables

```bash
# Copy the template and add your API keys
cp .env.docker .env.local

# Edit .env.local and add your OpenAI API key
nano .env.local  # or use your preferred editor
```

Required variables:
```
OPENAI_API_KEY=sk-proj-... # Your OpenAI API key
GLM_API_KEY=               # Optional
MONGODB_URI=mongodb://mongodb:27017/reportgenerator
```

### 2. Build and Run with Docker Compose

```bash
# Start all services (app + MongoDB)
docker-compose up -d

# The app will be available at http://localhost:3000
# MongoDB will be running on localhost:27017
# Mongo Express (optional) at http://localhost:8081
```

### 3. View Logs

```bash
# View logs for all services
docker-compose logs -f

# View logs for specific service
docker-compose logs -f app
docker-compose logs -f mongodb
```

### 4. Stop Services

```bash
# Stop all services (keeps data in volumes)
docker-compose down

# Stop and remove all data
docker-compose down -v
```

## Architecture

### Services

**app** (Next.js Application)
- Port: 3000
- Built from Dockerfile using multi-stage build
- Depends on MongoDB
- Environment: Production
- Health checks: Enabled

**mongodb** (Database)
- Image: mongo:7.0-alpine
- Port: 27017 (internal only, exposed via docker-compose)
- Data Volume: mongodb_data
- Health checks: Enabled

**mongo-express** (Optional Database Management)
- Image: mongo-express:latest
- Port: 8081
- Profile: `debug` (only runs with `--profile debug`)
- Useful for development and debugging

## Docker Files Explained

### Dockerfile

Multi-stage build process:

1. **Builder Stage** (node:18-alpine)
   - Installs dependencies
   - Builds the Next.js application
   - Generates `.next/standalone` for optimized output

2. **Production Stage** (node:18-alpine)
   - Minimal image with only necessary files
   - Copies built application from builder
   - Uses dumb-init for proper signal handling
   - Lightweight ~150-200MB final image

### docker-compose.yml

Orchestrates three services:
- **app**: Next.js application with health checks
- **mongodb**: MongoDB database with persistence
- **mongo-express**: Optional management UI (debug profile)

### .dockerignore

Excludes unnecessary files from Docker build:
- node_modules (installed in container)
- .git (not needed in production)
- Build files (.next, dist)
- Environment files (.env)

## Usage Examples

### Run in Production Mode

```bash
docker-compose up -d
```

### Run with Debug Tools (Mongo Express)

```bash
docker-compose --profile debug up -d
```

Then access:
- App: http://localhost:3000
- Mongo Express: http://localhost:8081

### Build Only (without starting)

```bash
docker-compose build
```

### Run a Single Service

```bash
# Just the app (requires external MongoDB)
docker-compose up app

# Just the database
docker-compose up mongodb
```

### Execute Commands in Running Container

```bash
# Access app container
docker-compose exec app sh

# Check app logs with specific format
docker-compose logs app --tail=50 --follow
```

## Environment Variables

### In docker-compose.yml

```yaml
environment:
  - NODE_ENV=production
  - OPENAI_API_KEY=${OPENAI_API_KEY}        # From .env.local
  - GLM_API_KEY=${GLM_API_KEY:-}           # Optional
  - MONGODB_URI=mongodb://mongodb:27017/reportgenerator
```

Variable sources:
- `${VARIABLE_NAME}` - Read from .env.local or shell environment
- `${VARIABLE_NAME:-default}` - Use default if not set
- Direct values - Hardcoded in compose file

## Health Checks

Both app and MongoDB have health checks enabled:

**App Health Check** (every 30 seconds):
```bash
wget --quiet --tries=1 --spider http://localhost:3000
```

**MongoDB Health Check** (every 10 seconds):
```bash
echo 'db.adminCommand("ping")' | mongosh localhost:27017/test
```

View health status:
```bash
docker-compose ps
```

## Volumes

Data persistence:

```yaml
volumes:
  mongodb_data:   # MongoDB database files
  mongodb_config: # MongoDB configuration
```

To backup MongoDB data:
```bash
docker run --rm -v reportgenerator_mongodb_data:/data -v $(pwd)/backup:/backup \
  mongo:7.0-alpine tar czf /backup/mongodb.tar.gz -C /data .
```

## Networking

Service communication within the Docker network:
- App connects to MongoDB at: `mongodb://mongodb:27017`
- Services communicate using service names as hostnames
- External access: `localhost:3000` for app, `localhost:27017` for MongoDB

Network name: `reportgenerator_app-network`

## Troubleshooting

### App Won't Start

1. Check environment variables:
```bash
docker-compose config | grep OPENAI_API_KEY
```

2. View logs:
```bash
docker-compose logs app
```

3. Verify MongoDB is running:
```bash
docker-compose logs mongodb
```

### MongoDB Connection Issues

```bash
# Test MongoDB connection
docker-compose exec mongodb mongosh

# Check MongoDB status
docker-compose exec mongodb mongosh --eval 'db.adminCommand("ping")'
```

### Container Resource Issues

Check Docker resources:
```bash
docker stats

# Limit resources in docker-compose.yml:
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### Rebuild After Code Changes

```bash
# Rebuild image and restart
docker-compose down
docker-compose up --build -d
```

## Production Deployment

### Important Considerations

1. **Environment Secrets**:
   - Never commit `.env.local` with real API keys
   - Use Docker secrets or environment variable management
   - Use `.env.docker` as template only

2. **Port Management**:
   - Change ports if conflicts exist
   - Use reverse proxy (Nginx, Caddy) for production
   - Enable HTTPS/TLS

3. **Database**:
   - Back up MongoDB regularly
   - Consider managed MongoDB services (MongoDB Atlas)
   - Use strong authentication credentials

4. **Logging**:
   - Configure Docker logging drivers
   - Use centralized logging (ELK, Datadog, etc.)

5. **Image Registry**:
   - Push built images to Docker Hub or private registry
   - Tag images with version numbers
   - Keep image size minimal

### Example Production Deployment

```bash
# Build and tag image
docker build -t myregistry/reportgenerator:1.0.0 .

# Push to registry
docker push myregistry/reportgenerator:1.0.0

# Deploy with production compose file
docker-compose -f docker-compose.prod.yml up -d
```

## Performance Optimization

### Current Optimizations

- Alpine Linux base image (small footprint)
- Multi-stage build (no dev dependencies in final image)
- Next.js standalone output (self-contained)
- Health checks for reliability
- dumb-init for proper signal handling

### Further Optimizations

1. Use Docker layer caching:
```dockerfile
COPY package*.json ./
RUN npm ci
COPY . .
```

2. Consider Node.js 20 or 22 for better performance

3. Use docker build cache:
```bash
docker build --cache-from=<previous-image> .
```

## Useful Commands Reference

```bash
# View service status
docker-compose ps

# View all containers
docker ps -a

# View resource usage
docker stats

# Clean up unused images/volumes
docker system prune -a

# View image size
docker images

# View build history
docker history <image-name>

# Push to registry
docker tag <image-id> <registry>/<image-name>:<tag>
docker push <registry>/<image-name>:<tag>

# Pull from registry
docker pull <registry>/<image-name>:<tag>
```

## Support

For issues:
1. Check Docker logs: `docker-compose logs`
2. Verify environment variables: `docker-compose config`
3. Ensure Docker daemon is running
4. Check disk space: `docker system df`
5. Review application logs in container

## Security Notes

- API keys are passed as environment variables
- MongoDB runs in isolated Docker network
- Use `.dockerignore` to exclude sensitive files
- Consider using Docker secrets for sensitive data
- Never expose MongoDB port to public internet
- Use network policies and firewalls
- Keep Docker images updated regularly
