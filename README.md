# Student Project Tracker

A hands-on web app development workshop project. It lets users add, display, edit, and delete engineering projects, with data stored in a local SQLite database.

## Run locally

### Requirements

- Node.js 22.18 or later, but below version 23, as specified by the workshop
- Git
- Visual Studio Code

### Start the application

Open a PowerShell terminal in the project folder and run:

```powershell
npm.cmd ci
npm.cmd start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To stop the server, press `Ctrl + C` in the terminal.

## How it works

The browser sends HTTP requests to the Express API. The server validates the data, stores or retrieves projects using SQLite, and returns JSON responses. Frontend JavaScript updates the visible page.

**Request flow:**

Browser HTML/CSS/JavaScript → Fetch/HTTP → Express API → SQLite → JSON response → Updated page

### Project files

- `public/index.html` — Page structure and project form.
- `public/style.css` — Appearance and responsive layout.
- `public/script.js` — Input handling, API requests, rendering, and user feedback.
- `server.js` — Starts the local server.
- `app.js` — API routes, validation, and responses.
- `database.js` — SQLite database operations.
- `data/projects.db` — Local database file created by the application.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check server health |
| GET | `/api/projects` | Retrieve projects |
| POST | `/api/projects` | Create a project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

## Verification

### Automated API test

The supplied `test/crud.test.js` test was run using:

```powershell
npm.cmd test
```

**Observed result:** 1 test passed, 0 failed.

The test covers CRUD operations, validation, persistence, API errors, and the static frontend. It uses a temporary database and does not prove that all browser interactions work correctly.

### Browser checks

Record each result only after performing the check.

- Add two distinct projects: Not yet verified.
- Edit a project and confirm its ID remains unchanged: Not yet verified.
- Cancel a deletion and confirm another deletion: Not yet verified.
- Refresh and restart the server to verify persistence: Not yet verified.
- Reject blank and whitespace-only names: Not yet verified.
- Stop the server, observe the connection error, restart, and retry: Passed during the workshop exercise.
- Check keyboard navigation and the 390px-wide mobile layout: Not yet verified.
- Check slow-save feedback and repeated clicks in Network: Not yet verified.

## Workshop limitations

- This local teaching application has no sign-in or per-user permissions.
- Browsers connecting to the same server share the same project collection.
- The SQLite database file and `node_modules` are local and should not be uploaded to GitHub.
- Cloud hosting requires separate server and database configuration.
