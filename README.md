# LiveSell V2 — Next.js + Firebase / Firestore

This is the Firebase version of the LiveSell live-commerce MVP.

## Included

- Next.js 16 App Router
- TypeScript
- Firebase Admin SDK
- Cloud Firestore
- Merchant application form
- Host application form
- Server-side validation
- Server-side Firestore writes
- Closed Firestore client rules
- `/admin` lead dashboard
- HTTP Basic Auth protection for `/admin`
- Vercel-ready environment variables

---

## Architecture

The browser does NOT write directly to Firestore.

Flow:

Browser form
→ Next.js API route
→ validation
→ Firebase Admin SDK
→ Firestore

This means your Firebase service-account credentials stay on the server.

Collections:

```text
merchantApplications
hostApplications
```

---

# 1. Install locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# 2. Create Firebase project

Go to Firebase Console and create a project.

Then:

Build
→ Firestore Database
→ Create database

Choose Production mode.

---

# 3. Create Firebase service-account credentials

Firebase Console:

Project settings
→ Service accounts
→ Firebase Admin SDK
→ Generate new private key

You will download a JSON file.

You need these three values:

```json
{
  "project_id": "...",
  "client_email": "...",
  "private_key": "..."
}
```

Do NOT commit that JSON file to GitHub.

---

# 4. Create `.env.local`

Copy:

```bash
cp .env.example .env.local
```

Then fill:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"

ADMIN_USER=admin
ADMIN_PASSWORD=use-a-long-random-password
```

Important:

The private key must remain server-side.

Never prefix these variables with `NEXT_PUBLIC_`.

---

# 5. Firestore Security Rules

This project includes:

```text
firestore.rules
```

The MVP intentionally blocks ALL browser access:

```text
allow read, write: if false;
```

The Next.js server writes through Firebase Admin SDK.

You can deploy the rules with Firebase CLI.

Install CLI:

```bash
npm install -g firebase-tools
```

Login:

```bash
firebase login
```

Initialize / select project if needed:

```bash
firebase use --add
```

Deploy rules:

```bash
firebase deploy --only firestore:rules
```

---

# 6. Test merchant form

Submit a merchant application from the homepage.

The frontend calls:

```text
POST /api/merchant-applications
```

Firestore receives a document inside:

```text
merchantApplications
```

Example:

```json
{
  "companyName": "Acme Beauty",
  "contactName": "Alex Smith",
  "businessEmail": "alex@acme.com",
  "country": "Spain",
  "productCategory": "Beauty & skincare",
  "averageRetailPrice": "€29.90",
  "status": "new"
}
```

---

# 7. Test host application

The host form calls:

```text
POST /api/host-applications
```

Firestore receives it inside:

```text
hostApplications
```

---

# 8. Admin dashboard

Open:

```text
http://localhost:3000/admin
```

Your browser will ask for:

```text
ADMIN_USER
ADMIN_PASSWORD
```

The dashboard shows the 100 most recent:

- merchant applications
- host applications

---

# 9. Deploy to Vercel

Push this project to GitHub.

Then:

Vercel
→ Add New Project
→ Import repository

Add environment variables:

```text
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
ADMIN_USER
ADMIN_PASSWORD
```

Deploy.

No public Firebase JavaScript SDK configuration is required for the current MVP because the browser never connects directly to Firestore.

---

# 10. Recommended production improvements

Before sending paid traffic:

1. Add Cloudflare Turnstile or Firebase App Check equivalent protection.
2. Add IP-based API rate limiting.
3. Add email notifications when a new lead arrives.
4. Add Privacy Policy.
5. Add Terms.
6. Add GDPR consent wording/logging.
7. Add lead notes/status editing in admin.
8. Replace HTTP Basic Auth with Firebase Authentication or Google SSO.
9. Add analytics.
10. Connect your production domain.

---

# Why Firebase Admin SDK?

The Admin SDK is intended for privileged server environments.

This project uses the server only for Firestore access, while Firestore browser rules deny direct client reads and writes.

That gives you a simple MVP architecture without exposing privileged credentials in frontend code.
