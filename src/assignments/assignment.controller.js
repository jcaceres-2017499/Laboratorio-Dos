'use strict'
const Assignment = require('./assignment.model');
const Course = require('../course/course.model');
const User = require('../user/user.model');
const { populate } = require('../user/user.model');

exports.test = (req,res)=>{
    res.send({message: 'Test function is running'});
}

exports.addAssignment = async(req, res)=>{
    try{
        //obtener la informacion a agregar
        let data = req.body;
        //validacion si existe el user
        let existsUser = await User.findOne({_id: data.idUser});
        if(!existsUser) return res.status(404).send({message: 'Usuario no encontrado'});//mensaje si si no existe
        //validacion si existe el curso 1
        let existsCourseOne= await Course.findOne({_id: data.idCourseOne});
        if(!existsCourseOne) return res.status(404).send({message: 'Curso 1 no encontrado'});//mensaje si si no existe
        //validacion si existe el curso 2
        let existsCourseTwo= await Course.findOne({_id: data.idCourseTwo});
        if(!existsCourseTwo) return res.status(404).send({message: 'Curso 2 no encontrado'});//mensaje si si no existe
        //validacion si existe el curso 3
        let existsCourseThree= await Course.findOne({_id: data.idCourseThree});
        if(!existsCourseThree) return res.status(404).send({message: 'Curso 3 no encontrado'});//mensaje si si no existe
        let existsAssignments = await Assignment.findOne({idUser: data.idUser});
        if(existsAssignments) return res.send({message: 'Este usuario ya ha sido asignado previamente'});
        //guardar
        let assignment = new Assignment(data);
        await assignment.save();
        return res.send({message: 'Asignacion guardada exitosamente', assignment});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creando la asignacion'});
    }
}

exports.getAssignments = async(req, res)=>{
    try{
        //buscar datos
        let assignments = await Assignment.find().populate('idUser').populate('idCourseOne').populate('idCourseTwo').populate('idCourseThree');
        return res.send({message: 'Asignatura no encontrada', assignments});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al obtener asignaturas'});
    }
}