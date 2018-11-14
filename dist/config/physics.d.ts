import IPhysics from "./interfaces/physics";
declare class Physics implements IPhysics {
    inertia: boolean;
    friction: number;
    easing: (t: number) => number;
    constructor();
}
export default Physics;
