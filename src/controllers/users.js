const {User} = require('./../models/index')
const bcrypt = require ('bcryptjs') 
const { validationResult } = require('express-validator')

exports.findAll = async(req, res) => {
    res.send (
        [
            {
            id: 2,
            title: "Lucho",
            description: "luichix",
            score: "5",
            director: "luis perez",
            createdAt: "2020-12-16T00:50:01.000Z",
            updatedAt: "2020-12-16T00:50:01.000Z"
            },
            {
            id: 4,
            title: "Manu",
            description: "Peluche ",
            score: "10",
            director: "Manu rex",
            createdAt: "2020-12-16T01:32:43.000Z",
            updatedAt: "2020-12-16T01:33:02.000Z"
            },
            {
            id: 6,
            title: "No Game No Life",
            description: "Anime Movie",
            score: "99",
            director: "MAD House",
            createdAt: "2020-12-16T23:02:28.000Z",
            updatedAt: "2020-12-16T23:02:53.000Z"
            }
            ]    )
}

exports.create = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json ({errores:errors.array()})
    }

    req.body.password = bcrypt.hashSync(req.body.password,10)
        const user = await User.create(req.body)
        res.json(user)
} 