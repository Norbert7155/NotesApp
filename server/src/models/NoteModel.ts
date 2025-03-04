import mongoose, { Schema , Document, model} from "mongoose";

export interface Note extends Document {
    title: string;
    content: string;
    createdData: Date;
    updateData: Date;
}

const noteSchema = new Schema<Note>(
    {
        title: {
            type: String,
            required: [true, "Add Title"],
        },

        content: {
            type: String,
            required: [true, "Add content"]
        },
    },
    {
        timestamps:true
    }
);

export const Note = model<Note>('Note' , noteSchema)