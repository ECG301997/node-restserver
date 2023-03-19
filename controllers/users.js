const { response } = require('express');


const usuariosGet = (req, res = response) => {
    const {q, nombre = 'No name', apikey , page = 1, limit} = req.query;

    res.status(201).json({
        msg: "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req, res = response) => {
    const { id }  = req.params;
    res.status(400).json({
        msg: "put API - controlador",
        id
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad } = req.body;
    res.status(400).json({
        msg: "post API - controlador",
        nombre,
        edad
    });
}

const usuariosPatch = (req, res = response) => {
    res.status(400).json({
        msg: "patch API - controlador"
    });
}

const usuariosDelete = (req, res = response) => {
    res.status(400).json({
        msg: "delete API - controlador"
    });
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
}
