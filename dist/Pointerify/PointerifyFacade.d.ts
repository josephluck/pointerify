import IConfig from '../Config/Interfaces/IConfig';
declare class PointerifyFacade {
    configure: (options: IConfig) => void;
    destroy: () => void;
    refresh: () => void;
    constructor(root: HTMLElement, options: IConfig);
}
export default PointerifyFacade;
