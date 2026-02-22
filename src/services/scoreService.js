import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

/**
 * Save exercise score to Firestore and update user's total score
 * Scoring: +10 per correct, -2 per wrong, +5 bonus for quick completion
 * @param {string} userId - Firebase Auth user ID
 * @param {string} chapterNum - Chapter number
 * @param {string} exerciseId - Exercise ID
 * @param {object} scoreData - { correctCount, wrongCount, totalCount, bonusPoints, points }
 */
export async function saveExerciseScore(userId, chapterNum, exerciseId, { correctCount, wrongCount, totalCount, bonusPoints, points }) {
  const scoreKey = `${chapterNum}_${exerciseId}`
  const scoreRef = doc(db, 'users', userId, 'scores', scoreKey)
  const userRef = doc(db, 'users', userId)

  const data = {
    chapterNum,
    exerciseId,
    correctCount,
    wrongCount,
    totalCount,
    bonusPoints,
    points,
    timestamp: new Date().toISOString(),
  }

  const prevScoreSnap = await getDoc(scoreRef)
  const previousPoints = prevScoreSnap.exists() ? prevScoreSnap.data().points || 0 : 0

  await setDoc(scoreRef, data, { merge: true })

  const userSnap = await getDoc(userRef)
  const currentTotal = userSnap.exists() ? userSnap.data().totalScore || 0 : 0
  const newTotal = Math.max(0, currentTotal - previousPoints + points)

  await setDoc(
    userRef,
    {
      totalScore: newTotal,
      lastUpdated: new Date().toISOString(),
    },
    { merge: true }
  )

  return newTotal
}

/**
 * Get user's total score from Firestore
 */
export async function getUserTotalScore(userId) {
  const userRef = doc(db, 'users', userId)
  const snap = await getDoc(userRef)
  return snap.exists() ? snap.data().totalScore || 0 : 0
}
