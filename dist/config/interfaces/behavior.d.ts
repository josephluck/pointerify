import Axis from "../../shared/constants/axis";
interface IBehavior {
    pressDuration?: number;
    allowAxis?: Axis;
    clampAxis?: Axis;
    pinch?: boolean;
}
export default IBehavior;
