import mongoose, { Schema, Document } from 'mongoose';

interface Comment extends Document {
  // Define Comment properties here
}

interface Place extends Document {
  name: string;
  pic: string;
  cuisines: string;
  city: string;
  state: string;
  founded: number;
  comments: Comment[];
  showEstablished: () => string;
}

const placeSchema: Schema<Place> = new Schema({
  name: { type: String, required: true },
  pic: { type: String, default: 'http://placekitten.com/350/350' },
  cuisines: { type: String },
  city: { type: String, default: 'Anytown' },
  state: { type: String, default: 'USA' },
  founded: {
    type: Number,
    min: [1673, 'Surely not that old?!'],
    max: [new Date().getFullYear(), 'Hey, this year is in the future!']
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

placeSchema.methods.showEstablished = function (): string {
  return `${this.name} has been serving ${this.city}, ${this.state} since ${this.founded}.`;
}

const Place = mongoose.model<Place>('Place', placeSchema);

export default Place;