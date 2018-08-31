import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const materialSchema = new Schema({

    title: { type: String, required: [true, 'El nombre es necesario'] },
    url: { type: String, required: [true, 'La url es necesaria'] },
    asignado: { type: Boolean, required: true, default: false },
    cantidad: { type: Number, default: 1, min: 1, max: Infinity, required: true },
    img: { type: String, required: false },
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