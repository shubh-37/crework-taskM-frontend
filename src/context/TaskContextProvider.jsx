import { createContext, useState } from 'react';
import axios from 'axios';
export const taskContext = createContext();

// eslint-disable-next-line react/prop-types
export default function TaskContextProvider({ children }) {
  const token = localStorage.getItem('token');
  const customerInfo = JSON.parse(localStorage.getItem('user'));
  const [tasks, setTasks] = useState({
    toDo: [
      {
        id: 1,
        title: 'Implement User Authentication',
        desc: 'Develop and integrate user authentication using email and password',
        priority: 'urgent',
        deadline: '2024-08-03'
      }
    ],
    underReview: [
      {
        id: 2,
        title: 'Design Home Page UI',
        desc: 'Develop and integrate user authentication using email and password',
        priority: 'urgent',
        deadline: '2024-08-03'
      }
    ],
    inProgress: [
      {
        id: 3,
        title: 'Integrate Cloud Storage',
        desc: 'Develop and integrate user authentication using email and password',
        priority: 'low',
        deadline: '2024-08-03'
      }
    ],
    finished: [
      {
        id: 4,
        title: 'Conduct User Feedback Survey',
        desc: 'Develop and integrate user authentication using email and password',
        priority: 'medium',
        deadline: '2024-08-03'
      }
    ]
  });

  async function createTask(taskObj) {
    const { priority, status, title, description, deadline } = taskObj;
    try {
      const response = await axios.post(
        'http://localhost:5000/create',
        // 'https://crework.bilzo.in/create'
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllTasks() {
    try {
      const response = await axios.get(
        'http://localhost:5000/all-tasks',
        // 'https://crework.bilzo.in/',
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
    try {
      await axios.delete(
        'http://localhost:5000/delete',
        // 'https://crework.bilzo.in/delete',
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
    try {
      const response = await axios.put(
        'http://localhost:5000/update',
        // 'https://crework.bilzo.in/delete',
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
        setTasks
      }}
    >
      {children}{' '}
    </taskContext.Provider>
  );
}
