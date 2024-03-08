export default class MapError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MapError";
    }
}
