const Role = require('../models/role');

const { Usuario, Categoria } = require('../models')

const esRoleValido = async(role= '') =>{
    const existeRol = await Role.findOne({role});
    if(!existeRol){
       throw new Error(`El rol ${role} no está registrado en la base de datos`)
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

/*
* Categorias
*/

const existeCategoriaPorId= async( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}