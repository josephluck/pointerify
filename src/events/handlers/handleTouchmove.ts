import Pointer from "../../pointer/pointer";
import Pointerify from "../../pointerify/pointerify";

const handleTouchmove = (pointerify: Pointerify, e: TouchEvent): void => {
  if (pointerify.totalTouches < 1) return;

  for (let i = 0, touch; (touch = e.changedTouches[i]); i++) {
    const id = touch.identifier;

    let pointer = null;

    if (
      !((pointer = pointerify.touches[id]) instanceof Pointer) ||
      pointer.isStopping
    )
      break;

    pointerify.movePointer(pointer, touch, e);
  }
};

export default handleTouchmove;
