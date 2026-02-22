import BadgeShield from './BadgeShield'
import { getEarnedBadges } from '../utils/badgeUtils'

/**
 * Displays earned badges based on user score
 * @param {{ score: number | null, size?: 'sm'|'md'|'lg', maxVisible?: number, showAll?: boolean }} props
 */
export default function BadgeDisplay({ score, size = 'sm', maxVisible = 5, showAll = false }) {
  const earned = getEarnedBadges(score ?? 0)
  const toShow = showAll ? earned : earned.slice(-maxVisible)

  if (earned.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 justify-center items-end">
      {toShow.map((b) => (
        <BadgeShield
          key={b.index}
          color={b.color}
          glow={b.glow}
          iconIndex={b.index}
          threshold={b.threshold}
          size={size}
          earned
        />
      ))}
    </div>
  )
}
