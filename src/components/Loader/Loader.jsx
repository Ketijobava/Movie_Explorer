import { motion } from 'framer-motion';
import './Loader.scss';

const Loader = ({ variant = 'spinner' }) => {
  if (variant === 'skeleton') {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="skeleton-card"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="loader">
      <motion.div
        className="loader__spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default Loader;
