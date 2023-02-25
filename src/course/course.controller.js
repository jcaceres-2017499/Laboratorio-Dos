'use strict'
//Logica
const Course = require('./course.model');

exports.test = (req,res)=>{
    res.send({message: 'Funcion de prueba esta corriendo'});
}

exports.defaultCourse = async()=>{
    try{
        let data = {
            name: 'Desasignado',
            description: 'Desasignado'
        }
        let existCourse = await Course.findOne({name: 'Desasignado'});
        if(existCourse) return console.log('Curso por defecto fue creado');
        let defCourse = new Course(data);
        await defCourse.save();
        return console.log('Curso por defecto creado');
    }catch(err){
        return console.error(err);
    }
}

//agregar curso
exports.addCourse = async(req,res)=>{
    try{
        let data = req.body;
        //Validar duplicados
        let existsCourse = await Course.findOne({name: data.name});
        if(existsCourse){
            return res.send({message: 'Curso ya a sido creado'});
        }
        let course = new Course(data);
        await course.save();
        return res.status(201).send({message: 'Curso creado'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al guardar curso'});
    }
}

//ver los cursos
exports.getCourses = async(req, res)=>{
    try{
        let courses = await Course.find();
        return res.send({message: 'Curso encontrado', courses})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al obtener cursos'});
    }
}

//editar cursos
exports.updateCourse = async(req, res)=>{
    try{
        //obtener el id del curso
        let courseId = req.params.id;
        //obtener la data a actualizar
        let data = req.body;
        //Actualizar
        let updatedCourse = await Course.findOneAndUpdate(
            {_id: courseId},
            data,
            {new: true}
        )
        if(!updatedCourse) return res.send({message: 'Curso no pudo ser creado ni actualizado'});
        return res.send({message:'Curso actualizado', updatedCourse});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error actualizando cursos'});
    }
}

//elminar cursos
exports.deleteCourse =async(req,res)=>{
    try{
        //id del curso
        let courseId = req.params.id;
        //validacion si hay asignacion con un curso que quiero eliminar
        let defaultCourse = await Course.findOne({name: 'Desasignado'});
        if(defaultCourse._id == courseId) return res.send({message: 'Curso por defecto no puede ser creado'});
        await Course.updateMany({course: courseId}, {course: defaultCourse._id});
        //eliminar
        let deletedCourse = await Course.findOneAndDelete({_id: courseId});
        if(!deletedCourse) return res.status(404).send({message: 'Curso no encontrado y no se puede eliminar'});
        return res.send({message: 'Curso eliminado con exito'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al eliminar curso'});
    }
}