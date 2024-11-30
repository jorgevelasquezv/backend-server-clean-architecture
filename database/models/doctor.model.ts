import { model, Schema, Document } from "mongoose";

interface IDoctorDto extends Document {
    id: string;
    name: string;
    user: {
        type: Schema.Types.ObjectId;
        ref: 'User';
        required: true;
    };
    hospital: {
        type: Schema.Types.ObjectId;
        ref: 'Hospital';
        required: true;
    };
    image?: string;
}

const doctorSchema = new Schema<IDoctorDto>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true,
    },
    image: { type: String },
});

doctorSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export const DoctorDto = model<IDoctorDto>('Doctor', doctorSchema);