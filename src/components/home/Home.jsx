import React from 'react'
import Todo from "../Displaycard/Todo"
import Navbar from "../layout/SecondNavbar"
import Header from "../layout/Header"
import Tnavbar from "../layout/ThirdNavbar"
import InprocessCard from "../viewcard/InprocessCard"
import CompletedCard from "../viewcard/CompletedCard"
import ToDoViewBox from "../DisplayCardBoxView/ToDoBoxView"
import CompletedCardBoxView from '../viewcardBoxView/CompletedCardBoxView'
import InprocessCardBoxView from '../viewcardBoxView/InprocessCardBoxView'

const Home = () => {
  const [tasks, setTasks] = React.useState((JSON.parse(localStorage.getItem("TaskDetails")) || []))
  const [list, setlist] = React.useState(true)
  const [taskToDisplay , setTaskToDisplay] = React.useState("")
  const updatedTasks = tasks.filter(data => data.TaskCat === taskToDisplay);
  const [tosearch , setTosearch] = React.useState("")
  // console.log(tosearch)


  const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
  const result = existingTasks.filter(task => task.TaskTitle === tosearch)
  const getTask = (e) =>{
      e.preventDefault()
  }

  return (
    <div>
      <Header />
      <Navbar setlist={setlist} list={list} setTasks={setTasks} />
      <Tnavbar getTask={getTask} setTosearch={setTosearch} taskToDisplay={taskToDisplay} setTaskToDisplay={setTaskToDisplay} setTasks={setTasks} />
      <div className='min-h-screen'>
        <div>
          {
            list ?
              <>
                <div>
                  <Todo tosearch={tosearch}  result={result} updatedTasks={updatedTasks} tasks={tasks} setTasks={setTasks} />
                  <InprocessCard result={result} updatedTasks={updatedTasks} tasks={tasks} setTasks={setTasks} />
                  <CompletedCard result={result} updatedTasks={updatedTasks} tasks={tasks} setTasks={setTasks} />
                </div>
              </>
              :
              <>
                <div className='flex justify-around p-10'>
                  <ToDoViewBox result={result} updatedTasks={updatedTasks} tasks={tasks} setTasks={setTasks}/>
                  <InprocessCardBoxView result={result} updatedTasks={updatedTasks} tasks={tasks} setTasks={setTasks}/>
                  <CompletedCardBoxView result={result} updatedTasks={updatedTasks} tasks={tasks} setTasks={setTasks}/>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default Home