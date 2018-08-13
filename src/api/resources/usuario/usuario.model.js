import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

export const ADMIN_ROLE = 1;
export const USER_ROLE = 2;

const { Schema } = mongoose;

const userSchema = new Schema({
    local: { email: String, password: String },
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellido: { type: String, required: [true, 'El apellido es necesario'] },
    // email: { type: String, required: [true, 'El correo es necesario'], unique: true },
    // password: { type: String, required: [true, 'La contraseña es necesaria'] },
    role: { default: USER_ROLE, required: true, type: Number },
    google: { email: String, id: String, displayName: String, token: String },
    facebook: { email: String, id: String, displayName: String, token: String }

}, {
    timestamps: true
});

userSchema.plugin(mongoosePaginate);

export default mongoose.model('User', userSchema);