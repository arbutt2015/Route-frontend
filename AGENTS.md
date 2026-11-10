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

- Authentication uses the existing route-backend Cognito endpoints. Successful login stores the returned user in storage and Redux, then navigates directly to Dashboard; do not restore the manager-only project-assignment API call or modal flags.
- `VITE_API_ENDPOINT=http://localhost:5001` in `.env.development` → points at `route-backend`.
- Login page logo: `src/assets/images/logo.png` (wired via `App.tsx` domain fallback + favicon).
- Login page background: solid `#e0e0e0` (`FormLayout.style.ts`); no background-image asset is required.
- `/` is nested under `ProtectedRoute` and `components/layout/AuthenticatedLayout`; `pages/Dashboard/Dashboard.tsx` renders `components/Map/Map` — a live Google Maps (`google-map-react`) hybrid map matching `manager2.0-frontend` base functionality. Add future authenticated routes inside the same layout route to share the header.
- Authenticated header assets are exported from `Transconomy Route.fig`, Web R1_3 frame 5 (244:590), header 244:2220. Source measurements: 96px header, 196.67×48px logo, 24px action icons, Source Sans Pro 12px labels / 16px profile.
- Header callbacks are passed through `AuthenticatedLayout` props; disabled tools mirror the initial design. No project/route plotting (markers, GeoJSON layers) is implemented yet — the manager's data-driven map layers can be ported when their APIs exist in route-backend.
- Map: `VITE_GOOGLE_MAP_API_KEY` in `.env.development` powers `components/Map/Map` (same client key as manager2.0-frontend). Default view is `MapType.HYBRID` centered near the tri-state region (41.5, -110.2, zoom 7) matching Screen 5; Map/Satellite toggle and +/- zoom buttons reuse the manager's markup, styles, and `plus/minu-road-view.png` icons. Map state is local to the component (redux stays limited to `domainInfo`/`user`).
- Verification: `npm run build` runs TypeScript and Vite; `npm run start:dev` starts the development server. Small screens use a wrapped header and horizontally scrollable action groups.
- Runtime config is centralized in `src/config/environment.ts`. `VITE_API_ENDPOINT` is required in every deployment; `VITE_AUTH_COOKIE_DOMAIN` is optional (unset means host-only). Cookie sharing across production subdomains requires explicitly configuring the parent domain. Cookies use SameSite=Lax and Secure on HTTPS, and are expired on logout. Frontend environment variables are public; never store secrets in them.
- Browser regression checks should mock API responses rather than submit real account credentials. Validate login → Dashboard, verification redirect, missing reset context, token refresh concurrency, and cookie removal. `npx tsc --noEmit` runs strict checks; unused locals and parameters are also enforced by `tsconfig.json` on every build.
- The source tree contains only the implemented authentication, branding, and Dashboard UI. Manager-only code/assets and empty directories were removed with user approval. Do not recreate placeholder feature folders before implementing them.
- API paths live in `src/config/api.config.ts`; the shared typed client handles transport errors in `src/api/http.service.ts`. Domain branding requests live in `src/api/branding.ts`. There are no API host literals in application source.
- Redux holds only `domainInfo` and `user`. `useAppState` exposes those values and their update handlers. Keep HTTP client independent of session helpers to avoid circular imports.
- Reuse `PasswordToggle` across authentication forms. Build output and node_modules are generated artifacts, not source architecture.
- The header profile dropdown opens a lazy-loaded `components/Profile/UpdateProfile` dialog or logs out. Profile requests use `GET/PATCH /users/me`; password changes use `PUT /auth/change-password`. `src/api/profile.ts` attaches refreshed bearer tokens and logs out on HTTP 401 without coupling the HTTP client to authentication helpers.
- Email is read-only; profile payloads contain only firstName, middleInitial, lastName, companyName, title, phoneNumber. Merge successful profile responses into the stored/Redux user to preserve other account fields and immediately update the header. Password change preserves unsaved profile edits and stays signed in on success, matching manager behavior.
- Test profile load/retry, Cancel/Close without writes, validation, success and failure saves, name persistence, password errors/success, dropdown keyboard controls, 401 logout and cookie removal. Do not submit real account/password changes in automated browser checks.
