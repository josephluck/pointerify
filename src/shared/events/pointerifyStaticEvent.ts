import PointerStateStatic from "../../pointer/pointerStateStatic";

const PointerifyStaticEvent = (CustomEvent as any) as CustomEvent<
  PointerStateStatic
>;

export default PointerifyStaticEvent;
