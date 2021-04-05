export class LoadArticles {
  static readonly type = '[Article] LoadArticles';
}

export class LoadUserArticles {
  static readonly type = '[Article] LoadUserArticles';
  constructor(public userId: number) {}
}

export class CreateArticle {
  static readonly type = '[Article] CreateArticle';
  constructor(public content: string) {}
}

export class UpdateArticle {
  static readonly type = '[Article] UpdateArticle';
  constructor(public content: string, public articleId: number) {}
}

export class DeleteArticle {
  static readonly type = '[Article] DeleteArticle';
  constructor(public articleId: number) {}
}
