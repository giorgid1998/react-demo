import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

function App() {
  const [data, setData] = useState([
    { id: 1, name: "John", lastname: "Doe", idNumber: "01013467154", birth: "10.10.1985", car: { carNumber: "AB123CD", make: "Audi", model: "A4" } },
    { id: 2, name: "Jenny", lastname: "Chan", idNumber: "01013462654", birth: "10.10.1981", car: { carNumber: "AB789CD", make: "BMW", model: "X5" } },
    { id: 4, name: "Tony", lastname: "Frank", idNumber: "01013447654", birth: "10.10.1955", car: { carNumber: "AB789CD", make: "Subaru", model: "Outback" } },
    { id: 5, name: "Jeremy", lastname: "klark", idNumber: "01013567654", birth: "10.09.1995", car: { carNumber: "AB987CD", make: "Nissan", model: "Sentra" } },
    { id: 6, name: "Raimond", lastname: "Edwards", idNumber: "01013467654", birth: "10.10.2005", car: { carNumber: "AB123CD", make: "Mercedes-Benz", model: "C-Class" } },
    { id: 7, name: "Frank", lastname: "Mosa", idNumber: "01013487654", birth: "10.10.1995", car: { carNumber: "AB456CD", make: "Kia", model: "Sportage" } }
  ]);

  const [filteredData, setFilteredData] = useState(data);

  const [formData, setFormData] = useState({ id: '', name: '', lastname: '', idNumber: '', birth: '', car: { carNumber: '', make: '', model: '' } });
  const [editMode, setEditMode] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, car: { ...formData.car, [name]: value } });
  };

  const handleAdd = () => {
    const newData = { ...formData, id: Date.now() };
    setData([...data, newData]);
    setFormData({ id: '', name: '', lastname: '', idNumber: '', birth: '', car: { carNumber: '', make: '', model: '' } });
    setFilteredData([...filteredData, newData]);
  };

  const handleEdit = (id) => {
    const editedData = data.map(item => (item.id === id ? formData : item));
    setData(editedData);
    setFilteredData(editedData);
    setEditMode(null);
    setFormData({ id: '', name: '', lastname: '', idNumber: '', birth: '', car: { carNumber: '', make: '', model: '' } });
  };

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    setFilteredData(newData);
  };

  const handleEditClick = (id, name, lastname, idNumber, birth, car) => {
    setEditMode(id);
    setFormData({ id, name, lastname, idNumber, birth, car: { ...car } });
  };

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const newData = data.filter(row =>
      row.name.toLowerCase().includes(value)
    );
    setFilteredData(newData);
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Lastname",
      selector: row => row.lastname,
      sortable: true
    },
    {
      name: "Id Number",
      selector: row => row.idNumber,
      sortable: true
    },
    {
      name: "Date of Birth",
      selector: row => row.birth,
      sortable: true
    },
    {
      name: "Car Number",
      selector: row => row.car.carNumber,
      sortable: true
    },
    {
      name: "Car Make",
      selector: row => row.car.make,
      sortable: true
    },
    {
      name: "Car Model",
      selector: row => row.car.model,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          {editMode === row.id ? (
            <button onClick={() => handleEdit(row.id)}>Save</button>
          ) : (
            <>
              <button onClick={() => handleEditClick(row.id, row.name, row.lastname, row.idNumber, row.birth, row.car)}>Edit</button>
              <button onClick={() => handleDelete(row.id)}>Delete</button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <div className='text-end'><input type="text" placeholder="Search by Name" onChange={handleFilter} /></div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
      />

      <div className={editMode === null ? "mt-3" : "mt-3 edit-customer"}>
        <h3>{editMode === null ? "Add Customer" : "Edit Customer"}</h3>
        <div>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          <input type="text" name="lastname" placeholder="Lastname" value={formData.lastname} onChange={handleInputChange} />
          <input type="text" name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleInputChange} />
          <input type="text" name="birth" placeholder="Birth" value={formData.birth} onChange={handleInputChange} />
          <input type="text" name="carNumber" placeholder="Car Number" value={formData.car.carNumber} onChange={handleCarInputChange} />
          <input type="text" name="make" placeholder="Car Make" value={formData.car.make} onChange={handleCarInputChange} />
          <input type="text" name="model" placeholder="Car Model" value={formData.car.model} onChange={handleCarInputChange} />
          <button onClick={editMode === null ? handleAdd : () => handleEdit(editMode)}>{editMode === null ? "Add" : "Save"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
