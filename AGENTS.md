# Route-frontend — Project Notes

## Pending re-implementation: registration redirect guard

- `src/pages/registration/RegistrationForm.tsx`: the manager's original guard
  ```ts
  if (!userEmail) {
    navigate(ROUTE_NAMES.LOGIN);
  }
  ```
  was **temporarily removed** so `/registration` can be opened directly for UI work.
- **When registration implementation is revisited, restore this guard** (redirects to `/login` when no email was stored from the login Register step), matching `manager2.0-frontend` behavior.

## Workflow notes

- Login workflow copied 1:1 from `manager2.0-frontend` / `manager2.0-backend`.
- `VITE_API_ENDPOINT=http://localhost:5001` in `.env.development` → points at `route-backend`.
- Login page logo: `src/assets/images/logo.png` (wired via `App.tsx` domain fallback + favicon).
- Login page background: solid `#e0e0e0` (`FormLayout.style.ts`), `login_bg.jpg` no longer used but kept in assets.
- `/` is wrapped in `ProtectedRoute` → unauthenticated users redirect to `/login`; `/` renders `pages/Welcome` as post-login placeholder.
