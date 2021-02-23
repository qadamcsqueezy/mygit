
import * as fs from 'fs';
import * as path from 'path'
export function readJsonFileSync(path: string): any {
    let data = fs.readFileSync(path);
    return JSON.parse(data.toString());
}
export function createFile(name: string, content: string, parent: string) {
    fs.writeFileSync(path.join(parent, name), content);
}
export function existsInFolder(parent: string, filename: string): boolean {
    return fs.existsSync(path.join(parent, filename));
}
export function exists(path: string): boolean {
    return fs.existsSync(path);
}

export function copy(from: string, to: string) {
    let data = fs.readFileSync(from);
    fs.writeFileSync(to, data);
}
