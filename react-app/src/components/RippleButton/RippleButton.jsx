import React, { useRef, useEffect } from 'react';
import './RippleButton.css';

function RippleButton({ onClick, children, className }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mousedown', createRipple);
    }
    return () => {
      if (button) {
        button.removeEventListener('mousedown', createRipple);
      }
    };
  }, []);

  const createRipple = (event) => {
    const button = buttonRef.current;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${button.clientWidth / 2 - radius}px`;
    circle.style.top = `${button.clientHeight / 2 - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <button className={`ripple-button ${className}`} ref={buttonRef} onClick={onClick}>
      {children}
    </button>
  );
}

export default RippleButton;
