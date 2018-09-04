import IConfig from '../Config/Interfaces/IConfig';
import PointerifyFacade from './PointerifyFacade';
declare function pointerifyFactory(root: HTMLElement, config?: IConfig): PointerifyFacade;
export default pointerifyFactory;
