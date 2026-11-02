# Deploying LifestyleHub to GitHub Pages with Zoho Custom Domain (`lifestylehub.com`)

## 1. Quick Summary
- **Hosting Cost**: **$0.00 (100% Free)**. GitHub Pages hosts your PWA for free with unlimited bandwidth.
- **SSL Certificate**: **$0.00 (100% Free)**. GitHub automatically generates and renews a free Let's Encrypt SSL certificate for `lifestylehub.com`.
- **Zoho Domains**: Connecting your domain DNS records from Zoho to GitHub Pages is completely free.

---

## 2. Step-by-Step GitHub Setup

### Step A: Push to GitHub
1. Create a repository on GitHub (e.g. named `lifestylehub` or `lifestylehub.github.io`).
2. Run in terminal:
```bash
git init
git add .
git commit -m "Deploy LifestyleHub PWA"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/lifestylehub.git
git push -u origin main
```

### Step B: Build & Deploy
If using GitHub Actions (recommended):
1. In your GitHub repository, go to **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Choose the standard **Static HTML** or **Vite** action, or build locally:
```bash
npm run build
```
Upload the `dist/` folder contents to your `gh-pages` branch.

---

## 3. Step-by-Step Zoho Domains DNS Setup for `lifestylehub.com`

Log into your **Zoho Domains / Zoho DNS Manager** dashboard and add the following 5 DNS records:

### 1) Four A Records (Apex Domain `@` -> GitHub Pages IPs):
| Type | Name / Host | Value / Points to | TTL |
|------|-------------|-------------------|-----|
| **A** | `@` | `185.199.108.153` | 3600 (or 1 Hour) |
| **A** | `@` | `185.199.109.153` | 3600 (or 1 Hour) |
| **A** | `@` | `185.199.110.153` | 3600 (or 1 Hour) |
| **A** | `@` | `185.199.111.153` | 3600 (or 1 Hour) |

### 2) One CNAME Record (Subdomain `www` -> GitHub Pages URL):
| Type | Name / Host | Value / Points to | TTL |
|------|-------------|-------------------|-----|
| **CNAME** | `www` | `lifestylehub.github.io.` | 3600 |

*(Note: If Zoho asks for trailing dot, use `lifestylehub.github.io.`; otherwise `lifestylehub.github.io`)*

---

## 4. Activate Custom Domain in GitHub Pages
1. In your GitHub repository, navigate to **Settings** -> **Pages**.
2. In the **Custom domain** box, enter:
   ```
   lifestylehub.com
   ```
3. Click **Save**. GitHub will automatically check the DNS records from Zoho.
4. Once DNS check passes (usually takes 5–15 minutes), check the box:
   `☑ Enforce HTTPS`
5. That's it! Your site will now be live securely at `https://lifestylehub.com`!
