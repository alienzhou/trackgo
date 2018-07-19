import {TrackEvent} from './event/Event';
import TrackUser from './User';
import {uuid} from '../utils';

export default class Track {
    private id: string;
    private event: TrackEvent;
    private user: TrackUser;
    private st: Date;

    constructor(event: TrackEvent, user: TrackUser) {
        this.id = uuid();
        this.st = new Date;
        this.event = event;
        this.user = user;
    }
}