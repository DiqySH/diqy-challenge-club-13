import './App.css'
import './index.css'
import Board from './Board'
import Title from './Title'

export default function App() {
  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center gap-8'>
      <Title/>
      <Board/>
    </main>
  )
}