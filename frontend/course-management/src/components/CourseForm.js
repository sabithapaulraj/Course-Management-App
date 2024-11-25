import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseForm = ({ fetchCourses, editCourse, setEditCourse }) => {
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseName: "",
    trainer: "",
    trainees: "",
    batch: "",
    timings: "",
    classroom: "",
    duration: "",
    status: "",
  });

  // Set course data if editing an existing course
  useEffect(() => {
    if (editCourse) setCourseData(editCourse);
  }, [editCourse]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle form submission (add or edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editCourse) {
      // Edit course (PUT request)
      axios
        .put(`http://localhost:5000/api/courses/${editCourse._id}`, courseData)
        .then(() => {
          fetchCourses();
          setEditCourse(null);  // Reset editing state
          setCourseData({
            courseId: "",
            courseName: "",
            trainer: "",
            trainees: "",
            batch: "",
            timings: "",
            classroom: "",
            duration: "",
            status: "",
          });
        })
        .catch((error) => console.error("Error editing course:", error));
    } else {
      // Add new course (POST request)
      axios
        .post("http://localhost:5000/api/courses", courseData)
        .then(() => {
          fetchCourses();
          setCourseData({
            courseId: "",
            courseName: "",
            trainer: "",
            trainees: "",
            batch: "",
            timings: "",
            classroom: "",
            duration: "",
            status: "",
          });
        })
        .catch((error) => console.error("Error adding course:", error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editCourse ? "Edit Course" : "Add Course"}</h2>
      
      <input
        type="text"
        name="courseId"
        placeholder="Course ID"
        value={courseData.courseId}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="courseName"
        placeholder="Course Name"
        value={courseData.courseName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="trainer"
        placeholder="Trainer"
        value={courseData.trainer}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="trainees"
        placeholder="Trainees (comma-separated)"
        value={courseData.trainees}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="batch"
        placeholder="Batch"
        value={courseData.batch}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="timings"
        placeholder="Timings"
        value={courseData.timings}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="classroom"
        placeholder="Classroom"
        value={courseData.classroom}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={courseData.duration}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="status"
        placeholder="Status"
        value={courseData.status}
        onChange={handleChange}
        required
      />
      <button type="submit">{editCourse ? "Update" : "Add"} Course</button>
    </form>
  );
};

export default CourseForm;
