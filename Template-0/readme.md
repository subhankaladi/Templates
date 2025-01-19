# Integrating Sanity with Next.js

This guide walks you through integrating Sanity into an existing Next.js project. You will learn to configure environment variables, set up a Sanity schema, and import data from an external API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Installing Necessary Packages](#installing-necessary-packages)
- [Adding a Script to package.json](#adding-a-script-to-packagejson)
- [Running the Import Script](#running-the-import-script)
- [Conclusion](#conclusion)

---

## Prerequisites

- A Next.js project already set up.
- Sanity installed in the project. If not, refer to [Sanity's official documentation](https://www.sanity.io/docs) for installation.

## Setting Up Environment Variables

1. Create a `.env.local` file in the root directory of your Next.js project if it doesn't already exist.
2. Add the following environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
```

> **Note:** Variables prefixed with `NEXT_PUBLIC_` will be exposed to the browser. Be cautious when sharing sensitive information.

---

## Installing Necessary Packages

Run the following command to install the required packages:

```bash
npm install @sanity/client axios dotenv
```

---

## Adding a Script to package.json

To enable running the import script, update the `package.json` file by adding the following entry to the `scripts` section:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "import-data": "node scripts/importSanityData.mjs"
}
```

---

## Running the Import Script

After completing the setup, run the import script with the following command:

```bash
npm run import-data
```

This script will import data into your Sanity project from an external API.

---

## Conclusion

By following this guide, you have:

- Configured environment variables for Sanity integration.
- Retrieved your Sanity Project ID and API token.
- Created a custom schema for your Sanity content.
- Imported data from an external API into your Sanity content lake.

### Security Note

- Keep your `.env.local` file secure. Do not commit it to your repository.
- For production, set the environment variables directly on your hosting platform.

### Benefits

This setup enables seamless integration of Sanity's content management capabilities with your Next.js project, offering a scalable and flexible solution for dynamic content management and data import.
