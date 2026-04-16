import HeroSection from "./components/heroSection/HeroSection";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className="container">
        <HeroSection />
      </main>
    </>
  );
}

export default App;
