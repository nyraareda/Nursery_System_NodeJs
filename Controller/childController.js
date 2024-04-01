const childSchema = require("../models/childModel");

//retrieve all childs
exports.getAllChilds=(req,res,next)=>{
    childSchema.find({})
        .then((data)=>{  
            res.status(200).json({ data });
    })
    .catch((error) => next(error));
    
}

//retrieve specific child by id
exports.getChildById = (req, res, next) => {
    const childId = parseInt(req.params.id); // Parse id to a number
    childSchema.findOne({ id: childId })
        .then((child) => {
            if (!child) {
                return res.status(404).json({ message: "Child not found" });
            }
            res.status(200).json({ child });
        })
        .catch((error) => next(error));
};


//insert new child
  exports.insertChild = async (req, res) => {
    try {
      const { fullName, age, level, address } = req.body;
  
      const image = req.file ? req.file.path.replace(/\\/g, '/') : 'uploads/profile.jpg';
  
      const newChild = new childSchema({
        fullName,
        age,
        level,
        address,
        image
      });
  
      const savedChild = await newChild.save();
  
      res.status(201).json(savedChild);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.updateChild = (req, res, next) => {
    const childId = req.params.id;

    const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const updateData = {
        ...req.body,
        ...(image && { image })
    };

    childSchema.findOneAndUpdate({ id: childId }, updateData, { new: true })
        .then((updatedChild) => {
            if (!updatedChild) {
                return res.status(404).json({ message: "Child not found" });
            }
            res.status(200).json({ message: "Child updated successfully", data: updatedChild });
        })
        .catch((error) => next(error));
};

exports.deleteChild = (req, res, next) => {
    const childId = req.params.id;

    childSchema.findOneAndDelete({ id: childId })
        .then((deletedChild) => {
            if (!deletedChild) {
                return res.status(404).json({ message: "Child not found" });
            }
            res.status(200).json({ message: "Child deleted successfully", data: deletedChild });
        })
        .catch((error) => next(error));
};
