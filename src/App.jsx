import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Techstacks from './components/Techstacks';
import Timeline from './components/Timeline';
import FeaturedProject from './components/FeaturedProject';
import QAProject from './components/QAProject';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ScrollExtras from './components/ScrollExtras';
import Turntable from './components/Turntable';



const App = () => {
    return (
        <div className="text-lab-ink antialiased">

            <ScrollExtras />
            <Turntable />
            <Navbar />

            <div className="mx-auto max-w-[calc(72rem+1.5rem)] px-3">
                <section id="home" className="scroll-mt-24"><Hero /></section>
                <section id="about" className="scroll-mt-24"><About /></section>
                <section id="stack" className="scroll-mt-24"><Techstacks /></section>
                <section id="timeline" className="scroll-mt-24"><Timeline /></section>
                <section id="projects" className="scroll-mt-24">
                    <FeaturedProject />
                    <QAProject />
                    <Projects />
                </section>
                <section id="contact" className="scroll-mt-24"><Contact /></section>
            </div>
        </div>
    );
};

export default App;
