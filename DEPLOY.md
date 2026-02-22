# GitHub සහ Firebase Hosting

## 1. GitHub ට Push කිරීම

### Repo එක create කරලා නැත්නම්:
1. [GitHub](https://github.com/new) එකට ගිහින් නව repository එකක් create කරන්න
2. Repo name එක දාන්න (උදා: `sipyaya-webapp` හෝ `zshool`)

### Remote add කරලා push කරන්න:

```bash
# ඔබේ GitHub repo URL එක දාන්න (උදාහරණයක්)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push කරන්න
git push -u origin main
```

## 2. Firebase Hosting

### පළමු වතාවට:
1. [Firebase Console](https://console.firebase.google.com) එකට ගිහින් project එකක් create කරන්න
2. Firebase CLI install කරන්න: `npm install -g firebase-tools`
3. Login: `firebase login`
4. `.firebaserc` එකේ `YOUR_FIREBASE_PROJECT_ID` තැන ඔබේ project ID එක දාන්න

### Deploy කරන්න:

```bash
npm run deploy
```

හෝ:

```bash
npm run build
firebase deploy
```

Deploy වෙලා ඉවර වුණාම Firebase ඔබට hosting URL එක දෙයි (උදා: `https://your-project.web.app`).
