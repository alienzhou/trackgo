export default function collectCommonInfo(): Object {
    const global = window;
    const path: string = global.location.pathname;
    const refer: string = global.document.referrer;

    return {
        path,
        refer
    };
}