import {TrackEvent, EventType} from './Event';

export default class ClickTrackEvent extends TrackEvent {

    public selector: string;
    public screenX: number;
    public screenY: number;

    constructor(props) {
        super(props);

        this.type = EventType.click;
        this.selector = props.selector;
        this.screenX = props.screenX;
        this.screenY = props.screenY;
    }
}