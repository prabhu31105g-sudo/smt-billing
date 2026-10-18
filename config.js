// SMT Billing — site configuration
// 1) Paste the firebaseConfig object from Firebase console (Project settings > Your apps > Web app).
//    Leave it as null to run in single-user mode (data stays in the browser, no login).
window.FIREBASE_CONFIG = null;
/* Example:
window.FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "smt-billing.firebaseapp.com",
  projectId: "smt-billing",
  storageBucket: "smt-billing.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
*/
// 2) The admin's email. This address can create its own account on first sign-in and always has admin rights.
window.ADMIN_EMAIL = "owner@example.com";
