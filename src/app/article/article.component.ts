import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { DeleteDialogService } from '../shared/confirm-delete/delete-dialog.service';
import { LoadingIndicatorFacade } from '../shared/loading-indicator/store/loading-indicator.facade';
import { SnackBarService } from '../shared/snackbar/snackbar.service';
import { Article } from './model/article.model';
import { ArticleFacade } from './store/article.facade';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  @Input() userArticles = false;

  $articles: Observable<Article[]>;
  articleSubscription: Subscription;
  articles: Article[];

  articleScroll: Article[];
  size = 1;
  take = 10;

  articleToEdit: Article | null;
  editing = false;

  userId: number;

  constructor(
    private articleFacade: ArticleFacade,
    private snackbar: SnackBarService,
    private loadingFacade: LoadingIndicatorFacade,
    private deleteDialogService: DeleteDialogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      if (user.email) {
        this.userId = user.id as number;
      }
    });
    if (!this.userArticles) {
      this.loadArticles();
    } else {
      this.loadUserArticles();
    }
    this.$articles = this.articleFacade.$articles;

    this.articleSubscription = this.$articles.subscribe((data) => {
      this.articles = data;
      this.articleScroll = this.articles.slice(0, 10);
    });
  }

  async loadUserArticles(): Promise<void> {
    try {
      this.loadingFacade.beginLoading();
      await this.articleFacade.loadUserArticles(this.userId).toPromise();
      this.loadingFacade.endLoadingWithSuccess();
    } catch (error) {
      this.loadingFacade.endLoadingWithError();
      this.snackbar.showErrorMessage(error.message);
    }
  }

  async loadArticles(): Promise<void> {
    try {
      this.loadingFacade.beginLoading();
      await this.articleFacade.loadArticles().toPromise();
      this.loadingFacade.endLoadingWithSuccess();
    } catch (error) {
      this.loadingFacade.endLoadingWithError();
      this.snackbar.showErrorMessage(error.message);
    }
  }

  edit(article: Article): void {
    this.editing = true;
    this.articleToEdit = article;
  }

  endEdit(): void {
    this.editing = false;
    this.articleToEdit = null;
  }

  loadMore(): void {
    const start = this.take * this.size;
    let end = this.take * (this.size + 1);
    end = this.articles.length > end ? end : this.articles.length;
    this.articleScroll.push(...this.sliceArray(start, end));
    this.size++;
  }

  sliceArray(start: number, end: number): Article[] {
    return this.articles.slice(start, end);
  }

  async deleteArticle(articleId: number): Promise<void> {
    const deleteArticle: boolean = await this.deleteDialogService.confirmDelete(
      'Are you sure to delete this article?'
    );

    if (!deleteArticle) {
      return;
    }

    try {
      this.loadingFacade.beginLoading();
      await this.articleFacade.deleteArticle(articleId).toPromise();
      this.loadingFacade.endLoadingWithSuccess();
      this.snackbar.showSuccessMessage('Article successfully deleted');
    } catch (error) {
      this.loadingFacade.endLoadingWithError();
      this.snackbar.showErrorMessage(error.message);
    }
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
