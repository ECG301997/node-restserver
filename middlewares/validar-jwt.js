const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user.model');


const validarJWT = async( req = request, res = response, next ) => {

    // TODO: no toma el token -- Verificar
    const token = req.header('x-token');
     console.log(token);

    //como creo
    // const { token } = req.query;

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.PRIVATE_KEY );

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( usuario.estado ===false ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}
