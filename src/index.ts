import PointerifyFacade from "./pointerify/pointerifyFacade";
import pointerifyFactory from "./pointerify/pointerifyFactory";
import Axis from "./shared/constants/axis";
import Direction from "./shared/constants/direction";
import EventType from "./shared/constants/eventType";
import * as Events from "./shared/events/";

const create = pointerifyFactory;

export {
  Axis,
  create,
  Direction,
  EventType,
  Events,
  PointerifyFacade as Pointerify,
  pointerifyFactory as default
};
