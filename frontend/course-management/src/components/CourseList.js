import React, { useState, useEffect } from "react";
import axios from "axios";
const CourseList = ({ courses = [], setEditCourse }) => {
 const [searchTerm, setSearchTerm] = useState("");
 const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
   setFilteredCourses(courses);
 }, [courses]);
  const handleDelete = (id) => {
   axios
     .delete(`http://localhost:5000/api/courses/${id}`)
     .then(() => {
       setFilteredCourses((prev) =>
         prev.filter((course) => course._id !== id)
       );
     })
     .catch((error) => console.error("Error deleting course:", error));
 };
  const handleSearch = () => {
   if (searchTerm.trim() === "") {
     setFilteredCourses(courses);
   } else {
     setFilteredCourses(
       courses.filter((course) =>
         Object.values(course)
           .join(" ")
           .toLowerCase()
           .includes(searchTerm.toLowerCase())
       )
     );
   }
 };
  return (
   <div>
     <h1>All Courses</h1>
     <div className="search-bar">
       <input
         type="text"
         placeholder="Search by Trainer, Trainee, Course Name, Mode, or Location"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
       />
       <button onClick={handleSearch}>Search</button>
     </div>
     <table>
       <thead>
         <tr>
           <th>Course ID</th>
           <th>Course Name</th>
           <th>Trainer</th>
           <th>Trainees</th>
           <th>Date</th>
           <th>Batch</th>
           <th>Timings</th>
           <th>Classroom</th>
           <th>Duration</th>
           <th>Status</th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>
         {filteredCourses.map((course) => (
           <tr key={course._id}>
             <td>{course.courseId}</td>
             <td>{course.courseName}</td>
             <td>{course.trainer}</td>
             <td>{course.trainees.join(", ")}</td>
             <td>{new Date(course.date).toLocaleDateString()}</td>
             <td>{course.batch}</td>
             <td>{course.timings}</td>
             <td>{course.classroom}</td>
             <td>{course.duration}</td>
             <td>{course.status}</td>
             <td>
               <button onClick={() => setEditCourse(course)}>Edit</button>
               <button onClick={() => handleDelete(course._id)}>Delete</button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 );
};
export default CourseList;