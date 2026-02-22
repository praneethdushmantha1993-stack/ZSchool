# Firestore සැකසීම

## 1. Firebase Console එකේ Firestore සක්‍රිය කිරීම

1. [Firebase Console](https://console.firebase.google.com) වෙත යන්න
2. ඔබේ project එක තෝරන්න
3. වම් පැත්තේ **Build** → **Firestore Database** යන්න
4. **Create database** ක්ලික් කරන්න
5. **Start in production mode** තෝරා **Next** ක්ලික් කරන්න
6. Location එක තෝරා (උදා: `asia-south1` ශ්‍රී ලංකාවට ආසන්න) **Enable** ක්ලික් කරන්න

## 2. Firestore Rules deploy කිරීම

Terminal එකේ project folder එකෙන්:

```bash
firebase login
firebase deploy --only firestore:rules
```

## 3. දත්ත ව්‍යුහය

ලකුණු සුරැකීමට භාවිතා වන structure:

```
users/
  {userId}/                    # Firebase Auth user ID
    totalScore: number         # මුළු ලකුණු
    lastUpdated: string        # ISO timestamp
    scores/                    # subcollection
      {chapterNum}_{exerciseId}/
        chapterNum: string
        exerciseId: string
        correctCount: number
        wrongCount: number
        totalCount: number
        bonusPoints: number
        points: number
        timestamp: string
```

## 4. ගැටළු නිරාකරණය

**ලකුණු පෙන්වන්නේ නැත්නම්:**
- පරිශීලකයා පිවිසී ඇත්දැයි පරීක්ෂා කරන්න (Login කර ඇතිද?)
- Browser console එකේ errors තිබේදැයි බලන්න (F12)
- Firebase Console → Firestore → Data ටැබ් එකෙන් දත්ත එනවාද බලන්න

**Rules deploy කිරීමෙන් පසු:**
- Firebase Console → Firestore → Rules ටැබ් එකෙන් යාවත්කාලීන rules පෙන්වේද බලන්න
