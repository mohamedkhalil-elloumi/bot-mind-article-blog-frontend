import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingIndicatorFacade } from 'src/app/shared/loading-indicator/store/loading-indicator.facade';
import { SnackBarService } from 'src/app/shared/snackbar/snackbar.service';
import { Article } from '../model/article.model';
import { ArticleFacade } from '../store/article.facade';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  @Input() article: Article | null;
  @Output() closeEditing = new EventEmitter<void>();

  form: FormGroup;
  error: string;

  buttonActionName: string;
  content: string;

  constructor(
    private formBuilder: FormBuilder,
    private articleFacade: ArticleFacade,
    private snackbar: SnackBarService,
    private loadingFacade: LoadingIndicatorFacade
  ) {}

  ngOnInit(): void {
    this.content = this.article?.content || '';
    this.buttonActionName = this.article !== undefined ? 'Update' : 'Publish';

    this.form = this.formBuilder.group({
      content: [this.content, Validators.min(1)],
    });
  }

  onCancel(): void {
    this.closeEditing.emit();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    const content = this.form.value.content;
    this.loadingFacade.beginLoading();
    if (this.article) {
      this.updateArticle(content, this.article.id);
      this.closeEditing.emit();
    } else {
      this.createArticle(content);
    }
  }

  async createArticle(content: string): Promise<void> {
    try {
      await this.articleFacade.createArticle(content).toPromise();
      this.form.reset();
      this.snackbar.showSuccessMessage('Article successfully created');
      this.loadingFacade.endLoadingWithSuccess();
    } catch (error) {
      this.snackbar.showErrorMessage(error.message);
      this.loadingFacade.endLoadingWithError();
    }
  }

  async updateArticle(content: string, articleId: number): Promise<void> {
    try {
      await this.articleFacade.updateArticle(content, articleId).toPromise();
      this.snackbar.showSuccessMessage('Article successfully updated');
      this.loadingFacade.endLoadingWithSuccess();
    } catch (error) {
      this.snackbar.showErrorMessage(error.message);
      this.loadingFacade.endLoadingWithError();
    }
  }
}
