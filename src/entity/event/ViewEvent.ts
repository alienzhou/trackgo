import {TrackEvent, EventType} from './Event';

export default class TrackViewEvent extends TrackEvent {
    constructor(props) {
        super(props);

        this.type = EventType.view;
    }
}