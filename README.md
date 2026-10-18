# SMT Billing — web app (phone + PC browser, multi-user)

Files to host (any static host): index.html, config.js, manifest.webmanifest, sw.js, icon-192.png, icon-512.png.
firestore.rules is pasted into Firebase, not hosted.

## One-time setup (about 20 minutes, all free)

A. Database + logins (Firebase, Google's free "Spark" plan — no card, does not pause)
 1. console.firebase.google.com → Add project → name "SMT Billing" → turn Google Analytics OFF → Create.
 2. Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.
 3. Build → Firestore Database → Create database → location asia-south1 (Mumbai) → Start in production mode → Create.
 4. Firestore → Rules tab → delete everything there, paste the contents of firestore.rules,
    change 'owner@example.com' to the admin's email → Publish.
 5. Project settings (gear) → General → Your apps → Web (</>) → nickname "web" → Register
    → copy the firebaseConfig { ... } block.
 6. Open config.js in Notepad: replace `window.FIREBASE_CONFIG = null;` with
    `window.FIREBASE_CONFIG = { ...the block you copied... };` and set window.ADMIN_EMAIL to the admin's email. Save.

B. Hosting (Netlify, free)
 7. app.netlify.com/drop → drag this whole folder onto the page → you get https://<name>.netlify.app
    (sign up free to keep it; rename under Site configuration → Change site name, e.g. smt-billing.netlify.app).
 8. Back in Firebase: Authentication → Settings → Authorized domains → Add domain → smt-billing.netlify.app.

C. First sign-in
 9. Open the site, enter the admin email and a new password → Sign in → "Create the admin account" → it offers to load the 42 workbook invoices → Load.
10. Settings → Users → Add user (name, email, initial password, role). Share the site link and the password; users can change it via "Forgot password".
11. On phones: Chrome menu → Add to Home screen / Install app. On PC: Chrome → install icon in the address bar.

## Updating the app later
Replace the files on Netlify (drag the folder again onto the site's Deploys page). Data is in Firebase, untouched by updates.

## Roles
admin  — everything, incl. settings, users, delete invoices, restore backup, Excel import.
user   — raise/edit invoices, parties, items, reports, PDF, save backup/export.
Disable a user in Settings → Users to block access immediately.

## Single-user mode
Leave window.FIREBASE_CONFIG = null and the app runs without login, storing data in that browser only.
