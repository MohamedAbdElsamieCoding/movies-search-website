import HeroSection from "./components/heroSection/HeroSection";
import Navbar from "./components/navbar/Navbar";
import MoviesSection from "./components/moviesSection/moviesSection";
import "./index.css"
function App() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className="container">
        <HeroSection />
        <MoviesSection />
      </main>
    </>
  );
}

export default App;
