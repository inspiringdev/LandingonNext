import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Menu from "../components/Menu";
import Story from "../components/Story";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Menu />
        <Process />
        <Story />
        <Testimonials />
        <Footer />
      </main>
  );
}