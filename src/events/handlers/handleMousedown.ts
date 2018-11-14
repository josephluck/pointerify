import Pointerify from "../../pointerify/pointerify";
import PointerType from "../../shared/constants/pointerType";
import closestParent from "../../shared/util/closestParent";

const handleMousedown = (pointerify: Pointerify, e: MouseEvent): void => {
  const target = e.target as HTMLElement;
  const handleSelector = pointerify.config.selectors.handle;

  let didCancel = false;

  if (e.button !== 0) return;

  if (pointerify.mouse) {
    pointerify.cancelPointer(pointerify.mouse);

    didCancel = true;
  }

  if (handleSelector && !closestParent(target, handleSelector, true)) return;

  pointerify.setRootGeometry();

  pointerify.mouse = pointerify.createPointer(e, PointerType.MOUSE, didCancel);

  e.preventDefault();
};

export default handleMousedown;
