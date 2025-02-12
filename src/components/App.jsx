import React, { useState } from 'react';
import Left from './Left';
import Middle from './Middle';
import Right from './Right';
import AuthPage from './AuthPage';

const App = () => {
  const [showInput, setShowInput] = useState(false); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handlePlusClick = () => {
    setShowInput(true);
  };

  const handleSaveTask = (task) => {
    setAppointments([...appointments, task]);
    setShowInput(false);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {!isAuthenticated ? (
        <AuthPage setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          <Left setSelectedDate={setSelectedDate} />
          <Middle
            selectedDate={selectedDate}
            showInput={showInput}
            setShowInput={setShowInput}
            appointments={appointments}
            setAppointments={setAppointments}
            onSaveTask={handleSaveTask}
            
          />
          <Right onPlusClick={handlePlusClick} />
        </>
      )}
    </div>
  );
};

export default App;
