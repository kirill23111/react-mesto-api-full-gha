export class Cookie {
    static stringify(obj) {
        return Object.entries(obj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('; ');
    }

    static parse(cookieString) {
        const cookiePairs = cookieString.split('; ');
        const cookieObject = {};
        
        for (const pair of cookiePairs) {
            const [key, value] = pair.split('=');
            cookieObject[decodeURIComponent(key)] = decodeURIComponent(value);
        }
        
        return cookieObject;
    }
}