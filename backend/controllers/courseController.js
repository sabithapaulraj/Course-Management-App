const Course = require('../models/Course');

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchCourses = async (req, res) => {
  const { keyword } = req.query;
  try {
    const courses = await Course.find({
      $or: [
        { trainer: { $regex: keyword, $options: 'i' } },
        { trainees: { $regex: keyword, $options: 'i' } },
        { courseName: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourses, addCourse, updateCourse, deleteCourse, searchCourses };
