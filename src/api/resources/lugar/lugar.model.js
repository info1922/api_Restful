import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const lugarSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

// lugarSchema.plugin(mongoosePaginate);

export default mongoose.model('Lugar', lugarSchema);