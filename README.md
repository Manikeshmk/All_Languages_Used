# 🌍 All Languages Used

Display **ALL** programming languages ever used across all your GitHub repositories in a beautiful, shareable widget.

![Badge](https://img.shields.io/badge/languages-50+-blue?style=flat-square)
![Badge](https://img.shields.io/badge/repos-unlimited-green?style=flat-square)
![Badge](https://img.shields.io/badge/status-production%20ready-success?style=flat-square)

---

## ✨ Features

- ✅ **Display ALL Languages** - Shows every language used, even if it's just 1 line of code
- ✅ **Beautiful SVG Widget** - GitHub-style design with dark/light themes
- ✅ **Zero Configuration** - Just add one line to your README
- ✅ **Fast & Cached** - HTTP caching with 12-hour TTL
- ✅ **Production Ready** - Deployed on Vercel, handles thousands of repos
- ✅ **Customizable** - Theme, columns, title, and more
- ✅ **JSON API** - Get data in JSON format
- ✅ **Privacy Options** - Include/exclude private and archived repos
- ✅ **Language Filtering** - Exclude specific languages
- ✅ **TypeScript** - Fully typed, production-grade code
- ✅ **Open Source** - MIT License

---

## 🚀 Quick Start

### Add to Your Profile README

```markdown
![All Languages](https://all-languages-used.vercel.app/api/languages?username=YOUR_GITHUB_USERNAME)
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### With Custom Theme

```markdown
![All Languages](https://all-languages-used.vercel.app/api/languages?username=YOUR_GITHUB_USERNAME&theme=light)
```

### Get JSON Data

```bash
curl "https://all-languages-used.vercel.app/api/languages-json?username=YOUR_GITHUB_USERNAME"
```

---

## 📋 API Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | required | GitHub username |
| `theme` | string | `dark` | `light` or `dark` |
| `columns` | number | `4` | Number of columns (1-6) |
| `compact` | boolean | `false` | Compact view mode |
| `title` | string | `All Languages Used` | Custom widget title |
| `exclude` | string | `` | Languages to exclude (comma-separated) |
| `include_private` | boolean | `false` | Include private repositories |
| `include_archived` | boolean | `false` | Include archived repositories |
| `format` | string | `svg` | `svg` or `json` |

### Examples

**Light theme:**
```
https://all-languages-used.vercel.app/api/languages?username=manikeshmk&theme=light
```

**Compact view with 6 columns:**
```
https://all-languages-used.vercel.app/api/languages?username=manikeshmk&compact=true&columns=6
```

**Exclude HTML and CSS:**
```
https://all-languages-used.vercel.app/api/languages?username=manikeshmk&exclude=html,css
```

**Include private repositories:**
```
https://all-languages-used.vercel.app/api/languages?username=manikeshmk&include_private=true
```

**JSON format:**
```
https://all-languages-used.vercel.app/api/languages-json?username=manikeshmk
```

---

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub Personal Access Token

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/all-languages-used.git
   cd all-languages-used
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Add your GitHub token:**
   - Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
   - Click "Generate new token"
   - Select scopes:
     - `public_repo` - Access public repositories
     - `read:user` - Read user information
   - Copy the token and add to `.env.local`:
     ```
     GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Test the API:**
   ```bash
   curl "http://localhost:3000/api/languages?username=torvalds"
   ```

---

## 📦 Deployment

### Deploy on Vercel (Recommended)

**Option 1: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Option 2: Using GitHub Integration**

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `GITHUB_TOKEN` = Your GitHub Personal Access Token
6. Click "Deploy"

### Configure Environment Variables on Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - Key: `GITHUB_TOKEN`
   - Value: Your GitHub Personal Access Token
4. Make sure it's available in "Production" environment

### Redeploy After Changes

```bash
vercel --prod
```

---

## 🔑 GitHub Personal Access Token Setup

### Creating a Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" (classic)
3. Give it a name like "All Languages Used"
4. Select scopes:
   ```
   ✓ public_repo
   ✓ read:user
   ```
5. Click "Generate token"
6. **Copy immediately** (you won't see it again)

### Security Notes

- ⚠️ Never commit tokens to git
- ⚠️ Use `.env.local` for local development
- ⚠️ Use Vercel Environment Variables for production
- ⚠️ Tokens can be revoked anytime in Settings
- ⚠️ Rotate tokens periodically (recommended: every 90 days)

### Rate Limits

- **With token:** 5,000 API calls per hour
- **Without token:** 60 API calls per hour

Using a token is **highly recommended** for reliable operation.

---

## 📸 Examples

### Light Theme
```
https://all-languages-used.vercel.app/api/languages?username=torvalds&theme=light
```

### Dark Theme (Default)
```
https://all-languages-used.vercel.app/api/languages?username=torvalds&theme=dark
```

### Compact Mode
```
https://all-languages-used.vercel.app/api/languages?username=torvalds&compact=true&columns=6
```

### Custom Title
```
https://all-languages-used.vercel.app/api/languages?username=torvalds&title=My%20Tech%20Stack
```

---

## 📖 Usage Examples

### GitHub Profile README

```markdown
## 🛠️ Languages & Technologies

![All Languages](https://all-languages-used.vercel.app/api/languages?username=manikeshmk&theme=dark)
```

### Markdown (Blog/Wiki)

```markdown
### My Programming Languages

[![Languages](https://all-languages-used.vercel.app/api/languages?username=manikeshmk)](https://github.com/manikeshmk)
```

### HTML

```html
<img src="https://all-languages-used.vercel.app/api/languages?username=manikeshmk" 
     alt="All Languages Used" />
```

### Different Themes

```markdown
#### Dark Theme
![Dark](https://all-languages-used.vercel.app/api/languages?username=manikeshmk&theme=dark)

#### Light Theme
![Light](https://all-languages-used.vercel.app/api/languages?username=manikeshmk&theme=light)
```

### Multiple Cards

```markdown
## Tech Stack

![Backend Languages](https://all-languages-used.vercel.app/api/languages?username=manikeshmk&title=Backend%20Stack)

![Frontend Languages](https://all-languages-used.vercel.app/api/languages?username=manikeshmk&title=Frontend%20Stack)
```

---

## 🏗️ Architecture

### Project Structure

```
all-languages-used/
├── api/
│   ├── languages.ts              # Main SVG endpoint
│   ├── languages-json.ts         # JSON endpoint
│   └── healthcheck.ts            # Health status
├── lib/
│   ├── github.ts                 # GitHub GraphQL integration
│   ├── cache.ts                  # Response caching
│   ├── svg-generator.ts          # SVG generation
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
├── .github/workflows/
│   ├── build.yml                 # Build verification
│   ├── deploy.yml                # Auto-deploy
│   └── lint.yml                  # Linting
├── vercel.json                   # Vercel configuration
├── package.json
├── tsconfig.json
└── README.md
```

### Data Flow

```
User Request
    ↓
[API Route] (/api/languages)
    ↓
[Cache Check] → Hit? → Return SVG (cached)
    ↓ Miss
[GitHub API] → Fetch all repos
    ↓
[Language Aggregation] → Collect all languages
    ↓
[SVG Generation] → Create beautiful image
    ↓
[Cache Store] → Save for future requests
    ↓
Return SVG to User
```

### Technology Stack

- **Runtime:** Node.js 18+ / Vercel Serverless
- **Language:** TypeScript
- **API:** GitHub GraphQL API v4
- **Rendering:** SVG with template strings
- **Caching:** HTTP headers + in-memory cache
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

---

## 🚦 Performance

### Caching Strategy

- **HTTP Cache:** 12 hours (`Cache-Control: public, max-age=43200`)
- **In-Memory Cache:** Reduces GitHub API calls
- **Request Batching:** 100 repositories per GraphQL query

### Optimization Tips

1. **Use persistent tokens** - Raises rate limit to 5,000/hour
2. **Cache aggressively** - 12-hour default TTL
3. **Batch requests** - GraphQL queries return 100 repos at once
4. **Filter repositories** - Exclude forks/archived to reduce load

### Benchmarks

- **Average response time:** < 1 second (cached)
- **First load time:** 3-5 seconds (depending on repo count)
- **Vercel cold start:** 1-2 seconds
- **GitHub API calls:** 1 per 100 repositories

---

## 🐛 Troubleshooting

### "User not found"
- Verify the username is correct
- Username is case-sensitive on GitHub

### "Invalid GitHub token"
- Check token is still valid in GitHub settings
- Token might have expired or been revoked
- Create a new token if needed

### No languages showing
- User might have 0 public repositories
- Try with `include_private=true` if you own the account
- Check if repositories have language information

### Rate limit exceeded
- Add a GitHub Personal Access Token
- Wait 1 hour for limit to reset
- Consider caching more aggressively

### Blank SVG returned
- Check browser console for errors
- Verify username with API: `/api/languages-json?username=USERNAME`
- Contact support with username

---

## 📊 JSON API Response

```json
{
  "username": "manikeshmk",
  "totalLanguages": 15,
  "totalRepositories": 42,
  "generatedAt": "2024-01-15T10:30:00Z",
  "cached": false,
  "languages": [
    {
      "name": "TypeScript",
      "count": 4521,
      "percentage": 45.2,
      "color": "#3178c6"
    },
    {
      "name": "JavaScript",
      "count": 3210,
      "percentage": 32.1,
      "color": "#f1e05a"
    },
    {
      "name": "Python",
      "count": 1250,
      "percentage": 12.5,
      "color": "#3572A5"
    }
  ]
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Areas for contribution:

- [ ] Additional language color mappings
- [ ] New theme options
- [ ] Performance optimizations
- [ ] Better error handling
- [ ] Documentation improvements
- [ ] Bug fixes

---

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

### License Summary

✅ Free to use commercially
✅ Free to modify
✅ Free to distribute
✅ Must include license notice

---

## 🙏 Acknowledgments

- Inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- Icons from [GitHub](https://github.com)
- Hosted on [Vercel](https://vercel.com)
- API by [GitHub GraphQL API](https://docs.github.com/graphql)

---

## 📧 Support

Have questions or issues? 

- 📝 Open an [Issue](https://github.com/YOUR_USERNAME/all-languages-used/issues)
- 💬 Start a [Discussion](https://github.com/YOUR_USERNAME/all-languages-used/discussions)
- 🐦 Tweet [@your_twitter](https://twitter.com)

---

## 🌟 Star History

If this project helped you, please consider giving it a ⭐

---

**Made with ❤️ by [Your Name](https://github.com/YOUR_USERNAME)**
