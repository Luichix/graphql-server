const {Staff} = require("../models/index");

exports.findAll = async (req, res) => {
  // console.log(req.usuarioId)
  const staff = await Staff.findAll();
  res.json(staff); 
};

exports.create = async (req, res) => {
  const staff = await Staff.create(req.body);
  res.json(staff);
};

exports.update = async (req, res) => {
  await Staff.update(req.body, {
    where: { id: req.params.staffId }
  });
  res.json({success: 'Se ha modificado correctamente'})
};

exports.delete = async (req, res) => {
  await Staff.destroy({
    where: { id: req.params.staffId }
  });
  res.json({succes: 'Se ha eliminado correctamente'})
};