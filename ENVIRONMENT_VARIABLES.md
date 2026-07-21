# Environment Variables Reference

**Project:** GreenStar Solar Website
**Last Updated:** October 31, 2025

---

## 📋 Quick Reference

All environment variables are configured in **Vercel Dashboard** → **Settings** → **Environment Variables**

### Status: ✅ ALL CONFIGURED AND WORKING

---

## 🔑 Environment Variables

### Google Sheets Integration

#### `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- **Value:** `claude-code-automation@claude-code-access-475710.iam.gserviceaccount.com`
- **Environments:** Production, Preview, Development
- **Purpose:** Service account email for Google Sheets API authentication
- **Security:** Not sensitive (public identifier)

#### `GOOGLE_PRIVATE_KEY`
- **Value:** Full RSA private key (see secure storage)
- **Environments:** Production, Preview, Development
- **Purpose:** Private key for Google Service Account authentication
- **Security:** HIGHLY SENSITIVE - Never commit to Git
- **Format:** Must include actual newlines, not `\n` escape sequences
- **Location:** Set via Vercel CLI for proper formatting

**Important:** If updating this key, use Vercel CLI:
```bash
cat google_service_account.json | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['private_key'], end='')" | vercel env add GOOGLE_PRIVATE_KEY production
```

---

### Sophie Chat (Claude / Anthropic)

> VAPI has been removed. Sophie now runs on our own backend via Claude. The old
> `NEXT_PUBLIC_VAPI_*` variables are obsolete — delete them from Vercel.

#### `CLAUDE_CODE_OAUTH_TOKEN`
- **Purpose:** Max-subscription setup-token authenticating Sophie's calls to Claude
- **Environments:** Production, Preview, Development
- **Security:** Secret (server-side only, never `NEXT_PUBLIC_`). Regenerate with `claude setup-token`.

#### `SOPHIE_PREVIEW_SECRET`
- **Purpose:** Gates the Sol dashboard's live-test / improve prompt overrides
- **Environments:** Production, Preview, Development
- **Security:** Secret (server-side only)

#### `GREENSTAR_SUPABASE_URL` / `GREENSTAR_SUPABASE_SERVICE_KEY`
- **Purpose:** Read Sophie's published config, knowledge and guardrails from Supabase
- **Security:** Service key is secret (server-side only)

---

### Sanity CMS

#### `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **Value:** [Your Sanity project ID]
- **Environments:** Production, Preview, Development
- **Purpose:** Connects to Sanity CMS project
- **Security:** Not sensitive (public project identifier)

#### `NEXT_PUBLIC_SANITY_DATASET`
- **Value:** `production`
- **Environments:** Production, Preview, Development
- **Purpose:** Specifies which Sanity dataset to use
- **Options:** `production`, `staging`, `development`

#### `SANITY_API_WRITE_TOKEN`
- **Value:** [Your Sanity write token]
- **Environments:** Production, Preview, Development
- **Purpose:** Allows server-side writes to Sanity (form submissions)
- **Security:** HIGHLY SENSITIVE - Server-side only
- **Permissions:** Write access to formSubmission schema

#### `SANITY_API_READ_TOKEN`
- **Value:** [Your Sanity read token]
- **Environments:** Production, Preview, Development
- **Purpose:** Server-side read access for email settings, etc.
- **Security:** Moderately sensitive - Read-only access

#### `SANITY_REVALIDATE_SECRET`
- **Value:** [Random secret string]
- **Environments:** Production, Preview, Development
- **Purpose:** Secures ISR revalidation webhook from Sanity
- **Security:** Sensitive - Prevents unauthorized cache purging

---

### Email Notifications (Resend)

#### `RESEND_API_KEY`
- **Value:** [Your Resend API key]
- **Environments:** Production, Preview, Development
- **Purpose:** Sends email notifications for form submissions
- **Security:** HIGHLY SENSITIVE - Server-side only
- **Format:** Starts with `re_`

**Email Configuration:**
- From address: `GreenStar Solar <onboarding@resend.dev>`
- To addresses: Configured in Sanity Studio (emailSettings)
- Can update recipient list without code changes

---

### Site Configuration

#### `NEXT_PUBLIC_SITE_URL`
- **Value:** `https://greenstarwebsiteupgrade.vercel.app`
- **Environments:** Production, Preview, Development
- **Purpose:** Base URL for absolute links in emails, metadata, etc.
- **Security:** Not sensitive (public URL)
- **Note:** Update when custom domain is connected

---

## 🔐 Security Classifications

