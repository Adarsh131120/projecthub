# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


client/
├── public/
│   └── index.html
├── src/
│   ├── assets/                # Static files, logos
│   ├── components/            # Reusable components (Navbar, Loader, etc.)
│   ├── pages/                 # Pages (Login, Register, Dashboard, etc.)
│   ├── features/              # Redux slices
│   ├── services/              # Axios logic for API calls
│   ├── utils/                 # Utility functions (Cloudinary presets, etc.)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── tailwind.config.js 