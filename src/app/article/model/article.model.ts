import { User } from 'src/app/authentication/model/user.model';

export class Article {
  id: number;
  content: string;
  createdAt: string;
  user: User;

  constructor(data: any) {
    this.id = data.id;
    this.content = data.content;
    this.createdAt = this.formatDate(new Date(data.createdAt));
    this.user = new User(data.user);
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }
}
