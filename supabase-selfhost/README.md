# Supabase Self-Hosted Setup (Local Development)

This directory contains the Docker Compose configuration for running Supabase locally.

**This is for LOCAL DEVELOPMENT only.** For production, use cloud Supabase.

## Development Workflow

- **Local Development**: Use this Docker Compose setup
- **Production**: Use cloud Supabase (https://supabase.com)

This setup gives you:
- Full control over your local Supabase instance
- Ability to customize Supabase services
- Offline development capability
- Fast iteration without cloud dependencies

## Quick Start

1. **Copy the environment file**
   ```bash
   cp .env.example .env
   ```

2. **Generate JWT secrets** (if not already set in .env.example)
   ```bash
   # Generate JWT secret (32+ characters)
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Generate anon key and service role key
   # You can use the Supabase CLI or generate them manually
   ```

3. **Start Supabase**
   ```bash
   # Start with dev helpers (includes mail server)
   docker compose -f docker-compose.yml -f ./dev/docker-compose.dev.yml up -d
   
   # Or start without dev helpers
   docker compose up -d
   ```

4. **Access Supabase Studio**
   - Studio: http://localhost:8000
   - Mail (dev): http://localhost:9000
   - Meta: http://localhost:5555

5. **Stop Supabase**
   ```bash
   docker compose down
   ```

6. **Reset everything** (removes all data)
   ```bash
   ./reset.sh
   ```

## Environment Variables

See `.env.example` for all required environment variables. Key variables:

- `POSTGRES_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing secret (32+ characters)
- `ANON_KEY` - Supabase anonymous key
- `SERVICE_ROLE_KEY` - Supabase service role key
- `SITE_URL` - Your application URL (e.g., http://localhost:3000)
- `API_EXTERNAL_URL` - External API URL (e.g., http://localhost:8000)

## Services

- **Kong** (port 8000) - API Gateway
- **Studio** (port 8000) - Supabase Dashboard
- **Auth** - Authentication service
- **Rest** - PostgREST API
- **Realtime** - Realtime subscriptions
- **Storage** - File storage
- **Meta** (port 5555) - Database metadata API
- **DB** (port 5433) - PostgreSQL database
- **Analytics** (port 4000) - Logflare analytics
- **Mail** (dev, port 9000) - Inbucket mail server for development

## Development

When developing, use the dev compose file which includes:
- Mail server (Inbucket) for testing emails
- Fresh database on each restart
- Seed data from `dev/data.sql`

## Production

For production, do NOT use the dev compose file. Use only `docker-compose.yml` and ensure:
- Strong passwords and secrets
- Proper backup strategy
- SSL/TLS configuration
- Environment-specific configuration

## Troubleshooting

- **Port conflicts**: Change ports in `.env` file
- **Database issues**: Run `./reset.sh` to start fresh
- **Container won't start**: Check logs with `docker compose logs [service-name]`
