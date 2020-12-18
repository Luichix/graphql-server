const {Film} = require("../models/index");

exports.findAll = async (req, res) => {
  console.log(req.usuarioId)
  const films = await Film.findAll();
  res.json(films); 
};

exports.create = async (req, res) => {
  const film = await Film.create(req.body);
  res.json(film);
};

exports.update = async (req, res) => {
  await Film.update(req.body, {
    where: { id: req.params.filmId }
  });
  res.json({success: 'Se ha modificado correctamente'})
};

exports.delete = async (req, res) => {
  await Film.destroy({
    where: { id: req.params.filmId }
  });
  res.json({succes: 'Se ha eliminado correctamente'})
};