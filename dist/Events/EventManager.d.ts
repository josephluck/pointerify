import Pointerify from '../Pointerify/Pointerify';
import IEventBinding from './Interfaces/IEventBinding';
declare class EventManager {
    private pointerify;
    private bindings;
    private handlers;
    constructor(pointerify: Pointerify);
    readonly root: HTMLElement;
    bindEvents(events: Array<string | IEventBinding>): void;
    unbindEvents(): void;
    private bindEvent(eventBindingRaw);
}
export default EventManager;
