import mongoose from 'mongoose';

const { Schema } = mongoose;

const missionSchema = new Schema({
    destination: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
        required: true,
    },
    startTime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    }
});

// Use ES module export
export default mongoose.model('Mission', missionSchema);
