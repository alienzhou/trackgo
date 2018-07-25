import { TrackViewEvent } from '../../entity/event';
import collectCommonInfo from './common';

export default function collectView(): TrackViewEvent {
    const event = new TrackViewEvent(collectCommonInfo());
    return event;
}