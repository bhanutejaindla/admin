import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEmployee.css"; // Importing the custom CSS file
import Header from "../Header/Header";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
    createDate: new Date().toISOString().split("T")[0],
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedCourses = checked
        ? [...newEmployee.course, value]
        : newEmployee.course.filter((course) => course !== value);

      setNewEmployee({ ...newEmployee, course: updatedCourses });
    } else if (type === "file") {
      setNewEmployee({ ...newEmployee, image: e.target.files[0] });
    } else {
      setNewEmployee({
        ...newEmployee,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("name", newEmployee.name);
    formData.append("email", newEmployee.email);
    formData.append("mobile", newEmployee.mobile);
    formData.append("designation", newEmployee.designation);
    formData.append("gender", newEmployee.gender);
    formData.append("course", JSON.stringify(newEmployee.course)); // Convert course array to JSON string
    formData.append("image", newEmployee.image); // File data
    formData.append("createDate", newEmployee.createDate);

    try {
      const response = await fetch("https://admin-server-8syd.onrender.com/createEmployee", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Employee added successfully");
        navigate("/"); // Navigate back to the employee list
      } else {
        console.error("Error adding employee:", await response.text());
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="form-container">
      <Header />
      <h3>Edit Employee</h3>
      <form onSubmit={handleFormSubmit} className="employee-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newEmployee.name}
            onChange={handleFormChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newEmployee.email}
            onChange={handleFormChange}
            required
          />
        </label>
        <label>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={newEmployee.mobile}
            onChange={handleFormChange}
            required
          />
        </label>
        <label>
          Designation:
          <select
            name="designation"
            value={newEmployee.designation}
            onChange={handleFormChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </label>
        <label>
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={newEmployee.gender === "M"}
              onChange={handleFormChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="F"
              checked={newEmployee.gender === "F"}
              onChange={handleFormChange}
              required
            />
            Female
          </label>
        </label>
        <label>
          Course:
          <label>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={newEmployee.course.includes("MCA")}
              onChange={handleFormChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={newEmployee.course.includes("BCA")}
              onChange={handleFormChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={newEmployee.course.includes("BSC")}
              onChange={handleFormChange}
            />
            BSC
          </label>
        </label>
        <label>
          Image Upload:
          <input
            type="file"
            name="image"
            onChange={handleFormChange}
            required
          />
        </label>
        <label>
          Create Date:
          <input
            type="date"
            name="createDate"
            value={newEmployee.createDate}
            onChange={handleFormChange}
            required
          />
        </label>
        <button type="submit" className="submit-btn">
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cancel-btn"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
