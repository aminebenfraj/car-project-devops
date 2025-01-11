import CarModel from '../models/CarModel.js';  // Import using ES module syntax

// Exporting all the functions using named exports
export const getCars = async (req, res) => {
    try {
        const cars = await CarModel.find().populate("mission");
        res.send(cars);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
};

export const getCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await CarModel.findById(id);
        if (!car) {
            return res.status(404).send({ msg: "Car not found" });
        }
        res.send(car);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
};

export const saveCar = async (req, res) => {
    try {
        const { model, date, color, price, owner, mission } = req.body;
        const newCar = new CarModel({ model, date, color, price, owner, mission });
        const savedCar = await newCar.save();
        console.log("Saved successfully:", savedCar);
        res.status(201).send(savedCar);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
};

export const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { model, date, color, price, owner, mission } = req.body;
        const updatedCar = await CarModel.findByIdAndUpdate(id, { model, date, color, price, owner, mission }, { new: true });
        console.log("Updated successfully:", updatedCar);
        res.send("Updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        await CarModel.findByIdAndDelete(id);
        console.log("Deleted successfully");
        res.send("Deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
};
