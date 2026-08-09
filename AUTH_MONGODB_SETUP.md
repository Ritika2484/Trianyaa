# Firebase auth and MongoDB setup

The public landing page remains available to everyone. Firebase Authentication protects sign-in and the order endpoint; MongoDB stores the product catalogue and placed orders.

## 1. Firebase

1. Create or select a Firebase project.
2. Enable **Authentication → Sign-in method → Email/Password**. Google sign-in can remain enabled for the existing button.
3. Copy the Firebase web app settings into the `NEXT_PUBLIC_FIREBASE_*` variables in `.env.local`.
4. Create the admin user in **Authentication → Users** using the email/password credentials you want to use for the admin account.

## 2. Admin RBAC

The server accepts either of these admin roles:

- Put the exact Firebase user email in `ADMIN_EMAILS` (comma-separated for multiple admins).
- Or set a Firebase custom claim named `admin: true` or `role: "admin"` with a trusted Firebase Admin script.

Do not put an admin password in the repository. The admin password remains managed by Firebase Authentication.

The product API checks the Firebase ID token on every create/delete request. Hiding the admin button in the client is only a convenience; it is not the security boundary.

For a hosted deployment, add `ADMIN_EMAILS` to the provider's production environment variables and redeploy. If it is omitted, the current `admin@gmail.com` account remains the fallback administrator so the existing deployment does not lose the menu.

## 3. Firebase Admin credentials

Create a Firebase service-account key in **Project settings → Service accounts** and map its values to:

- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY`

Keep `FIREBASE_ADMIN_PRIVATE_KEY` server-only. In `.env.local`, escaped `\\n` sequences are converted to newlines automatically.

## 4. Cloudinary product images

Product images selected in **Manage Products** are uploaded by the authenticated admin to Cloudinary. The returned HTTPS URL is then stored in MongoDB as the product's `image` value.

Create a Cloudinary product environment and add these server-only values to `.env.local` (and your deployment environment):

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_UPLOAD_FOLDER` (optional; defaults to `trianyaa/products`)

The API secret is used only by the server to sign uploads. Never expose it through a `NEXT_PUBLIC_` variable.

## 5. MongoDB

1. Create a MongoDB Atlas cluster or use a MongoDB server.
2. Add its connection string to `MONGODB_URI` and optionally set `MONGODB_DB_NAME`.
3. Allow the deployed server's IP/network in MongoDB Atlas.

On the first successful `GET /api/products`, the six existing local catalogue items are seeded into MongoDB when the collection is empty. Set `SEED_PRODUCTS_ON_EMPTY=false` if you want to seed manually.

The product schema stores:

- `productId`, name, price, optional original price, image, colors, description, stock and merchandising flags
- `category` for the existing display grouping (`Basic`, `Standard`, `Premium`, `Keychains`)
- `tier` as the required three-mode classification (`Basic`, `Standard`, `Premium`)
- rating/review metadata and included items

## 6. Run

```bash
cp .env.example .env.local
npm run dev
```

Guests can browse and add items to the basket, but the server rejects order creation until the user signs in. Admin users can open the protected `/admin` route from the signed-in account menu to add, edit, or delete catalogue items.
