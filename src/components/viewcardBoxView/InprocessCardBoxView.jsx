import React from 'react';
import DisplayTaskBoxView from "../DisplayTaskBoxView/DisplayTaskBoxView"

const InprocessCard = ({ tasks , setTasks , updatedTasks, result}) => {
    const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
    const inProcessTasks = existingTasks.filter(task => task.TaskStatus === "In Progress")


    return (
        <div className="w-[25vw] divide-y bg-gray-200 rounded-lg overflow-hidden max-w-6xl mt-4 mb-10 mx-auto">
            <div>
                <div
                    className={`justify-between w-full text-base text-left py-4 px-6 text-black flex transition-all items-center`}
                >
                    <span className="mr-4 bg-[#85D9F1] p-3 rounded-lg">
                        {`In Process (${inProcessTasks.length})`}
                    </span>
                </div>
                <div className={`py-4 px-6 min-h-[30vh] flex flex-col`}>
                {
                        result && result.length > 0 ? (
                            result.filter(data => data.TaskStatus === "In Progress").map((task) => (
                                <DisplayTaskBoxView updatedTasks={updatedTasks} key={task.Id} task={task} setTasks={setTasks} />
                            ))
                        ) : (
                            updatedTasks && updatedTasks.length > 0 ? (
                                updatedTasks.filter(task => task.TaskStatus === "In Progress").map((task) => (
                                    <DisplayTaskBoxView updatedTasks={updatedTasks} key={task.Id} task={task} setTasks={setTasks} />
                                ))
                            ) : 
                            (
                                inProcessTasks.filter(task => task.TaskStatus === "In Progress").map((task)=>(
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

export default InprocessCard;
