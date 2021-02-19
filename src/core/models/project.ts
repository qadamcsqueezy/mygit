export class Project {
    name: string;
    path: string;
    remote: string = "origin";
    privateRepo: boolean = true;
    remote_url: string;
    branch: string = "master";
    isPushedBefore: boolean;
    commitMessage: string;
    hasLiscence: boolean;
    hasGitIgnore: boolean;
    hasReadme: boolean;
}