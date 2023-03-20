const { response } = require('express');
const Usuario = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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


const googleSignIn = async(req, res= response)=>{

    const { id_token } = req.body;

    try {
        const {name, img, email } = await googleVerify( id_token );
        

        let usuario = await Usuario.findOne({email});

        if(!usuario) {
            //Tengo que crearlo
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            }
        };

        usuario = new Usuario(data);
        await usuario.save();

        // si el usuario en DB

        if(!usuario.status){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT

        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })

        res.json({
            msg: 'Todo bien!',
            id_token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El tojen no se pudo verificar'
        })
    }

}



module.exports = {
    login,
    googleSignIn
}