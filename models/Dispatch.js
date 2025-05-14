import mongoose from 'mongoose';

const dispatchSchema = new mongoose.Schema({
    buyer_po_number: { type: String, required: true },
    tyb_so_number: { type: String, required: true },
    quality: { type: String, required: true },
    lot_number: { type: String, required: true },
    quantity: { type: String, required: true },
    dispatch_date: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    eta: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Dispatch', dispatchSchema);
