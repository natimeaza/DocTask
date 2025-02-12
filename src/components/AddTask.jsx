import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    if (!name || !description || !phone || !time) {
      setError("All fields are required. Please fill them out.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (!validateFields()) {
      return;
    }

    const newTask = {
      patientName: name,         
      description: description,  
      phone: phone,              
      time: time,              
      date: new Date().toISOString().split("T")[0]  
    };

    setIsLoading(true);

    axios
  .post("http://localhost:8080/api/appointments/add", newTask)
  .then((response) => {

    console.log("Success:", response.data);
    onSave(response.data);
    setName("");
    setDescription("");
    setPhone("");
    setTime("");
  })
  .catch((error) => {
    console.error("There was an error saving the task!", error);
  })

      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-2 bg-red-100 text-red-600 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-gray-800" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-800" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-800" htmlFor="phone">
          Phone No
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-800" htmlFor="time">
          Time
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          type="button"
          onClick={handleSave}
          className={`px-4 py-2 rounded text-white ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTask;
