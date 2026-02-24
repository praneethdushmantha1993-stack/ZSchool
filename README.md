# ZSchool — ගණිත ඉගෙනුම් වෙබ් යෙදුම

සිසුන් සඳහා ඉගෙනුම් සහ අභ්‍යාස සපයන වෙබ් යෙදුමකි. ගණිතය පහසුවෙන් ඉගෙන ගැනීමට සරල සහ රසවත් පාඩම්.

## විශේෂාංග

- **අංක ගණිතය** — එකතු කිරීම, අඩු කිරීම, ගුණ කිරීම, බෙදීම
- **වීජ ගණිතය** — විචල්‍ය, රේඛීය සමීකරණ
- **ජ්‍යාමිතිය** — හැඩ, පයිතගරස් ප්‍රමේයය
- **භාග** — භාග හැඳින්වීම සහ ගණනය කිරීම
- **O/L පෙළපොත** — පරිමිතිය, අභ්‍යාස සහ රූපසටහන්

සියලුම පාඩම් **සිංහල** භාෂාවෙන් ලියා ඇත. ගණිත සූත්‍ර KaTeX මගින් පැහැදිලිව පෙන්වයි.

## ආරම්භ කිරීම

```bash
npm install
npm run dev
```

වෙබ් යෙදුම http://localhost:5173 හි විවෘත වේ.

## ගොඩනැගීම

```bash
npm run build
```

## Deploy (Firebase Hosting)

### Local deploy
```bash
npm run deploy
```
(මුලින් `.env` එකේ Firebase config අගයන් සකසන්න — `.env.example` බලන්න)

### GitHub Actions (auto deploy)
`main` branch එකට push කළ විට ස්වයංක්‍රීයව deploy වේ. ක්‍රියාත්මක වීමට GitHub repo → Settings → Secrets and variables → Actions යටින් මෙම secrets එකතු කරන්න:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT` (Firebase Console → Project Settings → Service accounts → Generate new private key — JSON content එක)

## භාවිතා කළ තාක්ෂණ

- React 18 + Vite
- React Router
- Tailwind CSS
- KaTeX (ගණිත සූත්‍ර පෙන්වීමට)
