export default class EventEmit extends EventTarget {
    constructor() {
        super();
    }

    emit(type: string, detail?: any): void {
        let e = new CustomEvent(type, {detail});
        this.dispatchEvent(e);
    }
}