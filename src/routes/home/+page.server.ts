import type { ServerLoad } from "@sveltejs/kit";
import Database from "bun:sqlite";

export const load: ServerLoad = async () => {
    const sqlite = new Database("db.sqlite");
};
