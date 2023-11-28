const asyncHandler = require("express-async-handler");
const fs = require('fs');
const Testimonials = require('../../models/Testimonials/testimonialsMode');


const testimonials = async(req,res) => {
    try {
        const { name, location, designation, comments } = req.body;
        if (!name) {
            return res.status(400).json({message: "Please enter testimonial name!"})
        } 
        
        let file =req.file ;
        if (file) {
            file = file.path;
        } else {
            file =''
        }
    
        const testimonial = await Testimonials.create({
            name,
            location,
            designation,
            comments,
            profilePic: file
        })
      

        if (testimonial) {
            return res.status(201).json({ message: testimonial});
        } else {
            return res.status(400).json({ message: "Somthing Wrong while creating testimonial!" });
        }
      
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const getTestimonials = async(req,res) => {
    try {
        const testimonials = await Testimonials.find();
        if (testimonials.length ==0) {
            return res.status(404).json({ message: "No testimonials Yet!" });
        }
        return res.status(200).json({ message: testimonials });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const updateTestimonialsById = async(req,res) => {
    try {
        const { id } = req.params;
        const { name, location, designation, comments } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Please Enter a Valid ID." });
        }
        const testimonial = await Testimonials.findById(id);
        if (!testimonial) {
            return res.status(404).json({message:"Testimonial not found With This ID."});
        }
        let file = req.file;

        if (name) {
            testimonial.name = name;
        }
        if (location) {
            testimonial.location = location;
        }
        if (designation) {
            testimonial.designation = designation;
        }
        if (comments) {
            testimonial.comments = comments;
        }
        if (file) {
            let pic = testimonial.profilePic;
            if (pic) {
                fs.unlink(pic, (err, pic) => {
                  if (err) return;
                  return;
                });
              }
            testimonial.profilePic = file.path;
        }
        testimonial.save();

        return res.status(200).json({ message: testimonial});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const deleteTestimonialsById = async(req,res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Please Enter a Valid ID." });
        }
        const testimonial = await Testimonials.findOne({ _id: id });
        if (!testimonial) {
            return res.status(400).json({message: "No Testimonial found with this Id."})
        }
        let pic = testimonial.profilePic;
        if (pic) {
            fs.unlink(pic, (err, pic) => {
              if (err) return;
              return;
            });
          }
        testimonial.remove();
            return res.status(200).json({ message: "Testimonial Deleted Successfully." });
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}


module.exports = {
    testimonials,
    getTestimonials,
    updateTestimonialsById,
    deleteTestimonialsById
}
