const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user.model');



const usuariosGet = async(req, res = response) => {
    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    const { limite =5, desde=0 } = req.query;
    const query = { status: true};
    
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;

    const {_id, password, google,correo, ...resto } = req.body;

    //TODO: validar contra la base de datos

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
}

const usuariosPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // Guardar en DB
    await usuario.save();

    res.json({
        msg: "post API - controlador",
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.status(400).json({
        msg: "patch API - controlador"
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    // desactivar usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {status:false});
    const usuarioAutenticado = req.usuario;

    res.json(usuario,usuarioAutenticado);
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
}
