export const modalVariant = {
  hidden: { opacity: 0, scale: 0.92, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.3 } }
};

export const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const popSmall = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

export const confettiFall = (x = 0, rotate = 360, delay = 0) => ({
  hidden: { y: -40, x, rotate: 0, opacity: 0 },
  visible: { y: 700, rotate, opacity: 1, transition: { duration: 2 + Math.random(), delay } }
});
