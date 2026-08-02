const purelaneMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function purelaneUpdateMotionState() {
  const motionEnabled = document.documentElement.dataset.purelaneMotion !== 'off' && !purelaneMotionQuery.matches;
  document.documentElement.dataset.purelaneReducedMotion = String(!motionEnabled);
  document.dispatchEvent(new CustomEvent('purelane:motion-change', { detail: { enabled: motionEnabled } }));
}

purelaneMotionQuery.addEventListener('change', purelaneUpdateMotionState);
document.addEventListener('DOMContentLoaded', purelaneUpdateMotionState, { once: true });
