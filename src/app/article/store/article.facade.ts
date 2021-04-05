import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Article } from '../model/article.model';
import { ArticleState } from './article.state';
import {
  CreateArticle,
  DeleteArticle,
  LoadArticles,
  LoadUserArticles,
  UpdateArticle,
} from './article.actions';

@Injectable()
export class ArticleFacade {
  @Select(ArticleState.articles)
  $articles: Observable<Article[]>;

  constructor(private store: Store) {}

  loadArticles(): Observable<Article[]> {
    return this.store.dispatch(new LoadArticles());
  }

  loadUserArticles(userId: number): Observable<Article[]> {
    return this.store.dispatch(new LoadUserArticles(userId));
  }

  createArticle(content: string): Observable<void> {
    return this.store.dispatch(new CreateArticle(content));
  }

  updateArticle(content: string, articleId: number): Observable<void> {
    return this.store.dispatch(new UpdateArticle(content, articleId));
  }

  deleteArticle(articleId: number): Observable<void> {
    return this.store.dispatch(new DeleteArticle(articleId));
  }
}
