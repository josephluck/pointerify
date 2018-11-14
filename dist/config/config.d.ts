import Behavior from "./behavior";
import IConfig from "./interfaces/IConfig";
import Physics from "./physics";
import Selectors from "./selectors";
declare class Config implements IConfig {
    behavior: Behavior;
    physics: Physics;
    selectors: Selectors;
    constructor();
}
export default Config;
