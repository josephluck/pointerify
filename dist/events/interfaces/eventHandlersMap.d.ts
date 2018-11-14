import IEventHandler from './eventHandler';
interface IEventHandlersMap {
    [handlerName: string]: IEventHandler;
}
export default IEventHandlersMap;
