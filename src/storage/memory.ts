import EventEmit from '../utils/BrowserEventEmit';
import Track from '../entity/Track';

export default class Storage extends EventEmit {
    public tracks: Track[];

    constructor(tracks?: Track[]) {
        super();

        this.tracks = tracks || [];
    }

    save(track: Track) {
        this.tracks.push(track);
    }

    getAll() {
        return this.tracks.splice(0);
    }
}