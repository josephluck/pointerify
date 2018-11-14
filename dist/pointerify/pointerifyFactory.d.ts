import IConfig from "../config/interfaces/IConfig";
import PointerifyFacade from "./pointerifyFacade";
declare function pointerifyFactory(root: HTMLElement, config?: IConfig): PointerifyFacade;
export default pointerifyFactory;
