import express from 'express';
import Dispatch from '../models/Dispatch.js';

const router = express.Router();

// GET all dispatches 
router.get('/', async (req, res) => {
    try {
        const dispatches = await Dispatch.find(filter);
        res.json(dispatches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// POST a new dispatch
router.post('/', async (req, res) => {
    try {
        const { buyer_po_number, tyb_so_number, quality, lot_number, quantity, dispatch_date, vehicle_number, eta } = req.body;

        // Validate input data
        if (!buyer_po_number || !tyb_so_number || !quality || !lot_number || !quantity || !dispatch_date || !vehicle_number || !eta) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create and save the new dispatch document
        const newDispatch = new Dispatch({
            buyer_po_number,
            tyb_so_number,
            quality,
            lot_number,
            quantity,
            dispatch_date,
            vehicle_number,
            eta
        });

        const savedDispatch = await newDispatch.save();
        res.status(201).json(savedDispatch); // Return the saved document
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT (update) a dispatch by ID
router.put('/:id', async (req, res) => {
    try {
        const updated = await Dispatch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Dispatch not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a dispatch by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Dispatch.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Dispatch not found' });
        res.json({ message: 'Dispatch deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;