import { wsObject } from "./Eutils";
export let ws: wsObject;
export async function init() {
    ws = await new wsObject()
}