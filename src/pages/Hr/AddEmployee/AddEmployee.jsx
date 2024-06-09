

import  { useState } from 'react';

const AddEmployee = () => {
  // Dummy data for demonstration purposes
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      selected: false,
    },
    // Add more employees as needed
  ]);

  // Function to handle selecting an employee
  const handleSelectEmployee = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, selected: !employee.selected }
          : employee
      )
    );
  };

  // Function to handle adding an employee to the team
  const handleAddToTeam = () => {
    const selectedEmployees = employees.filter((employee) => employee.selected);
    // Perform additional logic to add selected employees to the team
    console.log('Selected Employees:', selectedEmployees);
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6">Employee Page</h2>

      {/* Package Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Package</h3>
        <p className="mb-4">Current Package Limit: 10 members</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {/* Sample packages, replace with actual packages */}
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <span>5 members for $5</span>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Upgrade
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <span>10 members for $8</span>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Upgrade
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <span>20 members for $15</span>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* List of Unaffiliated Users */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Unaffiliated Users</h3>
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between border-b border-gray-200 py-4"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={employee.selected}
                onChange={() => handleSelectEmployee(employee.id)}
                className="mr-4"
              />
              <img
                src={employee.imageUrl}
                alt={employee.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <p className="ml-4">{employee.name}</p>
            </div>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleAddToTeam}
            >
              Add to Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddEmployee;
