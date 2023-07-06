export default interface IBlog extends Document {
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}
