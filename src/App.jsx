import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ChaptersList from './pages/ChaptersList'
import ChapterLesson from './pages/ChapterLesson'
import ExercisePage from './pages/ExercisePage'
import Topics from './pages/Topics'
import Lesson from './pages/Lesson'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chapters" element={<ChaptersList />} />
          <Route path="chapter/:chapterNum" element={<ChapterLesson />} />
          <Route path="chapter/:chapterNum/exercise/:exerciseId" element={<ExercisePage />} />
          <Route path="topics" element={<Topics />} />
          <Route path="lesson/:topicId/:lessonId" element={<Lesson />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
