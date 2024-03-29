const classSchema = require("../models/classModel");
const schemaTeacher = require("../models/teacherModel");
const childSchema = require("../models/childModel");

exports.getAllclasses = (request, response, next) => {
  classSchema.find()
      .populate({
          path: "supervisor",
          select: { fullName: 1, email: 1, image: 1 }
      })
      .populate({
          path: "children",
          select: { fullName: 1, age: 1, level: 1, address: 1 }
      })
      .then((classes) => {
          response.status(200).json({ data: classes });
      })
      .catch((error) => next(error));
};

exports.getclassById = (request, response, next) => {
  const classId = request.params.id;
  classSchema.findById(classId)
  .populate({
    path: "supervisor",
    select: { fullName: 1, email: 1, image: 1 }
})
.populate({
    path: "children",
    select: { fullName: 1, age: 1, level: 1, address: 1 }
})
.then((classData) => {
  if (!classData) {
      throw new Error("Class not found");
  }
  response.status(200).json({ data: classData });
})
.catch((error) => next(error));
};


exports.addNewclass = (request, response, next) => {
  const newClass = new classSchema(request.body);
  newClass.save()
  .then((classes)=>{
    response.status(200).json({message: "Class added successfully",data:classes});
  })
  .catch((error)=>next(error));
};


exports.updateClass = (request, response, next) => {
  const classId = request.params._id;
  const updateFields = request.body;

  classSchema.findByIdAndUpdate(classId, updateFields, { new: true })
      .then((updatedClass) => {
          if (!updatedClass) {
              // If the class is not found, return an error
              return response.status(404).json({ error: "Class not found" });
          }
          response.status(200).json({ data: updatedClass });
      })
      .catch((error) => next(error));
};

exports.deleteClass = (request, response, next) => {
  const classId = request.params.id;
  classSchema.findByIdAndDelete(classId)
  .then((deletedClass)=>{
    if(!deletedClass){
      throw new Error("Class not found");
    }
  response.status(200).json({ message:"deleted successfully ",data:deletedClass });
  })
};

exports.getChildInfo=(request,response,next)=>{
  const childId = request.params.id;
  classSchema.findById(childId)
  .then((childInfo)=>{
    if(!childInfo){
      throw new Error("childInfo is not found");
    }
  response.status(200).json({data:childInfo});
  })
  .catch((error)=>next(error));
};


exports.getSupervisorInfo=(request,response,next)=>{
  const superId = request.params.id;
  schemaTeacher.findById(superId)
  .then((superInfo)=>{
    if(!superInfo){
      throw new Error("superInfo is not found");
    }
  response.status(200).json({data:superInfo});
  })
  .catch((error)=>next(error))
};