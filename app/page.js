import CinematicIntro from "../components/CinematicIntro";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Expertise from "../components/Expertise";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main>
      <CinematicIntro />
      <Hero />
      <Marquee />
      <About />
      <Expertise />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
