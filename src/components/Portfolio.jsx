import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Portfolio = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme.background, color: theme.foreground }}>
      <header className="navbar">
        <h1>ANISH KUMAR SINHA</h1>
        <nav>
          <ul>
            <li>About</li>
            <li>Resume</li>
            <li>Skills</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </nav>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </header>

      <section className="hero-section">
        <div className="intro">
          <p>Hello! <span role="img" aria-label="wave">👋</span></p>
          <h1>I’m <span className="highlight">Anish</span></h1>
          <p>UI/UX Designer, Front-End Developer & Thinker Based in India.</p>
          <button>Download CV</button>
          <button>Get in Touch</button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;