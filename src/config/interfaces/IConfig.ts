import IBehavior from './behavior';
import IPhysics from './physics';
import ISelectors from './selectors';

interface IConfig {
    behavior?: IBehavior;
    physics?: IPhysics;
    selectors?: ISelectors;
}

export default IConfig;