### PUBLIC (Safe to expose)
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`

### HIGHLY SENSITIVE (Server-only, never expose)
- `GOOGLE_PRIVATE_KEY`
- `CLAUDE_CODE_OAUTH_TOKEN` - Sophie's Claude (Max) auth
- `SOPHIE_PREVIEW_SECRET` - dashboard live-test gate
- `GREENSTAR_SUPABASE_SERVICE_KEY` - Sophie config/knowledge reads
- `SANITY_API_WRITE_TOKEN`
- `RESEND_API_KEY`
- `SANITY_REVALIDATE_SECRET`

---

## 🛠️ How to Update Environment Variables

### Via Vercel Dashboard (Simple Values)

1. Go to https://vercel.com/dashboard
2. Select `greenstarwebsiteupgrade` project
3. Go to **Settings** → **Environment Variables**
4. Find the variable and click **Edit**
5. Update the value
6. Select environments (Production, Preview, Development)
7. Click **Save**
8. **Important:** Redeploy for changes to take effect

### Via Vercel CLI (Complex Values)

**Best for:** Multi-line values like `GOOGLE_PRIVATE_KEY`

```bash
# Add new variable
echo "value" | vercel env add VARIABLE_NAME production

# Remove existing variable
vercel env rm VARIABLE_NAME production

# List all variables
vercel env ls
```

**Example: Setting Google Private Key**
```bash
cat google_service_account.json | \
  python3 -c "import sys, json; data = json.load(sys.stdin); print(data['private_key'], end='')" | \
  vercel env add GOOGLE_PRIVATE_KEY production
```

---

## 🔄 Redeployment After Changes

**Method 1: Automatic**
- Push any commit to GitHub `main` branch
- Vercel auto-deploys with new environment variables

**Method 2: Manual (Dashboard)**
1. Go to **Deployments** tab in Vercel
2. Click latest deployment
3. Click **...** menu → **Redeploy**

**Method 3: Manual (CLI)**
```bash
vercel --prod
```

---

## ✅ Verification Checklist

Use this to verify all environment variables are set correctly:

### Google Sheets
- [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL` is set
- [ ] `GOOGLE_PRIVATE_KEY` is set (with actual newlines)
- [ ] Sheet is shared with service account email
- [ ] Test endpoint works: `/api/test-sheets`
- [ ] Form submission creates new row in sheet

### Sophie Chat (Claude)
- [ ] `CLAUDE_CODE_OAUTH_TOKEN` is set (Max setup-token)
- [ ] `SOPHIE_PREVIEW_SECRET` is set (matches the Sol dashboard)
- [ ] `GREENSTAR_SUPABASE_URL` / `GREENSTAR_SUPABASE_SERVICE_KEY` are set
- [ ] Chat widget appears on homepage
- [ ] Can start a conversation with Sophie

### Sanity CMS
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- [ ] `NEXT_PUBLIC_SANITY_DATASET` is set to `production`
- [ ] `SANITY_API_WRITE_TOKEN` is set
- [ ] `SANITY_API_READ_TOKEN` is set
- [ ] `SANITY_REVALIDATE_SECRET` is set
- [ ] Can access Studio at `/studio`
- [ ] Form submissions appear in Sanity

### Email Notifications
- [ ] `RESEND_API_KEY` is set
- [ ] Email settings configured in Sanity Studio
- [ ] `enableNotifications` is true
- [ ] Recipient emails are added
- [ ] Test form submission sends email

### General
- [ ] `NEXT_PUBLIC_SITE_URL` matches production URL
- [ ] All variables set for Production, Preview, Development
- [ ] Site redeployed after variable changes
- [ ] No errors in Vercel logs

---

## 🐛 Troubleshooting

### Google Sheets: "DECODER routines::unsupported"
**Problem:** Private key format is incorrect

**Solution:**
1. Remove `GOOGLE_PRIVATE_KEY` variable
2. Re-add using Vercel CLI (not dashboard)
3. Ensure key has actual newlines, not `\n` strings
4. Redeploy

### Sophie: not replying
**Problem:** Missing/expired Claude token or Supabase creds

**Check:**
1. Verify `CLAUDE_CODE_OAUTH_TOKEN` is set and not expired (regenerate with `claude setup-token`)
2. Verify `GREENSTAR_SUPABASE_*` are set (config falls back to the baked-in prompt if not)
3. Check Vercel function logs for `/api/chat` errors
4. Redeploy after changing variables

### Email: Not sending
**Problem:** Resend API key or email settings

**Check:**
1. `RESEND_API_KEY` is set in Vercel
2. Email settings configured in Sanity Studio
3. `enableNotifications` toggle is ON
4. Recipient emails are valid
5. Check Vercel logs for specific error

### Sanity: Can't save forms
**Problem:** Write token missing or invalid

**Check:**
1. `SANITY_API_WRITE_TOKEN` is set
2. Token has write permissions for `formSubmission` schema
3. Check Vercel logs for authentication errors

---

## 📞 Support

**If you need to regenerate any keys:**

- **Google Service Account:** Google Cloud Console
- **Claude (Sophie) token:** run `claude setup-token`
- **Sanity Tokens:** Sanity.io Management Console
- **Resend API Key:** Resend Dashboard

**Developer Contact:**
Oliver Tatler - oliver@otdm.net - +44 151 541 6933

---

**Last Audit:** October 31, 2025
**Status:** ✅ All systems operational
