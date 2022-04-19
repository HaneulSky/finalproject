export default class GithubApi {
    constructor(config) {
        this.baseUrl = config.baseUrl;
    }

    getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        } else {
            return res.json();
        }
    }

    async getCommits() {
        try {
            const res = await fetch(`${this.baseUrl}`, {
                method: "GET",
            });
            const commits = await res.json();
            return commits;
        } catch (error) {
            this.getResponseData(error);
        }
    }
}
