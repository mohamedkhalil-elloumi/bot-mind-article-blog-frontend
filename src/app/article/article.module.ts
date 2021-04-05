import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleClient } from './article.client';
import { ArticleComponent } from './article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleFacade } from './store/article.facade';
import { ArticleState } from './store/article.state';
import { UserArticleComponent } from './user-article/user-article.component';

@NgModule({
  declarations: [
    ArticleComponent,
    CreateArticleComponent,
    UserArticleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([ArticleState]),
    InfiniteScrollModule,
  ],
  providers: [ArticleClient, ArticleFacade],
})
export class ArticleModule {}
