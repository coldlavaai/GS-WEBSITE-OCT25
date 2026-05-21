import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Systems from '@/components/Systems';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <Navigation />
      <Hero />
      <About />
      <Systems />
      <Process />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </PageWrapper>
  );
}
