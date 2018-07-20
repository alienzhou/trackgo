import { select } from 'optimal-select';
import {TrackClickEvent, TrackViewEvent, TrackEvent, EventType} from '../entity/event';
import EventEmit from '../utils/BrowserEventEmit';

function collectCommonInfo(): Object {
    const global = window;
    const path: string = global.location.pathname;
    const refer: string = global.document.referrer;

    return {
        path,
        refer
    };
}

function collectClick(e: MouseEvent): TrackClickEvent {
    const selector = select(e.target);
    const {screenX, screenY} = e;
    
    let props = {
        selector,
        screenX,
        screenY
    };

    props = Object.assign(props, collectCommonInfo());

    const event = new TrackClickEvent(props);

    return event;
}

function collectView(): TrackViewEvent {
    const event = new TrackViewEvent(collectCommonInfo());
    return event;
}

function collectUserinfo() {
    const global = window;
    const userAgent: string = global.navigator.userAgent;
}

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

    startCollector() {
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

    stopCollector(type: EventType) {
        if (EventType.click === type) {
            document.removeEventListener('click', this.listeners[EventType.click]);
        }
    }

    stopAllCollector() {
        this.types.forEach(this.stopCollector);
    }
}