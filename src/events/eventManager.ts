import Pointerify from "../pointerify/pointerify";
import debounce from "../shared/util/debounce";
import pascalCase from "../shared/util/pascalCase";
import EventBinding from "./eventBinding";
import * as handlers from "./handlers";
import IEventBinding from "./interfaces/eventBinding";
import IEventHandlersMap from "./interfaces/eventHandlersMap";

class EventManager {
  private pointerify: Pointerify = null;
  private bindings: EventBinding[] = [];
  private handlers: IEventHandlersMap = handlers;

  constructor(pointerify: Pointerify) {
    this.pointerify = pointerify;
  }

  public get root() {
    return this.pointerify.refs.root;
  }

  public bindEvents(events: Array<string | IEventBinding>): void {
    this.bindings = events.map(this.bindEvent.bind(this));
  }

  public unbindEvents(): void {
    this.bindings.forEach(binding => binding.unbind());
  }

  private bindEvent(eventBindingRaw: string | IEventBinding): EventBinding {
    const eventBinding = new EventBinding(eventBindingRaw);

    if (!eventBinding.target) eventBinding.target = this.root;

    const handlerName = `handle${pascalCase(eventBinding.type)}`;
    const handler = this.handlers[handlerName];

    if (typeof handler !== "function") {
      throw new TypeError(
        `[Pointerify] No "${handlerName}" handler method found for event type "${
          eventBinding.type
        }"`
      );
    }

    const boundHandler: EventListener = handler.bind(null, this.pointerify);

    eventBinding.handler =
      eventBinding.debounce <= 0
        ? boundHandler
        : debounce(boundHandler, eventBinding.debounce, true);

    eventBinding.target.addEventListener(
      eventBinding.type,
      eventBinding.handler,
      {
        passive: eventBinding.passive
      }
    );

    return eventBinding;
  }
}

export default EventManager;
