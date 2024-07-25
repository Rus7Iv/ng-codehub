import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  searchRepos(
    query: string,
    language: string,
    page: number,
    perPage: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('q', `${query} ${language ? `language:${language}` : ''}`)
      .set('page', page)
      .set('per_page', perPage.toString());

    return this.http
      .get<any>(`${this.baseUrl}/search/repositories`, { params })
      .pipe(
        map((response) => {
          return {
            items: response.items.map((item: any) => ({
              id: item.id,
              name: item.name,
              owner: item.owner,
              html_url: item.html_url,
              description: item.description,
              stargazers_count: item.stargazers_count,
              language: item.language,
            })),
            total_count: response.total_count,
          };
        })
      );
  }

  getRepoDetails(owner: string, repo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/repos/${owner}/${repo}`);
  }

  getRepoFileStructure(
    owner: string,
    repo: string,
    path?: string
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/repos/${owner}/${repo}/contents/${path ? path : ''}`
    );
  }

  getReadmeContent(
    owner: string,
    repo: string,
    path?: string
  ): Observable<string> {
    return this.http.get<string>(
      `${this.baseUrl}/repos/${owner}/${repo}/contents/${
        path ? path + '/README.md' : 'README.md'
      }`,
      {
        headers: { Accept: 'application/vnd.github.v3.raw' },
        responseType: 'text' as 'json',
      }
    );
  }
}
