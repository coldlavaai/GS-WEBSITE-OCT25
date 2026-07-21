# 📊 Google Sheets Direct Integration Setup

Your contact form will now send submissions **directly to Google Sheets**.

**Your Sheet:** https://docs.google.com/spreadsheets/d/1uKmU_phI7b6TArPSW7Ks5PV-snggG5KDy5QumIcuRdk/edit

---

## 🚀 Quick Setup (15 minutes)

### Step 1: Create a Google Cloud Service Account

1. Go to: https://console.cloud.google.com/
2. Select or create a project (e.g., "Greenstar Solar Website")
3. Enable the Google Sheets API:
   - Go to **APIs & Services** → **Enable APIs and Services**
   - Search for "Google Sheets API"
   - Click **Enable**

### Step 2: Create Service Account Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **Service Account**
3. Fill in:
   - **Service account name:** `greenstar-contact-form`
   - **Description:** `Appends contact form submissions to Google Sheets`
4. Click **Create and Continue**
5. Skip the optional steps (click **Done**)

### Step 3: Generate a JSON Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Click **Create** (a JSON file will download)

### Step 4: Extract the Credentials

Open the downloaded JSON file. You'll need two values:

```json
{
  "client_email": "greenstar-contact-form@your-project.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n"
}
```

Copy:
- `client_email` value
- `private_key` value (including the `\n` characters)

### Step 5: Share Your Google Sheet

1. Open your sheet: https://docs.google.com/spreadsheets/d/1uKmU_phI7b6TArPSW7Ks5PV-snggG5KDy5QumIcuRdk/edit
2. Click **Share** (top right)
3. Paste the **service account email** (from `client_email`)
4. Set permission to **Editor**
5. **Uncheck** "Notify people"
6. Click **Share**

### Step 6: Add to Vercel Environment Variables

Go to Vercel: **Settings** → **Environment Variables**

Add these **2 new variables**:

#### Variable 1:
- **Key:** `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- **Value:** The `client_email` from your JSON file
  (e.g., `greenstar-contact-form@your-project.iam.gserviceaccount.com`)
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### Variable 2:
- **Key:** `GOOGLE_PRIVATE_KEY`
- **Value:** The entire `private_key` from your JSON file
  (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

**Important:** Paste the entire private key as-is, including the `\n` characters.

### Step 7: Update Sheet Tab Name (if needed)

If your Google Sheet tab is NOT named "Sheet1", you need to update the code:

1. Open `lib/googleSheets.ts`
2. Change this line:
   ```typescript
   const SHEET_NAME = 'Sheet1'; // Change to your actual tab name
   ```

### Step 8: Redeploy

1. Go to Vercel → **Deployments**
2. Click on the latest deployment
3. Click **⋯** → **Redeploy**

---

## 📋 Expected Sheet Structure

Your Google Sheet should have these columns (in this order):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Phone | Postcode | Message | Source |

If your columns are in a different order, let me know and I'll adjust the code!

---

## ✅ Testing

Once configured:

1. Go to your website
2. Fill out the contact form
3. Submit it
4. Check your Google Sheet - a new row should appear!

---

## 🔧 Troubleshooting

**"Credentials not configured" warning:**
- Make sure both environment variables are added in Vercel
- Check there are no extra spaces in the variable names
- Redeploy after adding variables

**"Permission denied" error:**
- Make sure you shared the sheet with the service account email
- Check the service account has "Editor" permission

**Wrong column order:**
- Update `SHEET_NAME` and column range in `lib/googleSheets.ts`

---

## 🔐 Security Notes

- ✅ Service account email and private key are stored securely in Vercel
- ✅ NOT exposed to the browser (server-side only)
- ✅ Sheet is only accessible by the service account
- ✅ Can revoke access anytime by removing the service account from sheet sharing

---

## 📊 How It Works

1. User submits contact form on website
2. Form data sent to `/api/submit-contact`
3. Server-side code authenticates with Google using service account
4. Data appended as new row to your Google Sheet
5. Also saved to Sanity CMS (if configured)
6. Email notification sent (if configured)

---

**Need help?** Let me know which step you're stuck on!
