const schemaTeacher = require("../models/teacherModel");
const bcrypt = require('bcryptjs');
exports.getAllteachers = (req, res, next) => {
  schemaTeacher
  .find({},{  password: 0 })  //to be more secure to exclude the password
    .then((data) => {
      res.status(200).json({ data ,password:false});
    })
    .catch((error) => next(error));
};

exports.getTeacherById = (req, res, next) => {
  schemaTeacher
  .findById(req.params.id, { password: 0 })
    .then((teacher) => {
      if (!teacher) {
        res.status(404).json({ data: "teacher not exists" });
      }
      res.status(200).json({ data: teacher });
    })
    .catch((error) => next(error));
};

exports.insertTeacher = async (req, res) => {
  try {
    const { fullName, password, email } = req.body;

    const image = req.file
      ? req.file.path.replace(/\\/g, "/")
      : "uploads/profile.jpg";
    const oldTeacher = await schemaTeacher.findOne({ email: email });
    if (oldTeacher) {
      return res.status(404).json({ message: "user already exists" });
    }

    //hashing password
    const hashedPass = await bcrypt.hash(password,10);

    const newTeacher = new schemaTeacher({
      fullName,
      email,
      password:hashedPass,
      image,
    });
    // const token = await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role});
    // newUser.token = token;

    const savedTeacher = await newTeacher.save();

    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTeacher = (req, res, next) => {
  const teacherId = req.params.id;

  const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

  const updateData = {
    ...req.body,
    ...(image && { image }),
  };

  schemaTeacher
    .findByIdAndUpdate(teacherId ,{ $set: updateData }, // Use $set to update specific fields
    { new: true })
    .then((teacherUpdate) => {
      if (!teacherUpdate) {
        return res.status(404).json({ data: "Teacher not found" });
      }
      res
        .status(200)
        .json({ message: "Teacher updated successfully", data: teacherUpdate });
    })
    .catch((error) => next(error));
};

exports.deleteTeacher = (req, res, next) => {
  const teacherId = req.params.id;
  schemaTeacher
    .findByIdAndDelete(teacherId)
    .then((deletedTeacher) => {
      if (!deletedTeacher) {
        res.status(404).json({ data: "teacher not exists" });
      }
      res
        .status(200)
        .json({
          message: "Teacher deleted successfully",
          data: deletedTeacher,
        });
    })
    .catch((error) => next(error));
};
exports.getSupervisorById = (req, res, next) => {
  const supervisorId = req.params._id;

  schemaTeacher
    .find({ "supervisors._id": supervisorId }, { "supervisors.$": 1 })
    .then((teachers) => {
      if (teachers.length === 0) {
        return res.status(404).json({ message: "Supervisor not found" });
      }

      const supervisor = teachers[0].supervisors[0];
      res.status(200).json({ supervisor });
    })
    .catch((error) => next(error));
};


//change password
exports.changePassword=async (req,res,next)=>{

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password,salt);
  req.body.password=hashedPassword;

  schemaTeacher.findByIdAndUpdate(req.params.id,req.body)
  .then((data)=>{
      if(data)
          res.status(201).json({message:"Password changed"})
      else{
          let error = new Error("User Not Found");
          error.statusCode=401;
          throw error;
      }
      })
  .catch((error)=>{next(error)});
}
