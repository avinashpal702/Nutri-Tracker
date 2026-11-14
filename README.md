# NUTRI TRACKER

## Barcode-Based Nutrition Information Retrieval System

Nutri Tracker helps users learn more about packaged food by scanning a product barcode and presenting its nutrition information, nutrient ratings, and additives in an easy-to-read format. Product details are retrieved from [Open Food Facts](https://world.openfoodfacts.org/data) and stored in MongoDB using Prisma.

## Features

- Scan supported product barcodes using a device camera and the browser's [Barcode Detection API](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API).
- Look up product details and nutrition facts from Open Food Facts.
- View nutrient ratings and additive information.
- Store retrieved products in MongoDB to avoid repeated lookups.
- Browse previously retrieved products from the application.

## Technology

- [Next.js](https://nextjs.org/) 13 and React 18
- TypeScript and Tailwind CSS
- [Prisma](https://www.prisma.io/) with MongoDB
- Open Food Facts API and the browser Barcode Detection API

## Run locally

### Requirements

- Node.js and npm
- A MongoDB database (local or MongoDB Atlas)

### Install and configure

```bash
git clone https://github.com/rezahedi/nutrition-facts-scanner.git
cd nutrition-facts-scanner
npm install
```

Create a `.env` file in the project root and configure the database and application URL:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

For a local MongoDB instance, use a connection string such as:

```env
DATABASE_URL="mongodb://localhost:27017/nutri_tracker"
```

Generate the Prisma client and synchronize the schema:

```bash
npx prisma generate
npx prisma db push
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The landing page can be viewed without a database, but product lookups and product storage require a valid `DATABASE_URL`.

Keep `.env` private and do not commit database credentials.

## Barcode scanning notes

Scanning requires camera permission and a browser that supports the Barcode Detection API. Browser support varies; a compatible mobile browser is recommended. Camera access generally requires a secure context: HTTPS, or `http://localhost` when browsing on the same device as the development server. To test from another device, use an HTTPS deployment or development tunnel.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | MongoDB connection string used by Prisma. |
| `NEXT_PUBLIC_API_URL` | Base URL used by the app to call its API routes. Use `http://localhost:3000` locally and your deployed site URL in production. |
| `USDA_API_KEY` | Not currently used; product lookups use Open Food Facts. |

## Build and deployment

```bash
npm run build
npm run start
```

The `vercel-build` script runs `prisma generate` before building the Next.js application.

## License

This project is licensed under the MIT License.
