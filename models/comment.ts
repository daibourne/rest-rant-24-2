import mongoose, { Schema, Document } from 'mongoose';

interface Comment extends Document {
    author: string;
    rant?: boolean;
    stars: number;
    content: string;
}

const commentSchema: Schema = new Schema({
    author: { type: String, default: 'Anonymous'},
    rant: { type: Boolean },
    stars: { type: Number, required: true },
    content: { type: String, default: '' }
});

const Comment = mongoose.model<Comment>('Comment', commentSchema);

export default Comment;