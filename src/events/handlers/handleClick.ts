import Pointerify from "../../pointerify/pointerify";

const handleClick = (pointerify: Pointerify, e: MouseEvent): void => {
  if (pointerify.isClicking) return;

  e.preventDefault();
  e.stopPropagation();
};

export default handleClick;
