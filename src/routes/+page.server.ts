import type { ServerLoad } from "@sveltejs/kit";
import { Database } from "bun:sqlite";

export const load: ServerLoad = async () => {
    const db = new Database(":memory:");
    const query = db.query("select 'Hello world' as message;");
    console.log(query.get()); // => { message: "Hello world" }
};
