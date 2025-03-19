const fabrictypeService = require("../services/fabrictype.service");
const { createFabrictype } = require("./fabrictype.controller");

// Get all fabric types
exports.getAllFabrictypes = async (req, res, next) => {
    try {
        const fabrictypes = await fabrictypeService.getAllFabrictypes();
        res.status(200).json(fabrictypes);
    } catch (error) {
        next(error);
    }
};

// Get fabrictype by ID
exports.getFabrictypeById = async (req, res, ) => {
    try {
        const fabrictype = await fabrictypeService.getFabrictypeById(req.params.id);
        if (!fabrictype) return res.status(404).json({ message: "fabrictype not found" });
        res.status(200).json(fabrictype);
    } catch (error) {
        console.error("Error fetching fabrictype by ID:", error);
        res.status(400).json({ message: "Error fetching fabrictype", error: error.message });
    }
};

// Add a new fabric type
exports.createFabrictype = async (req, res) => {
    try {
        const fabrictypeData = new CreateFabricTypeDto(req.body);
        const newFabrictype = await fabrictypeService.createfabrictype(fabrictypeData);
        res.status(200).json(newFabrictype)
    } catch (error) {
        next(error);
    }
};
// Update fabrictype details
exports.updateFabrictypeById = async (req, res) => {
    try {
        const fabrictype = await fabrictypeService.updateFabrictypeById(req.params.id, fabrictypeData);
        if (!fabrictype) return res.status(404).json({ message: "Fabrictype not found" });

        await fabrictype.update(req.body);
        res.status(200).json(fabrictype);
    } catch (error) {
        console.error("Error updating fabrictype:", error);
        res.status(400).json({ message: "Error updating fabrictype", error: error.message });
    }
};

// Delete a fabrictype
exports.deleteFabrictypeById = async (req, res) => {
    try {
        const deletedFabrictype = await fabrictypeService.deleteFabrictypeById(req.params.id);
        if (!deletedFabrictype) {
            return res.status(404).json({ message: "fabrictype not found" });
        }

        
        res.json({ message: "Fabrictype deleted successfully" });
    } catch (error) {
        console.error("Error deleting fabrictype:", error);
        res.status(400).json({ message: "Error deleting fabrictype", error: error.message });
    }
};