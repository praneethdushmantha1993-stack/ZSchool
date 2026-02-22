import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function MathBlock({ value }) {
  return (
    <div className="my-4 p-6 bg-gradient-to-br from-sipyaya-50/80 to-emerald-50/50 rounded-2xl border border-sipyaya-200/60 overflow-x-auto shadow-inner">
      <BlockMath math={value} />
    </div>
  )
}
