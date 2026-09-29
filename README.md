# Employee Manager Dashboard

A modern employee management dashboard built with React, TypeScript, Vite, Tailwind CSS, and Recharts. The app presents key workforce metrics, attendance insights, leave requests, and employee growth trends using mock data for quick UI prototyping and demo purposes.

## Features

- Overview dashboard with KPI summary cards
- Employee headcount growth chart
- Attendance and absence tracking
- Leave request monitoring
- Department and team metrics
- Responsive layout for desktop and larger screens
- Clean, modern UI using Tailwind styling

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- React Router

## Screenshots

<p align="center">
  <img src="./docs/screenshots/dashboard.png" alt="Desktop View" width="650">
</p>

## Project Structure

```bash
Client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── data.ts
│   ├── main.tsx
│   └── index.css
├── docs/
│   └── screenshots/
├── package.json
├── vite.config.ts
├── tailwind.config.cjs
├── tsconfig.json
├── eslint.config.js
├── README.md
└── index.html
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

This will start the Vite development server, typically at:

```bash
http://localhost:5173
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Notes

This project currently uses mocked employee and dashboard data to simulate a real HR analytics interface. It is designed as a frontend dashboard and does not include a backend or persistent database yet.

## License

This project is for demonstration and learning purposes.
