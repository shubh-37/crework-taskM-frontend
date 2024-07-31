import moment from 'moment';
import { toast } from 'react-toastify';
export function getTimeOfDay() {
  const currentHour = moment().hour();

  if (currentHour >= 5 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
}

export function getTimeDifferenceInHours(createdAt) {
  const now = moment();
  const createdTime = moment(createdAt);
  const duration = moment.duration(now.diff(createdTime));
  const hours = duration.asHours();

  return hours;
}

export function notify(event, type) {
  event.preventDefault();
  if (type === 'failure') {
    toast.error('User not found!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else if (type === 'task-failure') {
    toast.error('Error creating task!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else if (type === 'update-failure') {
    toast.error('Error creating task!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else if (type === 'wrong email') {
    toast.error('Please enter valid email ID!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else if (type === 'success') {
    toast.success('Login successful!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else if (type === 'task-success') {
    toast.success('Task created successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else if (type === 'update-success') {
    toast.success('Task updated successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else {
    toast.error('Please try again after sometime!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }
}
