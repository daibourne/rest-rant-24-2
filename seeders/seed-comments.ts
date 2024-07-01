import { Place, Comment } from '../models/index';

async function seed(): Promise<void> {
    let place: Place | null = await Place.findOne({ name: 'Test' });

    let comment: Comment = await Comment.create({
        author: 'Famished Fran',
        rant: false,
        stars: 5.0,
        content: 'Place is trash'
    });
    if (place) {
        place.comments.push(comment.id);
        await place.save();
    }

    process.exit();
}

seed();