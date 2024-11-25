import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import './App.css';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container">
      <CourseForm
        fetchCourses={fetchCourses}
        editCourse={editCourse}
        setEditCourse={setEditCourse}
      />
      <CourseList
        courses={courses}
        setEditCourse={setEditCourse}
      />
    </div>
  );
};

export default App;