export class Book {

    id: number;
    title: string;
    description?: string;
    authorId: number;
    categoryId: number;
    publishedDate: Date;
    available: boolean;
}
