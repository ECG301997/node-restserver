const { response } = require('express');
const Usuario = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req,res = response) => {
    
    const {email , password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({email});
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // si el usuario esta activo
        if(!usuario.status) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - status: false'
            });
        }

        // Verificar la contraseña
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if(!validPass) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Password'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);   

        res.json({ 
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
        
}


module.exports = {
    login
}