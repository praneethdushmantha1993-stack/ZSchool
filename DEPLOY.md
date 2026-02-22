# GitHub සහ Firebase Hosting

## 1. GitHub ට Push කිරීම

### Repo එක create කරලා නැත්නම්:
1. [GitHub](https://github.com/new) එකට ගිහින් නව repository එකක් create කරන්න
2. Repo name එක දාන්න (උදා: `sipyaya-webapp` හෝ `zshool`)

### Remote add කරලා push කරන්න:

```bash
# 1. GitHub එකේ නව repo එකක් create කරන්න (https://github.com/new)
# 2. ඔබේ repo URL එක දාන්න:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 3. Push කරන්න
git push -u origin main
```

## 2. Firebase Hosting + Auth + Firestore

### පළමු වතාවට:
1. [Firebase Console](https://console.firebase.google.com) එකට ගිහින් project එකක් create කරන්න
2. Firebase CLI install කරන්න: `npm install -g firebase-tools`
3. Login: `firebase login`
4. `.firebaserc` එකේ ඔබේ project ID එක දාන්න

### Login සහ ලකුණු සුරැකීම සඳහා:
1. Firebase Console එකේ **Authentication** > **Sign-in method** > **Email/Password** enable කරන්න
2. **Firestore Database** create කරන්න (production mode)
3. Project Settings > General > Your apps > Web app එකේ config අගයන් copy කරන්න
4. `.env.example` එක copy කරලා `.env` එකක් සාදා, අගයන් පුරවන්න

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

## 3. GitHub Push කළ විට Auto Deploy

`main` branch එකට push කළ විට ස්වයංක්‍රීයව Firebase Hosting එකට deploy වේ.

### පළමු වතාවට සැකසීම:

1. **Terminal එකේ project folder එකෙන් run කරන්න:**
   ```bash
   firebase init hosting:github
   ```

2. **CLI එක ඔබව මඟ පෙන්වයි:**
   - GitHub repo එක connect කරන්න
   - Firebase service account එක ස්වයංක්‍රීයව `FIREBASE_SERVICE_ACCOUNT` secret ලෙස add වේ

3. **හෝ අතින් සැකසීම:**
   - [Firebase Console](https://console.firebase.google.com) → Project Settings → Service accounts
   - "Generate new private key" ක්ලික් කරන්න
   - [GitHub](https://github.com/YOUR_USERNAME/ZSchool/settings/secrets/actions) → Settings → Secrets and variables → Actions
   - "New repository secret" → Name: `FIREBASE_SERVICE_ACCOUNT`, Value: downloaded JSON file එකේ content එක paste කරන්න

4. **Workflow එක push කරන්න:**
   ```bash
   git add .github/workflows/firebase-deploy.yml
   git commit -m "Add GitHub Actions for auto deploy"
   git push origin main
   ```

ඊට පස්සේ `main` එකට push කළ සෑම විටම Firebase Hosting එකට ස්වයංක්‍රීයව deploy වේ.
