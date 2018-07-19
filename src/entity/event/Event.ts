import {uuid} from '../../utils';

export enum EventType {
    view = 'view',
    click = 'click',
    error = 'error'
};

export interface EventProps {
    path?: string;
    refer?: string;
    userAgent?: string;
    fingerprint?: string;
};

export class TrackEvent {
    public st: Date;
    public uuid: string;
    public type: EventType;
    public path: string;
    public refer: string;
    public info: Object;

    constructor(props: EventProps) {
        this.uuid = uuid();
        this.st = new Date;
        this.path = props.path || '';
        this.refer = props.refer || '';
    }
}