import { readSync } from "fs";

import * as fs from 'fs';
export function readJsonFileSync(path: string): any {
    let data = fs.readFileSync(path);
    return JSON.parse(data.toString());
}
export function exists(path: string) {
    return fs.existsSync(path);
}