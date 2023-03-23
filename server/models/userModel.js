import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        itemsInCart: { type: [Types.ObjectId], ref: 'Product', default: [] },
    },
    {
        timestamps: true
    },
);

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = mongoose.model('User', userSchema);

export default User;