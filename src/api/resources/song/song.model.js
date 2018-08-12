import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const songSchema = new Schema({

    title: { type: String, required: [true, 'El nombre es necesario'] },
    url: { type: String, required: [true, 'La url es necesaria'] },
    rating: { type: Number, default: 0, min: 0, max: 5 }

}, {
    timestamps: true
});

songSchema.plugin(mongoosePaginate);

export default mongoose.model('Song', songSchema);