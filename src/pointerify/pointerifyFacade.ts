import IConfig from "../config/interfaces/IConfig";
import Pointerify from "./pointerify";

class PointerifyFacade {
  public configure: (options: IConfig) => void;
  public destroy: () => void;
  public refresh: () => void;

  constructor(root: HTMLElement, options: IConfig) {
    const pointerify = new Pointerify(root, options);

    this.configure = pointerify.configure.bind(pointerify);
    this.destroy = pointerify.destroy.bind(pointerify);
    this.refresh = pointerify.refresh.bind(pointerify);
  }
}

export default PointerifyFacade;
