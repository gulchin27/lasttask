import React from 'react';
import dayjs from 'dayjs';
import TaskCard from '../../TaskCard';
import { useSelector } from 'react-redux';
import Layout from '../../Layout'
const Today = () => {
  const tasks = useSelector((state) => state.tasks?.tasks || []);
  const Datetoday = dayjs().format('YYYY-MM-DD');

  const todaytasks = tasks.filter((task) => task.deadline === Datetoday);
{todaytasks.length > 0 ? (
   <div>
     {todaytasks.map((task) => (
         <TaskCard key={task.id} task={task} />
        ))}
      </div>
      ) : (
     <p>No tasks for today!</p>
   )}
  return (
    <div className='container'>
      <h1>Today's tasks</h1>
      <Layout/>
    </div>
  );
};

export default Today;
