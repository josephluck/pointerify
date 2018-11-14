import Pointerify from "../pointerify/pointerify";
import IEventBinding from "./interfaces/eventBinding";
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
