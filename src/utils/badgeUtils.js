import { BADGE_DEFINITIONS, BADGE_THRESHOLD_START, BADGE_THRESHOLD_STEP } from '../data/badgeData'

/**
 * Get badges earned based on current score.
 * ලකුණු අඩුවේ නම් බැජ් පහත හෙලනු ලැබේ.
 * @param {number} score - User's total score
 * @returns {Array<{index: number, threshold: number, ...badge}>} Earned badges
 */
export function getEarnedBadges(score) {
  if (score == null || score < BADGE_THRESHOLD_START) return []

  const earned = []
  for (let i = 0; i < BADGE_DEFINITIONS.length; i++) {
    const threshold = BADGE_THRESHOLD_START + i * BADGE_THRESHOLD_STEP
    if (score >= threshold) {
      earned.push({
        index: i,
        threshold,
        ...BADGE_DEFINITIONS[i],
      })
    } else {
      break
    }
  }
  return earned
}

/**
 * Get the first badge to display in header (first earned, or next to unlock if none, or last if all earned).
 * @param {number} score - User's total score
 * @returns {{index: number, threshold: number, earned: boolean, ...badge} | null}
 */
export function getFirstDisplayBadge(score) {
  if (score == null) return null
  const earned = getEarnedBadges(score)
  if (earned.length > 0) return { ...earned[0], earned: true }
  const next = getNextBadge(score)
  return next ? { ...next, earned: false } : null
}

/**
 * Get next badge to unlock.
 * @param {number} score - User's total score
 * @returns {{index: number, threshold: number, ...badge} | null}
 */
export function getNextBadge(score) {
  if (score == null) return null
  for (let i = 0; i < BADGE_DEFINITIONS.length; i++) {
    const threshold = BADGE_THRESHOLD_START + i * BADGE_THRESHOLD_STEP
    if (score < threshold) {
      return { index: i, threshold, ...BADGE_DEFINITIONS[i] }
    }
  }
  return null
}
