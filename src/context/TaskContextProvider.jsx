import { createContext, useState } from 'react';
import axios from 'axios';
export const taskContext = createContext();

// eslint-disable-next-line react/prop-types
export default function TaskContextProvider({ children }) {
  const token = localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState({
    toDo: [
      {
        id: 1,
        taskTitle: 'Implement User Authentication',
        description: 'Develop and integrate user authentication using email and password',
        priority: 'urgent',
        deadline: '2024-08-03'
      }
    ],
    underReview: [
      {
        id: 2,
        taskTitle: 'Design Home Page UI',
        description: 'Develop and integrate user authentication using email and password',
        priority: 'urgent',
        deadline: '2024-08-03'
      }
    ],
    inProgress: [
      {
        id: 3,
        taskTitle: 'Integrate Cloud Storage',
        description: 'Develop and integrate user authentication using email and password',
        priority: 'low',
        deadline: '2024-08-03'
      }
    ],
    finished: [
      {
        id: 4,
        taskTitle: 'Conduct User Feedback Survey',
        description: 'Develop and integrate user authentication using email and password',
        priority: 'medium',
        deadline: '2024-08-03'
      }
    ]
  });

  async function createTask(taskObj) {
    const { priority, status, title, description, deadline } = taskObj;
    const customerInfo = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.post(
        // 'http://localhost:5000/create',
        'https://crework.bilzo.in/create',
        {
          user: customerInfo._id,
          priority,
          status,
          title,
          description,
          deadline
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.status === 201 || false;
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllTasks() {
    const customerInfo = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.get(
        // 'http://localhost:5000/all-tasks',
        'https://crework.bilzo.in/all-tasks',
        {
          params: {
            userId: customerInfo._id
          },
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setTasks(response.data.taskObj);
      return response.data.taskObj;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(taskId) {
    const customerInfo = JSON.parse(localStorage.getItem('user'));
    try {
      await axios.delete(
        // 'http://localhost:5000/delete',
        'https://crework.bilzo.in/delete',
        {
          id: taskId,
          userId: customerInfo._id
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function updateTask(taskId, status) {
    const customerInfo = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.put(
        // 'http://localhost:5000/update',
        'https://crework.bilzo.in/update',
        {
          id: taskId,
          userId: customerInfo._id,
          status
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.status === 200 || false;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <taskContext.Provider
      value={{
        getAllTasks,
        deleteTask,
        createTask,
        updateTask,
        tasks,
        setTasks,
        isOpen,
        setIsOpen
      }}
    >
      {children}{' '}
    </taskContext.Provider>
  );
}
