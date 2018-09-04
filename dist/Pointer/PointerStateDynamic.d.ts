import Direction from '../Shared/Constants/Direction';
import PointerStatus from '../Shared/Constants/PointerStatus';
import PointerType from '../Shared/Constants/PointerType';
declare class PointerStateDynamic {
    id: string;
    deltaX: number;
    deltaY: number;
    deltaDistance: number;
    deltaMultiplierX: number;
    deltaMultiplierY: number;
    deltaMultiplierDistance: number;
    multiplierX: number;
    multiplierY: number;
    velocityX: number;
    velocityY: number;
    velocityPinch: number;
    directionX: Direction;
    directionY: Direction;
    directionPinch: Direction;
    status: PointerStatus;
    type: PointerType;
    readonly isMousePointer: boolean;
    readonly isTouchPointer: boolean;
    readonly isVirtualPointer: boolean;
}
export default PointerStateDynamic;
