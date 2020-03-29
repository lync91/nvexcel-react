import { wsObject } from "./Eutils";
export let ws: wsObject | null = null;
export async function init() {
    console.log('PL');
    
    ws = await new wsObject()
}