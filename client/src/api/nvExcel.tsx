import { EventEmitter } from "events";
import { wsObject } from "./Eutils";
export let ws: wsObject;
export let ee: EventEmitter;
export async function init() {
    ee = await new EventEmitter();
    ws = await new wsObject();
}