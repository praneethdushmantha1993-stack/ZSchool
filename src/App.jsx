import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import ChaptersList from './pages/ChaptersList'
import ChapterLesson from './pages/ChapterLesson'
import ExercisePage from './pages/ExercisePage'
import Topics from './pages/Topics'
import Lesson from './pages/Lesson'
import Login from './pages/Login'
import Achievements from './pages/Achievements'
import Leaderboard from './pages/Leaderboard'

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chapters" element={<ChaptersList />} />
          <Route path="chapter/:chapterNum" element={<ChapterLesson />} />
          <Route path="chapter/:chapterNum/exercise/:exerciseId" element={<ExercisePage />} />
          <Route path="topics" element={<Topics />} />
          <Route path="lesson/:topicId/:lessonId" element={<Lesson />} />
          <Route path="login" element={<Login />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App
