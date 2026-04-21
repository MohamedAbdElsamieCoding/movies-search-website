import HeroSection from "../components/home/heroSection/HeroSection";
import MoviesSection from "../components/home/moviesSection/MoviesSection";
import NewsLetter from "../components/home/newsLetter/NewsLetter";

function HomePage() {
  return (
    <>
      <main className="container">
        <HeroSection />
        <MoviesSection />
        <NewsLetter />
      </main>
    </>
  );
}

export default HomePage;
