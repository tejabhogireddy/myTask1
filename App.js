import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [dayButtons, setDayButtons] = useState([]);

  useEffect(() => {
    setFilteredItems(items);
    updateDayButtons(date); // Update day buttons when the component mounts
  }, [items]);

  const handleAddItem = () => {
    const newItem = { id: uuidv4(), title, description, date };
    setItems([...items, newItem]);
    setTitle('');
    setDescription('');
  };

  const handleEditItem = (id, editedTitle, editedDescription) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, title: editedTitle, description: editedDescription };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const renderItem = (item, index) => (
    <div key={item.id} className="item">
      <div className='text-container1' >
        <strong>  </strong> {item.title}
      </div>
      {item.description && (
        <div  className='text-container'>
          <strong>  </strong> {item.description}
        </div>
      )}
      <button className='btn3' onClick={() => handleDeleteItem(item.id)}>Delete</button>
    </div>
  );

  const handleDateChange = (date) => {
    setDate(date);
    const filtered = items.filter(item => new Date(item.date).toDateString() === date.toDateString());
    setFilteredItems(filtered);
    updateDayButtons(date); // Update day buttons when the date changes
  };

  const updateDayButtons = (date) => {
    const dayOfWeek = date.getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const updatedDayButtons = days.map((day, index) => (
      <button key={index} className={index === dayOfWeek ? 'btn2 active' : 'btn2'}>{day}</button>
    ));
    setDayButtons(updatedDayButtons);
  };

  return (
    <div className="container">
      <div className="form">
        <input
          className='txt1'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <DatePicker
          className='txt2'
          selected={date}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
        /><br/>
        <input
          type="text"
          className='txt3'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button className='btn1' onClick={handleAddItem}>Save</button>
      </div><br/>
      <div className="items">
        <div className='daybtn'>
          {dayButtons}
        </div>
        <div className="list">
          {filteredItems.map(renderItem)}
        </div>
      </div>
    </div>
  );
};

export default App;
