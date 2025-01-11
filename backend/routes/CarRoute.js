import { Router } from 'express';
import { getCars, deleteCar, updateCar, saveCar, getCar } from '../controllers/CarControllers.js';
import { createMission, getMissionById, updateMissionById, deleteMissionById, getAllMissions } from '../controllers/MissionController.js';

const router = Router();

router.get('/get', getCars);
router.post('/save', saveCar);
router.put('/update/:id', updateCar);
router.delete('/delete/:id', deleteCar);
router.get('/get/:id', getCar);

router.post('/missions', createMission);
router.get('/missions/:id', getMissionById);
router.get('/allmissions', getAllMissions);
router.put('/missions/update/:id', updateMissionById);
router.delete('/missions/delete/:id', deleteMissionById);

export default router;
