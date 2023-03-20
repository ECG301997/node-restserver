const Role = require('../models/role');

const Usuario = require('../models/user.model')

const esRoleValido = async(rol= '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
       throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const emailExiste = async(email= '') =>{
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email}, ya está registrado en la base de datos`)
    }
}

const existeUsuarioPorId= async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}