const router = require('express').Router();
const timeSlotController = require('../controllers/time-slot-controller');

const am = require('../middlewares/async-middleware');

router.get('/time-slots', am(timeSlotController.findTimeSlots));
router.get('/time-slot/:id', am(timeSlotController.findTimeSlot));


module.exports = router;