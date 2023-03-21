const { response } = require("express");
const { Categoria } = require('../models')


// Obtener categorias - Paginado - total - populate

const obtenerCategorias = async(req, res = response) =>{

    const { limite =5, desde=0 } = req.query;
    const query = { status: true};

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario','name')
            .skip(Number(desde))
            .limit(Number(limite))
            
    ])

    res.json({
        total,
        categorias
    });

}

const  obtenerCategoria = async(req,res = response) =>{

    const { id } = req.params;
    const categoria = await Categoria.findById( id ).populate('usuario','name');
    res.json(categoria);

}

const actualizarCategoria = async(req,res = response) =>{
    
}

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.name.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (!categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.name} ya existe`
        });
    }
    
    //Generar la data a aguardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    
    const categoria = new Categoria(data);
    
    //Guardar DB
    await categoria.save();
    
    res.status(201).json(categoria);
    
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria
}