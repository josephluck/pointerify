import EventBinding from "./eventBinding";
import IEventBinding from "./interfaces/eventBinding";
declare function bindEvent(context: any, defaultTarget: HTMLElement, eventBindingRaw: string | IEventBinding): EventBinding;
export default bindEvent;
