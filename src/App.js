import * as React from 'react';
import {useState} from 'react';
import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {

    const [toDo, setToDo] = useState([]);

    const [newTask, setNewTask] = useState('');
    const [updateData, setUpdateData] = useState('');

    // Add task
    const addTask = () => {
        if(newTask) {
            let num = toDo.length + 1;
            let newEntry = {id: num, title: newTask, status: false}
            setToDo([...toDo, newEntry])
            setNewTask('');
        }
    }


    // Delete Task
    const deleteTask = (id) => {
        //setting all tasks excluding current id task
        let newTasks = toDo.filter(task => task.id !== id)
        setToDo(newTasks)
    }


    //Mark task as completed
    const markDone = (id) => {
        let newTask = toDo.map( task => {
            if(task.id === id) {
                return ({ ...task, status: !task.status })
            }
            return task;
        })
        setToDo(newTask);
    }


    // Cancel Update
    const cancelUpdate = () => {
        setUpdateData('');
    }

    // Change task for update
    const changeTask = (e) => {
        let newEntry = {
            id: updateData.id,
            title: e.target.value,
            status: updateData.status ? true : false
        }
        setUpdateData(newEntry);
    }

    // Update task
    const updateTask = () => {
        //deleting updating recoed here and adding in the coming lines
        let filterRecords = [...toDo].filter( task => task.id !== updateData.id);
        let updatedObject = [...filterRecords, updateData]
        setToDo(updatedObject);
        setUpdateData('');
    }



    return (
     <div className="container App">

        <br /><br />
        <h2>To Do List App (React JS)</h2>
        <br /><br />

        {/* Update task */}
        {updateData && updateData ? (
            <UpdateForm 
              updateData={updateData}
              changeTask={changeTask}
              cancelUpdate={cancelUpdate}
              updateTask={updateTask}
            />
        ) : (
           <AddTaskForm 
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
           />
        )
}

        



        {toDo && toDo.length ? '' : 'No tasks...'}
        <ToDo 
            toDo={toDo}
            markDone={markDone}
            setUpdateData={setUpdateData}
            deleteTask={deleteTask}
        />
        

     </div>  
    )
};

export default App;