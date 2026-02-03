# Social Wave Growth 🌊

> Ride the Wave to Social Success

A modern Social Media SaaS platform for scheduling posts, analyzing performance, and creating engaging content powered by AI.

![Social Wave Growth](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)

## Features ✨

- **📅 Smart Scheduling** - Schedule posts across all platforms with an intuitive calendar
- **📊 Advanced Analytics** - Track follower growth, engagement rates, and content performance
- **🤖 AI Content Studio** - Generate content ideas, captions, and hashtags powered by AI
- **🔗 Multi-Platform** - Instagram, Facebook, X (Twitter), LinkedIn, and TikTok
- **📈 Best Time to Post** - AI-powered recommendations for optimal posting times
- **👥 Team Collaboration** - Invite team members and manage workflows

## Tech Stack 🛠️

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Charts**: Recharts
- **State**: Zustand
- **Payments**: Stripe (ready for integration)

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (optional for full functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/social-wave-growth.git

# Navigate to project
cd social-wave-growth

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deployment 🚀

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/social-wave-growth)

1. Push this repository to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## Project Structure 📁

```
src/
├── app/
│   ├── (auth)/          # Login, Signup pages
│   ├── dashboard/       # Dashboard, Calendar, Analytics, etc.
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── logo.tsx
│   ├── navbar.tsx
│   ├── sidebar.tsx
│   └── ...
├── hooks/
│   └── use-toast.ts
└── lib/
    ├── mock-data.ts     # Demo data
    ├── store.ts         # Zustand store
    ├── supabase.ts
    ├── types.ts
    └── utils.ts
```

## Brand 🎨

- **Primary Color**: #8B5CF6 (Purple)
- **Secondary Color**: #F97316 (Orange)
- **Tagline**: "Ride the Wave to Social Success"

## Pricing 💰

| Plan | Price | Features |
|------|-------|----------|
| Starter | $19/mo | 3 accounts, 30 posts/mo |
| Pro | $49/mo | 10 accounts, unlimited posts, AI |
| Business | $99/mo | Unlimited everything, API access |

## License 📄

MIT License - feel free to use for your own projects!

---

Built with ❤️ by [Social Wave Growth Team](https://socialwavegrowth.com)
