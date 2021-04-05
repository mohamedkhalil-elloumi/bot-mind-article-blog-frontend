import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  insertItem,
  patch,
  removeItem,
  updateItem,
} from '@ngxs/store/operators';
import { ArticleClient } from '../article.client';
import { Article } from '../model/article.model';
import {
  CreateArticle,
  DeleteArticle,
  LoadArticles,
  LoadUserArticles,
  UpdateArticle,
} from './article.actions';

export interface ArticleStateModel {
  articles: Article[];
}

// This is the default state of the article model
const DEFAULT_ARTICLE_STATE: ArticleStateModel = {
  articles: [],
};

@State<ArticleStateModel>({
  name: 'article',
  defaults: DEFAULT_ARTICLE_STATE,
})
@Injectable()
export class ArticleState {
  //select the articles from the state model
  @Selector()
  static articles({ articles }: ArticleStateModel): Article[] {
    return articles;
  }

  constructor(private articleClient: ArticleClient) {}

  @Action(LoadArticles)
  async loadArticles({
    setState,
  }: StateContext<ArticleStateModel>): Promise<void> {
    try {
      const articles: Article[] = await this.articleClient
        .getArticles()
        .toPromise();
      setState(patch({ articles }));
    } catch (error) {
      throw new Error(error);
    }
  }

  @Action(LoadUserArticles)
  async loadUserArticles(
    { setState }: StateContext<ArticleStateModel>,
    { userId }: LoadUserArticles
  ): Promise<void> {
    try {
      const articles: Article[] = await this.articleClient
        .getUserArticles(userId)
        .toPromise();
      setState(patch({ articles }));
    } catch (error) {
      throw new Error(error);
    }
  }

  @Action(CreateArticle)
  async createArticle(
    { setState }: StateContext<ArticleStateModel>,
    { content }: CreateArticle
  ): Promise<void> {
    try {
      const article: Article = await this.articleClient
        .createArticle(content)
        .toPromise();
      setState(
        patch({
          articles: insertItem(article, 0),
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Action(UpdateArticle)
  async updateArticle(
    { setState }: StateContext<ArticleStateModel>,
    { content, articleId }: UpdateArticle
  ): Promise<void> {
    try {
      await this.articleClient.updateArticle(content, articleId).toPromise();
      setState(
        patch({
          articles: updateItem<Article>(
            (article) => article?.id === articleId,
            patch({ content })
          ),
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Action(DeleteArticle)
  async deleteArticle(
    { setState }: StateContext<ArticleStateModel>,
    { articleId }: DeleteArticle
  ): Promise<void> {
    try {
      await this.articleClient.deleteArticle(articleId).toPromise();
      setState(
        patch({
          articles: removeItem<Article>((article) => article?.id === articleId),
        })
      );
    } catch (error) {
      throw new Error(error.error.message);
    }
  }
}
