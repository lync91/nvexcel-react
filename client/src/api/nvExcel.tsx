import { wsObject } from "./Eutils";
export let ws: wsObject | null = null;
export async function init() {
    ws = await new wsObject()
}