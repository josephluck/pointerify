import Pointerify from "../../pointerify/pointerify";
import EventType from "../../shared/constants/eventType";
import closestParent from "../../shared/util/closestParent";

function handleMousemove(pointerify: Pointerify, e: MouseEvent): void {
  const { mouse } = pointerify;
  const { target }: any = e;
  const isWithinRoot = Boolean(
    closestParent(target, pointerify.refs.root, true)
  );

  if (mouse && !mouse.isStopping) {
    pointerify.movePointer(mouse, e, e);
  } else if (!mouse && isWithinRoot) {
    pointerify.emitStatic(e, EventType.POINTER_INSPECT);
  }
}

export default handleMousemove;
