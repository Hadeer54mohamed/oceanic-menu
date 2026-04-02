# Oceanic Menu Flow

A modern, multilingual restaurant menu application built with Next.js 16.1.0.

## Features

- 🌊 Beautiful ocean-themed design
- 🌐 Bilingual support (Arabic & English) with URL-based routing
- 📱 Fully responsive
- 🎨 Smooth animations with Framer Motion
- 🔍 Search and filter menu items
- 📋 Interactive menu categories
- 💳 QR code menu sharing
- 💬 WhatsApp integration

## Tech Stack

- **Framework:** Next.js 16.1.0
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The app will automatically redirect to the Arabic version at [http://localhost:3000/ar](http://localhost:3000/ar).

To view the English version, navigate to [http://localhost:3000/en](http://localhost:3000/en).

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
oceanic-menu-flow/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Dynamic language route
│   │   ├── layout.tsx     # Language-specific layout
│   │   └── page.tsx       # Main page
│   ├── i18n/              # Internationalization
│   │   ├── locales/       # Translation files
│   │   ├── settings.ts    # i18n configuration
│   │   └── translations.ts
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page (redirects to /ar)
├── src/
│   └── components/        # React components
│       ├── ui/            # Shadcn UI components
│       └── ...            # Feature components
├── public/                # Static assets
│   ├── menu/              # Menu item images
│   └── ...
└── package.json

```

## Available Routes

- `/` - Redirects to `/ar`
- `/ar` - Arabic version
- `/en` - English version

## Customization

### Translations

Edit translation files in `app/i18n/locales/`:
- `ar.json` - Arabic translations
- `en.json` - English translations

### Styling

The application uses a custom ocean theme defined in `app/globals.css`. You can customize colors, fonts, and other design tokens there.

### Menu Items

Update menu items in `src/components/MenuSection.tsx`.

## License

MIT
