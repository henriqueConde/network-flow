# Next.js Full-Stack Template

A production-ready Next.js 15 template with Supabase authentication, Prisma ORM, Material UI, and a modular monolith architecture.

## Features

- ✅ **Next.js 15** with App Router
- ✅ **Supabase** for authentication and database
- ✅ **Prisma** ORM for type-safe database access
- ✅ **Material UI (MUI)** for UI components
- ✅ **TanStack React Query** for server state management
- ✅ **React Hook Form + Zod** for form validation
- ✅ **TypeScript** with strict mode
- ✅ **Modular monolith** architecture (feature-driven)
- ✅ **Container/Presenter** pattern for components
- ✅ **Authentication** with email/password and Google OAuth
- ✅ **Protected routes** with middleware
- ✅ **Homepage, Login, and Signup** pages included

## Quick Start

### Prerequisites

- Node.js >= 20
- PostgreSQL database (via Supabase or local)
- Supabase account

### Setup

1. **Clone or copy this template**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up local Supabase for development**
   
   For local development, use the Docker Compose setup:
   ```bash
   # Navigate to supabase-selfhost directory
   cd supabase-selfhost
   
   # Copy environment file
   cp .env.example .env
   
   # Edit .env and update JWT_SECRET, ANON_KEY, and SERVICE_ROLE_KEY
   # For local dev, you can use the default values in .env.example
   
   # Start Supabase (this will automatically create volume directories)
   npm run supabase:start
   # Or manually: docker compose -f docker-compose.yml -f ./dev/docker-compose.dev.yml up -d
   ```
   
   The `supabase:start` script will automatically create necessary volume directories.
   You can also run `npm run supabase:setup` separately if needed.
   
   Access Supabase Studio at http://localhost:8000
   
   **Note:** For production, you'll use cloud Supabase. The local setup is only for development.

4. **Set up environment variables for Next.js**
   ```bash
   # In the project root, copy the example file
   cp .env.example .env.local
   ```
   
   The `.env.example` file already has the correct values for **local development**.
   For production, update the values with your cloud Supabase credentials.
   ```env
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:8000
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
   DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres
   DIRECT_URL=postgresql://postgres:postgres@localhost:5433/postgres
   ```
   
   **For production**, use your cloud Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-dashboard
   SUPABASE_ANON_KEY=your-anon-key-from-dashboard
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

5. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run migrations
   npm run prisma:migrate
   ```

6. **Generate Supabase types** (optional)
   ```bash
   npm run gen:types
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── api/               # API route handlers
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── layout.tsx         # Root layout
├── backend/               # Backend business logic
│   └── core/              # Core utilities (auth, db, errors)
├── features/              # Feature modules
│   ├── auth/              # Authentication feature
│   └── home/              # Homepage feature
├── shared/                # Shared utilities
│   ├── components/        # Shared UI components
│   ├── config/            # Configuration (theme, query client)
│   └── services/          # Shared services (HTTP client, Supabase)
└── types/                 # TypeScript types
```

## Architecture

This template follows a **modular monolith** architecture:

- **Feature-driven**: Code is organized by feature/domain, not by technology
- **Container/Presenter**: UI components are split into containers (logic) and views (presentation)
- **Layered backend**: HTTP → Use Cases → Repositories → Database
- **Type-safe**: Full TypeScript with Zod validation

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - Type check TypeScript
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Database
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run gen:types` - Generate Supabase TypeScript types

### Supabase
**Database Migrations:**
- The `supabase/migrations/` folder contains SQL migrations that define your database schema
- These are applied when you set up your database (cloud or local)

**Local Development** (use Docker Compose):
- **Docker Compose** (`supabase-selfhost/` folder) - **Use this for local development**
  - `npm run supabase:setup` - Create necessary volume directories
  - `npm run supabase:start` - Start local Supabase (runs setup automatically)
  - `npm run supabase:stop` - Stop local Supabase
  - `npm run supabase:restart` - Restart local Supabase
  - `npm run supabase:logs` - View Supabase logs
  - `npm run supabase:reset` - Reset Supabase (removes all data)

**Production:**
- Use cloud Supabase (create project at https://supabase.com)
- Set production environment variables in your deployment platform
- Apply migrations to production database

**Workflow:**
1. **Development**: Use `supabase-selfhost/` (Docker Compose) locally
2. **Production**: Use cloud Supabase
3. Migrations in `supabase/migrations/` are applied to both environments

## Authentication

The template includes:

- Email/password authentication
- Google OAuth (optional)
- Protected routes via middleware
- Session management with Supabase
- Server-side session sync

### Adding OAuth Providers

1. Configure the provider in your Supabase dashboard
2. Set the redirect URL to: `https://yourdomain.com/auth/callback`
3. The template already handles the OAuth flow

## Database

The template uses:

- **Supabase PostgreSQL** for the database
- **Prisma** for ORM and migrations
- **Row Level Security (RLS)** for authorization (configure in Supabase)

### Running Migrations

```bash
# Development
npm run prisma:migrate

# Production
npm run prisma:migrate:deploy
```

## Customization

### Adding a New Feature

1. Create a feature folder: `src/features/your-feature/`
2. Follow the structure:
   - `components/` - UI components (container/view pattern)
   - `services/` - API calls and React Query hooks
   - `index.ts` - Public API exports

### Styling

- Material UI theme is configured in `src/shared/config/mui-theme.ts`
- Component styles use the `sx` prop with style functions
- See `src/features/auth/components/login-form/login-form.styles.ts` for examples

## Deployment

### Vercel (Recommended)

1. **Set up cloud Supabase for production**
   - Create a project at https://supabase.com
   - Get your production credentials

2. **Push your code to GitHub**
   - Make sure migrations in `supabase/migrations/` are committed

3. **Import the project in Vercel**
   - Connect your GitHub repository

4. **Add production environment variables in Vercel**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
   SUPABASE_ANON_KEY=your-production-anon-key
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

5. **Apply migrations to production database**
   - Use Prisma: `npm run prisma:migrate:deploy`
   - Or apply SQL migrations from `supabase/migrations/` via Supabase Dashboard

6. **Deploy**

### Environment Variables for Production

Make sure to set all required environment variables in your deployment platform. Use your **cloud Supabase** credentials, not the local development ones.

## License

MIT

## Support

For issues and questions, please open an issue in the repository.

