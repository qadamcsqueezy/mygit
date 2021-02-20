export class Project {
    name: string;
    path: string;
    remote: string = "origin";
    IsPrivate: boolean = true;
    remote_url: string;
    branch: string = "master";
    commitMessage: string;

}