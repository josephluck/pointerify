import IEventBinding from './Interfaces/IEventBinding';
declare class EventBinding implements IEventBinding {
    type: string;
    target: HTMLElement;
    debounce: number;
    handler: EventListener;
    passive: boolean;
    constructor(eventBindingRaw: IEventBinding | string);
    unbind(): void;
}
export default EventBinding;
