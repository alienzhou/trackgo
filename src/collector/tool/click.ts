import { TrackClickEvent } from '../../entity/event';
import { select } from 'optimal-select';
import collectCommonInfo from './common';

export default function (e: MouseEvent): TrackClickEvent {
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