# TODO: Fix Security, Bugs, Accuracy, Efficiency, UI/UX Issues in Codebase

## Information Gathered
- Analyzed all files: server.js, public/routes/auth.js, public/index.html, public/ven.html, public/dashboard-auth.js, public/login-modal.js, public/logic.js, public/routes/admin.js, public/routes/db.js, db.js, package.json.
- Identified security vulnerabilities like hardcoded passwords, inconsistent auth, missing validation.
- Found bugs in auth integration, typos, missing functions, DB inconsistencies.
- Noted efficiency issues with commented code and lack of error handling.
- UI/UX problems with classes, loading states, and mobile menu.

## Plan
1. **Security Fixes:**
   - Move hardcoded passwords and secrets to .env file.
   - Standardize password hashing to bcryptjs.
   - Add input validation in auth routes.
   - Fix DB connection paths and ensure consistency.

2. **Bug Fixes:**
   - Uncomment and fix dashboard-auth.js for proper auth integration.
   - Correct typos in HTML (windows.open, onclick functions).
   - Fix ven.html onclick and class issues.
   - Ensure Socket.IO error handling in admin.js.
   - Standardize DB connections across files.

3. **Accuracy and Efficiency:**
   - Remove commented code and duplications in server.js.
   - Add proper error handling for DB queries and connections.
   - Clean up inconsistent code blocks.

4. **UI/UX Improvements:**
   - Fix CSS classes in ven.html.
   - Add loading states and error messages in auth flow.
   - Correct mobile menu dashboard link.

5. **Other:**
   - Ensure GSAP checks are robust.
   - Test contact form and auth flow.

## Dependent Files to be edited
- server.js: Clean up, fix DB connections, add env vars.
- public/routes/auth.js: Fix pool path, add validation, standardize hashing.
- public/index.html: Fix mobile menu onclick.
- public/ven.html: Fix onclick and class.
- public/dashboard-auth.js: Uncomment and fix.
- public/login-modal.js: Add loading states.
- public/routes/admin.js: Add error handling.
- db.js: Remove hardcoded password.
- .env: Create with secrets.

## Followup steps
- Create .env file with required variables.
- Test auth registration, login, dashboard access.
- Test contact form submission and real-time updates.
- Run server and verify no errors.
