import { EventEmitter } from "events";
import { wsObject } from "./Eutils";
export let ws: wsObject;
export let ee: EventEmitter = new EventEmitter();
export async function init() {
    ws = await new wsObject();
}