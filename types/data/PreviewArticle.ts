export default interface PreviewArticle {
  author: string;
  authorTitle: string;
  copyright: string;
  title: string;
  pubDateUTC: string;
  paragraphs?: (ParagraphsEntity)[] | null;
}
export interface ParagraphsEntity {
  paragraph: string;
}
