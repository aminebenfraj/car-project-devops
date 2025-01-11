import mongoose from 'mongoose';

const { Schema } = mongoose;

const carSchema = new Schema({
    model: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    mission: {
        type: Schema.Types.ObjectId,
        ref: 'Mission',
    }
});

// Use ES module export
export default mongoose.model('Car', carSchema);
