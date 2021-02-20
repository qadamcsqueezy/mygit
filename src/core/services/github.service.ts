import { Project } from "../models/project";
import { Octokit } from "@octokit/core";

// Singleton class
export class GithubService {
    private static instance: GithubService;
    private constructor() { }



    public static getInstance(): GithubService {
        if (!GithubService.instance)
            GithubService.instance = new GithubService();
        return GithubService.instance;
    }

    async createRepo(project: Project, token: string): Promise<string> {
        const octokit = new Octokit({ auth: token });
        let response;
        try {
            response = await octokit.request('POST /user/repos', {
                name: project.name,
                private: project.IsPrivate
            });
        } catch (ex) {
            console.log("error in creating repo in github");
        }
        return response.data.clone_url;
    }
}