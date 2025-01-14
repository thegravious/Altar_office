import React from 'react';
import DisplayTaskBoxView from "../DisplayTaskBoxView/DisplayTaskBoxView"

const Todo = ({ tasks, setTasks , updatedTasks , result}) => {
    const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
    const inProcessTasks = existingTasks.filter(task => task.TaskStatus === "To Do")
    return (
        <div className="divide-y rounded-lg bg-gray-200 overflow-hidden max-w-6xl mt-4 mb-10 mx-auto w-[25vw]">
            <div>
                <div
                    className={`justify-between text-base text-left py-4 px-6 text-black flex transition-all items-center`}
                >
                    <span className="mr-4 p-2 rounded-lg bg-[#FAC3FF]">
                        {`To CompletedDo (${inProcessTasks.length})`}
                    </span>
                </div>
                <div className={`py-4 px-6 min-h-[30vh] h-[70vh]`}>
                {
                        result && result.length > 0 ? (
                            result.filter(data => data.TaskStatus === "To Do").map((task) => (
                                <DisplayTaskBoxView updatedTasks={updatedTasks} key={task.Id} task={task} setTasks={setTasks} />
                            ))
                        ) : (
                            updatedTasks && updatedTasks.length > 0 ? (
                                updatedTasks.filter(task => task.TaskStatus === "To Do").map((task) => (
                                    <DisplayTaskBoxView updatedTasks={updatedTasks} key={task.Id} task={task} setTasks={setTasks} />
                                ))
                            ) : 
                            (
                                inProcessTasks.filter(task => task.TaskStatus === "To Do").map((task)=>(
                                    <DisplayTaskBoxView updatedTasks={updatedTasks} key={task.Id} task={task} setTasks={setTasks} />
                                ))
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Todo;
