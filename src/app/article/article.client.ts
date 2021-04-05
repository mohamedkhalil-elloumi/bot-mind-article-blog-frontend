import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';
import { Article } from './model/article.model';

/**
 * This is the client article that interacts
 * with the backend APIs of the articles
 */
@Injectable({
  providedIn: 'root',
})
export class ArticleClient {
  private http: HttpClient;
  private apiUrl = process.env.API_URL || '';
  private url = `${this.apiUrl}/api/article`;
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(
    @Inject(HttpClient) http: HttpClient,
    private authService: AuthService
  ) {
    this.http = http;
  }

  getArticles(): Observable<Article[]> {
    return this.http.get(this.url, this.options).pipe(
      map((payload: any) => {
        const data: any[] = payload.data;
        const articles: Article[] = data.map((e) => new Article(e));
        return articles;
      })
    );
  }

  getUserArticles(userId: number): Observable<Article[]> {
    return this.http.get(`${this.url}/${userId}`, this.options).pipe(
      map((payload: any) => {
        const data: any[] = payload.data;
        const articles: Article[] = data.map((e) => new Article(e));
        return articles;
      })
    );
  }

  createArticle(content: string): Observable<Article> {
    const body = { user_id: this.authService.currentUserValue.id, content };
    return this.http.post(this.url, body, this.options).pipe(
      map((payload: any) => {
        return new Article(payload.data);
      })
    );
  }

  updateArticle(content: string, articleId: number): Observable<Article> {
    const body = { content };
    return this.http.put(`${this.url}/${articleId}`, body, this.options).pipe(
      map((payload: any) => {
        return new Article(payload.data);
      })
    );
  }

  deleteArticle(articleId: number): Observable<string> {
    return this.http.delete(`${this.url}/${articleId}`, this.options).pipe(
      map((payload: any) => {
        return payload.message;
      })
    );
  }
}
