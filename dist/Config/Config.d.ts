import Behavior from './Behavior';
import IConfig from './Interfaces/IConfig';
import Physics from './Physics';
import Selectors from './Selectors';
declare class Config implements IConfig {
    behavior: Behavior;
    physics: Physics;
    selectors: Selectors;
    constructor();
}
export default Config;
