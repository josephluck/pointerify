import Behavior from "./behavior";
import IConfig from "./interfaces/IConfig";
import Physics from "./physics";
import Selectors from "./selectors";

class Config implements IConfig {
  public behavior = new Behavior();
  public physics = new Physics();
  public selectors = new Selectors();

  constructor() {
    Object.freeze(this);
  }
}

export default Config;
