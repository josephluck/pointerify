import Pointer from "../../pointer/pointer";
import Pointerify from "../../pointerify/pointerify";

const handleTouchend = (pointerify: Pointerify, e: TouchEvent): void => {
  if (pointerify.totalTouches < 1) return;

  for (let i = 0, touch; (touch = e.changedTouches[i]); i++) {
    const id = touch.identifier;

    let pointer = null;

    if (!((pointer = pointerify.touches[id]) instanceof Pointer)) break;

    pointerify.releasePointer(pointer, touch);

    e.preventDefault();
  }
};

export default handleTouchend;
