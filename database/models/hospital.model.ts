import { Document, model, Schema } from "mongoose";


interface IHospitalDto extends Document {
    name: string;
    user: {
        type: Schema.Types.ObjectId;
        ref: 'User';
        required: true;
    };
    image?: string;
}

const hospitalSchema = new Schema<IHospitalDto>({
    name: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: { type: String },
});

hospitalSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export const HospitalDto = model<IHospitalDto>('Hospital', hospitalSchema);