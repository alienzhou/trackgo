import { TrackEvent, EventType } from '../entity/event';
import { collectClick, collectView } from './tool';
import EventEmit from '../utils/BrowserEventEmit';

export interface EventInfo {
    type: EventType,
    event: TrackEvent
}

export default class Collector extends EventEmit {
    static COLLECT_EVENT_NAME = 'collector:collect';

    public types: EventType[];
    public isCollecting: boolean;
    public listeners: {
        [propName: string]: any;
    }

    constructor(types: EventType | EventType[]) {
        super();

        if (!Array.isArray(types)) {
            types = [types];
        }

        this.types = types;
        this.isCollecting = false;

        this.listeners = {};
    }

    isInclude(type: EventType): boolean {
        return this.types.includes(type);
    }

    private notify(type: EventType, event: TrackEvent) {
        let data: EventInfo = {type, event};
        this.emit(Collector.COLLECT_EVENT_NAME, data);
    }

    startCollect() {
        const isBrowser = !!window;

        if (this.isInclude(EventType.click) && isBrowser) {
            this.listeners[EventType.click] = e => {
                const event = collectClick(e);
                this.notify(EventType.click, event);
            }
            document.addEventListener('click', this.listeners[EventType.click]);
        }

        if (this.isInclude(EventType.view) && isBrowser) {
            const event = collectView();
            this.notify(EventType.view, event);
        }
    }

    stopCollect(type: EventType) {
        if (EventType.click === type) {
            document.removeEventListener('click', this.listeners[EventType.click]);
        }
    }

    stopAllCollector() {
        this.types.forEach(this.stopCollect);
    }
}