import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css'; // Importing the custom CSS file
import Header from '../Header/Header.jsx';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([
    // Sample Employee Data
    {
      id: 1,
      name: 'Hukum',
      email: 'hcgupta@cstech.in',
      mobile: '954010044',
      designation: 'HR',
      gender: 'Male',
      course: 'MCA',
      createDate: '2021-02-13',
    },
    {
      id: 2,
      name: 'Manish',
      email: 'manish@cstech.in',
      mobile: '954010033',
      designation: 'Sales',
      gender: 'Male',
      course: 'BCA',
      createDate: '2021-02-12',
    },
    {
      id: 3,
      name: 'Yash',
      email: 'yash@cstech.in',
      mobile: '954010022',
      designation: 'Manager',
      gender: 'Male',
      course: 'BSC',
      createDate: '2021-02-11',
    },
    {
      id: 4,
      name: 'Abhishek',
      email: 'abhishek@cstech.in',
      mobile: '954010033',
      designation: 'HR',
      gender: 'Male',
      course: 'MCA',
      createDate: '2021-02-13',
    },
    {
      id: 5,
      name: 'Aditi',
      email: 'aditi@cstech.in',
      mobile: '954010011',
      designation: 'HR',
      gender: 'Female',
      course: 'BSC',
      createDate: '2021-02-15',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 2;

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: 'Male',
    course: '',
    createDate: new Date().toISOString().split('T')[0],
  });

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleEdit = (id) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === id) {
        const newName = prompt('Enter new name:', employee.name);
        const newEmail = prompt('Enter new email:', employee.email);
        const newMobile = prompt('Enter new mobile:', employee.mobile);
        const newDesignation = prompt(
          'Enter new designation:',
          employee.designation
        );
        return {
          ...employee,
          name: newName || employee.name,
          email: newEmail || employee.email,
          mobile: newMobile || employee.mobile,
          designation: newDesignation || employee.designation,
        };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  const handleSort = (field) => {
    let direction = 'ascending';
    if (sortConfig.key === field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: field, direction });

    let sortedEmployees = [...employees];
    sortedEmployees.sort((a, b) => {
      if (a[field] < b[field]) return direction === 'ascending' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setEmployees(sortedEmployees);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.mobile.includes(searchTerm)
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEmployees.length / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEmployees([
      ...employees,
      { id: employees.length + 1, ...newEmployee }
    ]);
    setNewEmployee({
      name: '',
      email: '',
      mobile: '',
      designation: '',
      gender: 'Male',
      course: '',
      createDate: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  return (
    <div className="employee-container">
      <Header />
      <div className="employee-header">
        <h2>Employee List</h2>
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setShowForm(true)} className="create-btn">
          Create Employee
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>Create New Employee</h3>
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
              <input
                type="text"
                name="designation"
                value={newEmployee.designation}
                onChange={handleFormChange}
                required
              />
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={newEmployee.gender}
                onChange={handleFormChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Course:
              <input
                type="text"
                name="course"
                value={newEmployee.course}
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
            <button type="submit" className="submit-btn">Add Employee</button>
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
          </form>
        </div>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              Unique Id {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th>Image</th>
            <th onClick={() => handleSort('name')}>
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => handleSort('createDate')}>
              Create Date {sortConfig.key === 'createDate' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>
                <img
                  src={
                    employee.gender === 'Male'
                      ? 'https://via.placeholder.com/50/0000FF/FFFFFF?text=Male'
                      : 'https://via.placeholder.com/50/FF69B4/FFFFFF?text=Female'
                  }
                  alt={employee.name}
                  className="employee-image"
                />
              </td>
              <td>{employee.name}</td>
              <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{employee.createDate}</td>
              <td>
                <button
                  onClick={() => handleEdit(employee.id)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
