import { Project } from "../models/project";
import * as child_process from 'child_process';
import * as FileUtil from '../utils/file-util';
import * as path from 'path';
import * as StringUtil from '../utils/string-util';
// Singleton class
export class GitService {

    private static instance: GitService;

    private constructor() {
    }

    public static getInstance(): GitService {
        if (!GitService.instance)
            GitService.instance = new GitService();
        return GitService.instance;
    }

    isInit(project: Project): boolean {
        return FileUtil.exists(path.join(project.path, '.git'))
    }

    isClean(project: Project): boolean {
        let commande: string = "cd " + project.path + " && git status --porcelain";
        return StringUtil.isEmpty(child_process.execSync(commande).toString());
    }

    init(project: Project): string {
        let commande: string = "git init " + project.path;
        return child_process.execSync(commande).toString();
    }
    add(project: Project): string {
        let commande: string = "cd " + project.path + " && git add .";
        return child_process.execSync(commande).toString();
    }
    getRemote(project: Project): string {
        let commande: string = "cd " + project.path + " && git remote";
        return child_process.execSync(commande).toString();
    }
    addRemote(project: Project): string {
        let commande: string = "cd " + project.path + " && git remote add " + project.remote + " " + project.remote_url;
        return child_process.execSync(commande).toString();
    }
    commit(project: Project) {
        let commande: string;
        commande = "cd " + project.path + ' && git commit -m "' + project.commitMessage + '"';
        return child_process.execSync(commande).toString();
    }
    push(project: Project) {
        let commande: string = "cd " + project.path + " && git push";
        if (project.remote_url)
            commande += " -u " + project.remote + " " + project.branch;

        return child_process.execSync(commande).toString();

    }
}