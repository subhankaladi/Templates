
# Integrating Sanity with Next.js

In this blog post, we will explore how to integrate **Sanity** into an existing **Next.js** project. The focus will be on configuring environmental variables, setting up a Sanity schema, and importing data from an external API. This guide assumes you already have a **Next.js** project established and Sanity installed.

## Table of Contents
1. [Setting Up Environment Variables](#setting-up-environment-variables)
2. [Obtaining Sanity Project ID and API Token](#obtaining-sanity-project-id-and-api-token)
3. [Creating the Sanity Schema](#creating-the-sanity-schema)
4. [Setting Up the Data Import Script](#setting-up-the-data-import-script)
5. [Running the Import Script](#running-the-import-script)

---

### Setting Up Environment Variables

Begin by setting up your environment variables. If a `.env.local` file doesn't already exist in your project's root directory, create one. Then, add the following variables:

```plaintext
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` will be exposed to the browser, so be cautious about what you prefix.

### Installing Necessary Packages

Now, let’s install the necessary packages. Run the following command in your terminal:

```bash
npm install @sanity/client axios dotenv
```

### Adding a Script to package.json

To run the import script, we need to add a new script to our `package.json` file. Open your `package.json` and add the following to the `"scripts"` section:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "import-data": "node scripts/importSanityData.mjs"
}
```

### Running the Import Script

Now you can run the import script using:

```bash
npm run import-data
```
