# Connectia Frontend

Quick preview deployment:

```bash
npm install
npm run dev
npm run build
```

Vercel settings:
- Framework: Vite
- Build command: npm run build
- Output directory: dist

The current UI is still mock-state based. Backend integration will replace the in-memory `initialAppState` and `actions` calls with API calls.
