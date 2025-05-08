
# Angular 19 SPA Project

This project is a **Single Page Application (SPA)** built with **Angular 19**, styled using **Bootstrap 5** and **SCSS**. It follows a clean, modular architecture designed for scalability and maintainability.

---

## 🔧 Tech Stack

- **Framework**: Angular 19
- **Styling**: SCSS, Bootstrap 5
- **Architecture**: SPA (Single Page Application)
- **Language**: TypeScript

---

## 📁 Project Structure

```
├── .editorconfig              → Editor configuration
├── .gitignore                 → Git ignored files
├── .vscode/                   → VSCode workspace settings
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── public/
│   ├── favicon.ico            → Site icon
│   └── images/                → Static assets (e.g., background-header.png)
├── src/
│   ├── app/
│   │   ├── app.component.*    → Root component
│   │   ├── app.config*.ts     → Configuration files
│   │   ├── app.routes*.ts     → Routing logic
│   │   ├── core/
│   │   │   └── interface/
│   │   │       └── employee/
│   │   │           └── employee.interface.ts
│   │   ├── features/
│   │   │   ├── layouts/
│   │   │   │   ├── additions/
│   │   │   │   │   └── employee-form/
│   │   │   │   │       ├── employee-form.component.html
│   │   │   │   │       ├── employee-form.component.scss
│   │   │   │   │       ├── employee-form.component.spec.ts
│   │   │   │   │       └── employee-form.component.ts
│   │   │   └── dashboard/
│   │   │       ├── dashboard.component.html
│   │   │       ├── dashboard.component.scss
│   │   │       ├── dashboard.component.spec.ts
│   │   │       └── dashboard.component.ts
│   │   └── pages/
│   │       └── employee-registration/
│   │           ├── employee-registration.component.html
│   │           ├── employee-registration.component.scss
│   │           ├── employee-registration.component.spec.ts
│   │           └── employee-registration.component.ts
│   ├── index.html             → App entry HTML
│   ├── main.ts                → App bootstrap file
│   ├── main.server.ts         → Server-side entry (if SSR enabled)
│   └── server.ts              → Express or server logic (if used)
├── angular.json               → Angular workspace configuration
├── package.json               → Project metadata and dependencies
├── tsconfig*.json             → TypeScript configurations
└── README.md                  → This file
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or later)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   ng serve
   ```

4. Visit `http://localhost:4200` in your browser.

---

## 🧱 Features

- Modular and reusable component structure
- Responsive UI with Bootstrap
- SCSS architecture with variables, utilities, and mixins
- Organized assets in `public/images/`
- Clear separation of concerns (core, features, styles)

---

## 🖼️ Assets

All static assets are located in the `public/images/` directory, including avatar images, blog headers, and background patterns used across the application.

---

## 📜 Scripts

Useful commands:

```bash
ng serve           # Run development server
ng build           # Build the project for production
ng test            # Run unit tests
ng lint            # Lint the project
```

---

## 📦 Deployment

To build the project for production:

```bash
ng build --configuration=production
```

Deploy the contents of the `dist/` folder to your preferred hosting platform.

