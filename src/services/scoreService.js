import { doc, getDoc, setDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase/config'

/**
 * Save exercise score to Firestore — අනුමාතෘකාවකට උපරිම ලකුණු සුරකිනු ලැබේ
 * Scoring: +10 per correct, -2 per wrong, +time bonus (max 500)
 * @param {string} userId - Firebase Auth user ID
 * @param {string} chapterNum - Chapter number
 * @param {string} exerciseId - Exercise ID
 * @param {object} scoreData - { correctCount, wrongCount, totalCount, bonusPoints, points }
 * @param {string} [subtopicTitle] - අනුමාතෘකා මාතෘකාව
 * @param {string} [displayName] - Leaderboard සඳහා පරිශීලක නාමය
 */
export async function saveExerciseScore(userId, chapterNum, exerciseId, { correctCount, wrongCount, totalCount, bonusPoints, points }, subtopicTitle, displayName) {
  const scoreKey = `${chapterNum}_${exerciseId}`
  const scoreRef = doc(db, 'users', userId, 'scores', scoreKey)
  const userRef = doc(db, 'users', userId)
  const leaderboardRef = doc(db, 'leaderboard', userId)

  const data = {
    chapterNum,
    exerciseId,
    subtopicTitle: subtopicTitle || exerciseId,
    correctCount,
    wrongCount,
    totalCount,
    bonusPoints,
    points,
    timestamp: new Date().toISOString(),
  }

  const prevScoreSnap = await getDoc(scoreRef)
  const previousPoints = prevScoreSnap.exists() ? prevScoreSnap.data().points || 0 : 0
  const newPoints = Math.max(points, previousPoints)

  await setDoc(scoreRef, { ...data, points: newPoints }, { merge: true })

  const scoresSnap = await getDocs(collection(db, 'users', userId, 'scores'))
  const newTotal = scoresSnap.docs.reduce((sum, d) => sum + (d.data().points || 0), 0)

  await setDoc(
    userRef,
    {
      totalScore: newTotal,
      displayName: displayName || null,
      lastUpdated: new Date().toISOString(),
    },
    { merge: true }
  )

  await setDoc(
    leaderboardRef,
    {
      userId,
      displayName: displayName || 'පරිශීලකයා',
      totalScore: newTotal,
      lastUpdated: new Date().toISOString(),
    },
    { merge: true }
  )

  return newTotal
}

/**
 * Update user display name in Firestore (users + leaderboard)
 * @param {string} userId - Firebase Auth user ID
 * @param {string} displayName - පරිශීලක නාමය
 */
export async function updateUserDisplayName(userId, displayName) {
  if (!displayName?.trim()) return
  const userRef = doc(db, 'users', userId)
  const leaderboardRef = doc(db, 'leaderboard', userId)
  const now = new Date().toISOString()
  const name = displayName.trim()

  await setDoc(userRef, { displayName: name, lastUpdated: now }, { merge: true })

  const userSnap = await getDoc(userRef)
  const totalScore = userSnap.exists() ? userSnap.data().totalScore || 0 : 0
  await setDoc(
    leaderboardRef,
    { userId, displayName: name, totalScore, lastUpdated: now },
    { merge: true }
  )
}

/**
 * Get user's total score from Firestore
 */
export async function getUserTotalScore(userId) {
  const userRef = doc(db, 'users', userId)
  const snap = await getDoc(userRef)
  return snap.exists() ? snap.data().totalScore || 0 : 0
}

/**
 * Get user's scores per subtopic (අනුමාතෘකාවකට ලබා ගත් ලකුණු)
 */
export async function getUserSubtopicScores(userId) {
  const scoresRef = collection(db, 'users', userId, 'scores')
  const snap = await getDocs(scoresRef)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/**
 * Get global leaderboard — සියලු පරිශීලකයන් ලකුණු අනුව
 */
export async function getLeaderboard(limitCount = 50) {
  const q = query(
    collection(db, 'leaderboard'),
    orderBy('totalScore', 'desc'),
    limit(limitCount)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d, i) => ({ rank: i + 1, id: d.id, ...d.data() }))
}
