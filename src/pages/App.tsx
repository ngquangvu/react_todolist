import Footer from '@/components/templates/Footer'
import Header from '@/components/templates/Header'
import Main from '@/pages/Main'
import '@/styles/App.css'

function App() {
  return (
    <>
      <Header />
      <main className="flex justify-center items-center w-full h-full min-h-full p-14">
        <Main />
      </main>
      <Footer />
    </>
  )
}

export default App
