import IPhysics from './Interfaces/IPhysics';
declare class Physics implements IPhysics {
    inertia: boolean;
    friction: number;
    easing: (t: number) => number;
    constructor();
}
export default Physics;
