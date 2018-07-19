import {TrackEvent, EventType} from './Event';

export default class TrackViewEvent extends TrackEvent {

    public leaveTime: Date | null;

    constructor(props) {
        super(props);

        this.type = EventType.view;
    }
}