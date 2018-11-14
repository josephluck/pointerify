import PointerStateDynamic from "../../pointer/pointerStateDynamic";

const PointerifyDynamicEvent = (CustomEvent as any) as CustomEvent<
  PointerStateDynamic
>;

export default PointerifyDynamicEvent;
