const router = require('express').Router();
const film = require('./../../controllers/films');

router.get("/", film.findAll);

router.post('/', film.create);

router.put("/:filmId", film.update);

router.delete("/:filmId", film.delete);

module.exports = router;