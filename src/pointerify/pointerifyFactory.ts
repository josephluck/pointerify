import IConfig from "../config/interfaces/IConfig";
import PointerifyFacade from "./pointerifyFacade";

function pointerifyFactory(
  root: HTMLElement,
  config: IConfig = {}
): PointerifyFacade {
  if (!(root instanceof HTMLElement)) {
    throw new TypeError("[Pointerify] Invalid element provided");
  }

  return new PointerifyFacade(root, config);
}

export default pointerifyFactory;
