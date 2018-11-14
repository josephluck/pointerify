import Axis from "../shared/constants/axis";
import IBehavior from "./interfaces/behavior";
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
