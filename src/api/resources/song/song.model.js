import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const songSchema = new Schema({

    title: { type: String, required: [true, 'El titulo es necesario'] },
    url: { type: String, required: [true, 'La url es necesaria'] },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

songSchema.plugin(mongoosePaginate);

export default mongoose.model('Song', songSchema);