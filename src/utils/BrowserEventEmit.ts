export default class EventEmit extends EventTarget {
    constructor() {
        super();
    }

    emit(type, data: any | null) {
        let e = new CustomEvent(type, data);
        this.dispatchEvent(e)
    }
}