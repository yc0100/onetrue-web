import * as admin from "firebase-admin";

function getRequiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

// 避免 next dev / hot reload 重复 initialize
const globalForFirebase = globalThis as unknown as {
  __firebaseAdminApp?: admin.app.App;
};

export function getAdminApp() {
  if (globalForFirebase.__firebaseAdminApp) return globalForFirebase.__firebaseAdminApp;

  const projectId = getRequiredEnv("FIREBASE_PROJECT_ID");
  const clientEmail = getRequiredEnv("FIREBASE_CLIENT_EMAIL");
  const privateKey = getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");

  const app =
    admin.apps.length > 0
      ? admin.apps[0]!
      : admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });

  globalForFirebase.__firebaseAdminApp = app;
  return app;
}

export const db = admin.firestore(getAdminApp());
export { admin };