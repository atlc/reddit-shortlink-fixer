export function extractLink(link: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = link.match(urlRegex);
    return urls ? urls[0] : "";
}

export function isNewShareStyle(link: string) {
    const newShareUrlRegex = /\/r\/\w+\/s\/\w+/g;
    const urls = link.match(newShareUrlRegex);
    return !!urls;
}
