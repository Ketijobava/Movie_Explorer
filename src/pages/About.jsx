import { motion } from 'framer-motion';
import { FaFilm, FaReact, FaPalette, FaGlobe, FaHeart } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/translations';
import './About.scss';

const About = () => {
  const { language } = useLanguage();

  const features = [
    { icon: FaFilm, label: 'TMDB API' },
    { icon: FaReact, label: 'React + Vite' },
    { icon: FaPalette, label: 'Dark / Light' },
    { icon: FaGlobe, label: 'EN / KA' },
    { icon: FaHeart, label: 'Favorites' },
  ];

  return (
    <motion.div
      className="page about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container about-page__inner">
        <h1>{t(language, 'aboutTitle')}</h1>
        <p className="about-page__text">{t(language, 'aboutText')}</p>

        <div className="about-page__features">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="about-page__feature">
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="about-page__tech">
          <h2>Tech Stack</h2>
          <ul>
            <li>React (Hooks: useState, useEffect, useContext)</li>
            <li>React Router DOM</li>
            <li>Axios — TMDB API</li>
            <li>Framer Motion — Animations</li>
            <li>SCSS / Sass</li>
            <li>React Icons & React Hot Toast</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
