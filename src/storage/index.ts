import EventEmit from "../utils/BrowserEventEmit";
import Memory from './memory';
import Track from '../entity/Track';

export default class Storage extends EventEmit {
    static SAVE_EVENT_NAME = 'storage:save';

    private storage: Memory;

    constructor() {
        super();

        // 初始化存储器
        this.storage = new Memory();

        // 监听存储事件，将track对象存储至存储器
        this.addEventListener(Storage.SAVE_EVENT_NAME, (e: any) => {
            let track:Track = <Track>e.detail;
            this.storage.save(track);
        });
    }
}