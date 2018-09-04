import Axis from '../Shared/Constants/Axis';
import IBehavior from './Interfaces/IBehavior';
declare class Behavior implements IBehavior {
    pressDuration: number;
    allowAxis: Axis;
    clampAxis: Axis;
    pinch: boolean;
    constructor();
    readonly allowX: boolean;
    readonly allowY: boolean;
    readonly clampX: boolean;
    readonly clampY: boolean;
}
export default Behavior;
