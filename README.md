# Payroll UI

Angular frontend for the Mini Payroll & Attendance System.

- Live app: [https://payroll-ui-sigma.vercel.app]
- Admin login: https://payroll-ui-sigma.vercel.app/admin-login
- Backend repo (API, database schema, architecture, API list): [https://github.com/mohamedshajith/payroll-backend]

## Pages

| Page | Who can open it |
|---|---|
| Employee Login (`/login`), Register (`/register`) | Public |
| Admin Login (`/admin-login`) | Public |
| Employees, Attendance | Admin |
| Leave, Payroll | Admin and Employee (employees see only their own data) |

## Structure

- `src/app/pages`: the screens (login, register, employees, attendance, leave, payroll)
- `src/app/core`: services (auth, employee, attendance, leave, payroll), the JWT interceptor, route guards, and models
- `src/environments`: the API URL (no URL is hardcoded in the code)

## Run locally

1. `npm install`
2. Set `apiUrl` in `src/environments/environment.ts`, for example `http://localhost:8080/api`
3. `ng serve`
4. Open http://localhost:4200

## Build

`ng build` creates the production files in `dist/`.

## Notes

- The JWT is attached to every request by an HTTP interceptor.
- Route guards block pages for users who are not logged in or lack the role. The backend enforces the same rules, so a role check in the UI is only for a better experience.