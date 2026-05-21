[![Repo visits](https://hits.sh/github.com/Manikeshmk/All_Languages_Used.svg?label=repo%20visits)](https://hits.sh/github.com/Manikeshmk/All_Languages_Used/)
![GitHub stars](https://img.shields.io/github/stars/Manikeshmk/All_Languages_Used?style=logo&logo=github&label=⭐%20Stars) ![GitHub forks](https://img.shields.io/github/forks/Manikeshmk/All_Languages_Used?style=social)
# All Languages Used

Display all programming languages used across your GitHub repositories in a beautiful SVG widget.

## ✨ Why This Project Matters

**Showcase Your Technical Expertise**

- Display ALL programming languages you've ever used - not just the popular ones
- Help recruiters quickly understand your technical breadth and depth
- Stand out from other developers with a professional portfolio widget
- Automatically updated as you create new repositories with different languages
- One-line setup - no complicated configuration needed

**Perfect For:**

- GitHub profiles
- Developer portfolios
- README files
- Blogging platforms
- Personal websites

## 🚀 Quick Start - How to Use in Your README

### Step 1: Copy This Code

Add this single line to your GitHub profile README:

```markdown
## 🛠️ Languages & Technologies

![All Languages](https://all-languages-used.vercel.app/api/languages?username=YOUR_GITHUB_USERNAME)
```
### Step 2: Replace Your Username

Change `YOUR_GITHUB_USERNAME` to your actual GitHub username

### Example:

```markdown
![All Languages](https://all-languages-used.vercel.app/api/languages?username=manikeshmk)
```

![All Languages](https://all-languages-used.vercel.app/api/languages?username=manikeshmk)
### Step 3: That's It!

Your widget will appear in your README and automatically update as you add new projects

---

## 📖 Usage Examples

### Basic (Dark Theme - Default)

```markdown
![All Languages](https://all-languages-used.vercel.app/api/languages?username=octocat)
```

### Light Theme

```markdown
![All Languages](https://all-languages-used.vercel.app/api/languages?username=octocat&theme=light)
```

### Compact View with 6 Columns

```markdown
![All Languages](https://all-languages-used.vercel.app/api/languages?username=octocat&compact=true&columns=6)
```

### Exclude Specific Languages

```markdown
![All Languages](https://all-languages-used.vercel.app/api/languages?username=octocat&exclude=html,css,json)
```

### Custom Title

```markdown
![My Tech Stack](https://all-languages-used.vercel.app/api/languages?username=octocat&title=My%20Tech%20Stack)
```

### JSON API (for developers)

```
https://all-languages-used.vercel.app/api/languages-json?username=octocat
```

---

## 🎯 Features

- ✅ Shows ALL languages (even 1-line code)
- ✅ Beautiful GitHub-style SVG widget
- ✅ Dark & light themes
- ✅ Fully customizable (columns, title, filters)
- ✅ JSON API available
- ✅ Exclude specific languages
- ✅ Include/exclude private & archived repos
- ✅ Automatic language color detection

## 🔧 API Parameters

| Parameter          | Type    | Default              | Description                            |
| ------------------ | ------- | -------------------- | -------------------------------------- |
| `username`         | string  | required             | Your GitHub username                   |
| `theme`            | string  | `dark`               | `light` or `dark`                      |
| `columns`          | number  | `4`                  | Number of columns (1-6)                |
| `compact`          | boolean | `false`              | Compact view mode                      |
| `title`            | string  | `All Languages Used` | Custom widget title                    |
| `exclude`          | string  | -                    | Languages to exclude (comma-separated) |
| `include_private`  | boolean | `false`              | Include private repositories           |
| `include_archived` | boolean | `false`              | Include archived repositories          |

---

## 🤝 Contributing

We'd love your help! Here's how to contribute:

### Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/All_Languages_Used.git
   cd All_Languages_Used
   ```

### Making Changes

1. **Create** a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make** your changes
3. **Test** locally:
   ```bash
   npm run dev
   ```
4. **Commit** your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
5. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create** a Pull Request on GitHub

### Areas We Need Help With

- [ ] New color themes
- [ ] Additional language color mappings
- [ ] Performance optimizations
- [ ] Bug fixes
- [ ] Documentation improvements
- [ ] New customization options
- [ ] Tests & test coverage
- [ ] Accessibility improvements

### Contribution Guidelines

- Keep code clean and well-documented
- Follow existing code style
- Test your changes before submitting
- Write clear commit messages
- Update README if adding new features

---

## 💻 Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
git clone https://github.com/Manikeshmk/All_Languages_Used
cd All_Languages_Used
npm install
npm run dev
```

Visit `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

---

## ⭐ Star This Project!

If this project helped you showcase your skills, please give it a **star** ⭐ on GitHub!

**⭐ [Star on GitHub](https://github.com/Manikeshmk/All_Languages_Used)**

Stars help the project grow and reach more developers who need it!

---

## 🏗️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Vercel** - Hosting & deployment
- **GitHub API** - Data source
- **SVG** - Widget rendering

## 📝 License

MIT License - See [LICENSE](LICENSE) for details

## 👨‍💻 Author

Build with ❤️ by [Manikesh Kumar](https://github.com/Manikeshmk)

---

**Questions or Issues?** Open an issue on [GitHub Issues](https://github.com/Manikeshmk/All_Languages_Used/issues)
