# TaskFlow - Minimal Task Manager

A sleek, full-stack task management application built with Next.js.

## Features
- **CRUD Operations**: Create, Read, Update (title/status), and Delete tasks.
- **Persistence**: Tasks are saved to a local `tasks.json` file.
- **Filtering**: View All, Active, or Completed tasks.
- **Premium UI**: Modern dark mode with glassmorphism and smooth transitions.
- **Responsive**: Works on desktop and mobile.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Lucide React (Icons).
- **Backend**: Next.js API Routes.
- **Storage**: Local JSON file system.
- **Styling**: Vanilla CSS.

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation
1. Clone the repository (or extract the files).
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### API Endpoints
- `GET /api/tasks`: Get all tasks.
- `POST /api/tasks`: Create a new task (Body: `{"title": "string"}`).
- `PATCH /api/tasks/:id`: Update a task (Body: `{"title": "string", "completed": boolean}`).
- `DELETE /api/tasks/:id`: Delete a task.
