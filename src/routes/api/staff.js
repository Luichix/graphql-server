const router = require('express').Router();
const staff = require('./../../controllers/staff');

router.get("/", staff.findAll);

router.post('/', staff.create);

router.put("/:staffId", staff.update);

router.delete("/:staffId", staff.delete);

module.exports = router;