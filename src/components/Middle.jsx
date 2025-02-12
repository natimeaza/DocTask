import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import { ChevronDown, ChevronUp, Edit, Trash2, Clock } from "lucide-react";
import axios from "axios";

const Middle = ({ selectedDate, showInput, setShowInput }) => {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskIndex, setExpandedTaskIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(dayjs(selectedDate));
    } else {
      setCurrentDate(dayjs());
    }
  }, [selectedDate]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/appointments/date?date=${currentDate.format("YYYY-MM-DD")}`
        );
        console.log("test-1")
       setTasks(response.data);
       
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [currentDate]);

  const handleSaveTask = async (task) => {
    const newTask = { ...task, date: currentDate.format("YYYY-MM-DD") };
  
    try {
      const response = await axios.post("http://localhost:8080/api/appointments/add", newTask);
      setTasks([...tasks, response.data]);
      setShowInput(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleRemoveTask = async (index) => {
    const taskToRemove = tasks[index];
    try {
      await axios.delete(`http://localhost:8080/api/appointments/${taskToRemove.id}`);
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };
  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setEditIndex(index);
    setEditedTask(taskToEdit);
  };

  const handleSaveEditedTask = async () => {
    try {
      console.log(editedTaski.id)
      const response = await axios.put(
        `http://localhost:8080/api/appointments/${editedTask.id}`,
        editedTask
      );
      setTasks((prevTasks) =>
        prevTasks.map((task, index) =>
          index === editIndex ? response.data : task
        )
      );
      setEditIndex(null);
      setEditedTask(null);
    } catch (error) {
      console.error("Error saving edited task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedTask(null);
  };

  const toggleTaskDetails = (index) => {
    setExpandedTaskIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const formattedDate = currentDate
    ? currentDate.format("dddd, MMMM D, YYYY")
    : "";

  const filteredTasks = tasks.filter(
    (task) => task.date === currentDate.format("YYYY-MM-DD")
  );

  return (
    <div className="w-1/2 bg-white my-12 mx-8 rounded-3xl p-6 shadow-lg relative">
      <h2 className="select-none font-semibold text-center text-2xl my-10 border-b-2 pb-5">
        {formattedDate}
      </h2>

      {showInput && (
        <div className="mb-4">
          <AddTask onSave={handleSaveTask} onCancel={() => setShowInput(false)} />
        </div>
      )}

      {filteredTasks.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Appointments
          </h3>
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50 relative"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Patient: {task.name}</h2>
                <div className="flex space-x-2">
                  {expandedTaskIndex === index ? (
                    <ChevronUp
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => toggleTaskDetails(index)}
                    />
                  ) : (
                    <ChevronDown
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => toggleTaskDetails(index)}
                    />
                  )}
                </div>
              </div>

              {expandedTaskIndex === index && (
                <div className="mt-3">
                  <p>
                    <strong>Description:</strong> {task.description}
                  </p>
                  <p>
                    <strong>Phone:</strong> {task.phone}
                  </p>
                  <p>
                    <strong>Time:</strong> {task.time}
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                      onClick={() => handleEditTask(index)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                      onClick={() => handleRemoveTask(index)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No appointments for this date.</p>
      )}

      {editIndex !== null && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-lg font-bold mb-4">Edit Appointment</h3>
            <input
              type="text"
              value={editedTask.name}
              onChange={(e) =>
                setEditedTask({ ...editedTask, name: e.target.value })
              }
              placeholder="Patient Name"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  description: e.target.value,
                })
              }
              placeholder="Description"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="time"
              value={editedTask.time}
              onChange={(e) =>
                setEditedTask({ ...editedTask, time: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSaveEditedTask}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Middle;
