import { model, Schema } from 'mongoose';
import { bcryptadapter } from '../../src/config/bcrypt.adapter';

interface IUserDto extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    image?: string;
    createByGoogle?: boolean;
    encrypPassword(password: string): Promise<string>;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDto>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'DOCTOR_ROLE'],
        required: true,
    },
    image: { type: String },
    createByGoogle: { type: Boolean },
});

userSchema.methods.encrypPassword = function (password: string): string {
    return bcryptadapter.hash(password);
}

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcryptadapter.compare(password, this.password);
}

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

export const UserDto = model<IUserDto>('User', userSchema);
