import {uuid} from '../utils';

export default class TrackUser {
    public uuid: string;
    public userAgent: string;

    constructor() {
        const global = window;

        this.uuid = uuid();
        this.userAgent = global.navigator.userAgent || '';
    }
}