import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const materialSchema = new Schema({

    title: { type: String, required: [true, 'El titulo es necesario'] },
    url: { type: String, required: [true, 'La url es necesaria'] },
    asignado: { type: Boolean, required: true, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lugar: {
        type: Schema.Types.ObjectId,
        ref: 'Lugar',
        required: false,
    },
    desvincular: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
});

materialSchema.plugin(mongoosePaginate);

export default mongoose.model('Material', materialSchema);