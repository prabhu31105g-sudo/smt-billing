// SMT Billing — site configuration
// 1) Firebase connection (Project settings > Your apps > Web app).
//    Set to null to run in single-user mode (data stays in the browser, no login).
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBZquUYSqhO_L6GAdpXj4hby789gMyOLbI",
  authDomain: "prabhu-28623.firebaseapp.com",
  projectId: "prabhu-28623",
  storageBucket: "prabhu-28623.firebasestorage.app",
  messagingSenderId: "718905299308",
  appId: "1:718905299308:web:f6671bce042a3dc9216349"
};
// 2) The admin's email. This address can create its own account on first sign-in and always has admin rights.
window.ADMIN_EMAIL = "prabhu31105g@gmail.com";

// 3) Google Drive backup — paste the OAuth Client ID from Google Cloud (APIs & Services > Credentials).
//    Leave it as "" to hide the Google Drive backup buttons.
window.GOOGLE_CLIENT_ID = "718905299308-qgk4a1m4udi8edkooaesvg1inpabbvkt.apps.googleusercontent.com";
window.DRIVE_BACKUP_KEEP_DAYS = 30;   // older backups in Drive are deleted automatically
