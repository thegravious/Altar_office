import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import DisplayTask from '../displayTask/DisplayTask';

const InprocessCard = ({ tasks, setTasks, updatedTasks, result }) => {
    const [bulkDelete, setBulkDelete] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isCheckBoxOpen, setIscCheckBoxOpen] = useState(false);
    const [isopen, setIsOpen] = useState(true);
    const [checkTasks, setCheckTasks] = useState([]);
    const [dragValue, setDragValue] = useState({ dragstart: null, dragenter: null });

    const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
    const inProcessTasks = existingTasks.filter(task => task.TaskStatus === "In Progress");

    const deleteTaskbyid = (_id) => {
        const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
        const updatedTasks = existingTasks.filter(data => data.Id !== _id);
        localStorage.setItem("TaskDetails", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const updateTaskbyid = (_id, statusValue) => {
        const newStatus = statusValue;
        const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
        const _data = existingTasks.map((curr) => {
            if (curr.Id === _id) {
                const _curr = { ...curr, TaskStatus: newStatus }
                return _curr
            }
            return curr
        })
        localStorage.setItem("TaskDetails", JSON.stringify(_data));
        setTasks(_data);
    };

    const handleDragEnd = () => {
        const DrgWorkFor = "In Progress";
        const allData = JSON.parse(localStorage.getItem("TaskDetails")) || [];
        const targetData = allData.filter(data => data.TaskStatus === DrgWorkFor);
        const otherData = allData.filter(data => data.TaskStatus !== DrgWorkFor);

        const _temp = targetData.splice(dragValue.dragstart, 1)[0];
        targetData.splice(dragValue.dragenter, 0, _temp);

        const temp2 = otherData.concat(targetData);
        localStorage.setItem("TaskDetails", JSON.stringify(temp2));
        setTasks(temp2);
    };

    const renderTasks = (tasksToRender) => (
        tasksToRender.map((task, index) => (
            <div
                key={index}
                draggable
                onDragStart={() => setDragValue({ ...dragValue, dragstart: index })}
                onDragEnter={() => setDragValue({ ...dragValue, dragenter: index })}
                onDragEnd={handleDragEnd}
            >
                <DisplayTask
                    checkTasks={checkTasks}
                    setCheckTasks={setCheckTasks}
                    updatedTasks={updatedTasks}
                    task={task}
                    setTasks={setTasks}
                />
            </div>
        ))
    );

    return (
        <div className="border divide-y rounded-lg overflow-hidden max-w-6xl mt-4 mb-10 mx-auto">
            <div>
                <div className="justify-between w-full text-base text-left py-4 px-6 text-black bg-[#85D9F1] flex transition-all items-center">
                    <span className="mr-4">
                        {`In Progress (${inProcessTasks.length})`}
                    </span>
                    <button
                        type="button"
                        aria-expanded={isopen}
                        aria-label={isopen ? "Collapse section" : "Expand section"}
                        onClick={() => setIsOpen(!isopen)}
                        className="flex items-center"
                    >
                        {isopen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                <div className={`${isopen ? "block" : "hidden"} py-4 px-6 min-h-[30vh] flex flex-col bg-gray-50`}>
                    {
                        result && result.length > 0 ? renderTasks(result.filter(data => data.TaskStatus === "In Progress")) :
                            updatedTasks && updatedTasks.length > 0 ? renderTasks(updatedTasks.filter(task => task.TaskStatus === "In Progress")) :
                                renderTasks(inProcessTasks)
                    }

                    {/* Bulk delete and update */}
                    {
                        checkTasks.length > 0 && (
                            <div className="fixed flex items-center justify-between p-4 sm:p-6 md:p-8 h-14 rounded-xl bottom-10 left-1/2 transform -translate-x-1/2 bg-black lg:w-[40vw] w-[100%] m-1 text-center">
                            <span className="text-white border-gray-300 border text-xs sm:text-sm lg:text-lg px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                                {checkTasks.length} Tasks Selected
                            </span>
                            <div className='flex items-center gap-2'>
                                <button
                                    className="border flex justify-center items-center border-[#E13838] bg-[#ff35353b] lg:w-[9vw] text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-1 sm:py-2 rounded-full h-8 sm:h-10 lg:h-12"
                                    onClick={() => {
                                        checkTasks.forEach(taskid => deleteTaskbyid(taskid));
                                        setCheckTasks([]);
                                    }}
                                >
                                    <span className="mr-2 text-[#E13838] flex">DELETE</span>
                                </button>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIscCheckBoxOpen(!isCheckBoxOpen)}
                                        className="border flex justify-center items-center border-gray-300 bg-[#8d8a8a39] text-white lg:w-[9vw] text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-1 sm:py-2 rounded-full h-8 sm:h-10 lg:h-12"
                                    >
                                        Category
                                    </button>
                                    <div
                                        className={`${isCheckBoxOpen ? "block" : "hidden"} absolute bg-black border p-2 bottom-16 right-0 text-white rounded-lg w-36 mt-2`}
                                    >
                                        <button
                                            type="button"
                                            className="block w-full text-left px-2 py-1 text-xs sm:text-sm lg:text-base"
                                            onClick={() => {
                                                checkTasks.forEach(taskid => updateTaskbyid(taskid, "To Do"));
                                                setCheckTasks([]);
                                            }}
                                        >
                                            To Do
                                        </button>
                                        <button
                                            type="button"
                                            className="block w-full text-left px-2 py-1 text-xs sm:text-sm lg:text-base"
                                            onClick={() => {
                                                checkTasks.forEach(taskid => updateTaskbyid(taskid, "In Progress"));
                                                setCheckTasks([]);
                                            }}
                                        >
                                            In Progress
                                        </button>
                                        <button
                                            type="button"
                                            className="block w-full text-left px-2 py-1 text-xs sm:text-sm lg:text-base"
                                            onClick={() => {
                                                checkTasks.forEach(taskid => updateTaskbyid(taskid, "Completed"));
                                                setCheckTasks([]);
                                            }}
                                        >
                                            Completed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default InprocessCard;
