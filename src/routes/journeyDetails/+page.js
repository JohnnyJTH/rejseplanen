import { error } from "@sveltejs/kit";

export async function load({fetch, url}) {
    const params = url.searchParams
    let ref;
    let journeyId;
    for (const [key, value] of params) {
        switch (key) {
            case 'ref':
                ref = value;
                break;
            case 'journeyId':
                journeyId = value;
                break;
            default:
                console.log(`Unknown url parameter: ${key}`)
        }
    }
    if (!ref || !journeyId) {
        throw error(403, `Missing url parameter: ref or journeyId`);
    }

    return {ref, journeyId}
}