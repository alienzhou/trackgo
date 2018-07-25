import TrackUser from './entity/User';
import {EventType} from './entity/event';
import Collector, {EventInfo} from './collector';
import Storage from './storage';
import Track from './entity/Track';

const user = new TrackUser();

export function watch(types: EventType[]): {
    collector: Collector,
    storage: Storage
} {
    const collector = new Collector(types);
    const storage = new Storage();

    // 开始收集事件信息
    collector.startCollect();

    // 监听track收集器的收集情况，每次收集到新track时，存入存储器
    collector.addEventListener(Collector.COLLECT_EVENT_NAME, (e: any) => {
        const { event } = <EventInfo>e.detail;
        const track = new Track(event, user);

        storage.emit(Storage.SAVE_EVENT_NAME, track);
    });

    return {
        collector,
        storage
    };
}

export {Collector, Storage};