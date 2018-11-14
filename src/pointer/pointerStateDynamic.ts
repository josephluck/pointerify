import Direction from "../shared/constants/direction";
import PointerStatus from "../shared/constants/pointerStatus";
import PointerType from "../shared/constants/pointerType";

class PointerStateDynamic {
  public id: string = "";
  public deltaX: number = -1;
  public deltaY: number = -1;
  public deltaDistance: number = -1;
  public deltaMultiplierX: number = -1;
  public deltaMultiplierY: number = -1;
  public deltaMultiplierDistance: number = -1;
  public multiplierX: number = -1;
  public multiplierY: number = -1;
  public velocityX: number = -1;
  public velocityY: number = -1;
  public velocityPinch: number = -1;
  public directionX: Direction = null;
  public directionY: Direction = null;
  public directionPinch: Direction = null;
  public status: PointerStatus = null;
  public type: PointerType = null;

  public get isMousePointer(): boolean {
    return this.type === PointerType.MOUSE;
  }

  public get isTouchPointer(): boolean {
    return this.type === PointerType.TOUCH;
  }

  public get isVirtualPointer(): boolean {
    return this.type === PointerType.VIRTUAL;
  }
}

export default PointerStateDynamic;
