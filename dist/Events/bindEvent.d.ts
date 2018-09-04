import EventBinding from './EventBinding';
import IEventBinding from './Interfaces/IEventBinding';
declare function bindEvent(context: any, defaultTarget: HTMLElement, eventBindingRaw: (string | IEventBinding)): EventBinding;
export default bindEvent;
