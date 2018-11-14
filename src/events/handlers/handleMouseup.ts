import Pointerify from "../../pointerify/pointerify";

const handleMouseup = (pointerify: Pointerify, e: MouseEvent): void => {
  if (!pointerify.mouse) return;

  pointerify.releasePointer(pointerify.mouse, e);

  e.preventDefault();
};

export default handleMouseup;
