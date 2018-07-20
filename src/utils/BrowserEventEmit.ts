export default class EventEmit extends EventTarget {
    constructor() {
        super();
    }

    emit(type: string, data?: any): void {
        let e = new CustomEvent(type, data);
        this.dispatchEvent(e)
    }
}