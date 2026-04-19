import "./index.css";
import HeroSection from "./components/heroSection/HeroSection";
import Navbar from "./components/navbar/Navbar";
import NewsLetter from "./components/newsLetter/NewsLetter";
import MoviesSection from "./components/moviesSection/MoviesSection";
import Footer from "./components/footer/footer";
function App() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className="container">
        <HeroSection />
        <MoviesSection />
        <NewsLetter />
      </main>
      <Footer />
    </>
  );
}

export default App;
