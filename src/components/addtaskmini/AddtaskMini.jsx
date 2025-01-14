import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { IoIosReturnLeft } from "react-icons/io";

const AddtaskMini = ({ setTasks }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isworkOpen, setIsworkOpen] = React.useState(false);
    const [taskDetails, setTaskDetails] = React.useState({
        TaskTitle: "",
        TaskDesc: "",
        TaskCat: "PERSONAL",
        DueDate: "",
        TaskStatus: "TO DO"
    });

    const Savedata = () => {
        const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
        existingTasks.push(taskDetails);
        localStorage.setItem("TaskDetails", JSON.stringify(existingTasks));
        setTasks(existingTasks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTaskDetails({
            TaskTitle: "",
            TaskDesc: "",
            TaskCat: "PERSONAL",
            DueDate: "",
            TaskStatus: "TO DO"
        });
        Savedata();
    };

    const divRef = React.useRef(null);
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const divWork = React.useRef(null);
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (divWork.current && !divWork.current.contains(event.target)) {
                setIsworkOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-between mt-3'>
                    <div>
                        <input
                            value={taskDetails.TaskTitle}
                            onChange={(e) => {
                                setTaskDetails({ ...taskDetails, TaskTitle: e.target.value });
                            }}
                            type="text"
                            className='focus:outline-none bg-gray-50'
                            placeholder='Task Title'
                        />
                    </div>
                    <div>
                        <input
                            value={taskDetails.DueDate}
                            onChange={(e) => {
                                setTaskDetails({ ...taskDetails, DueDate: e.target.value });
                            }}
                            placeholder='Add Date'
                            className='border border-1 border-gray-400 rounded-full p-2'
                            type="date"
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }}
                        className={`border border-gray-500 rounded-full w-10 min-w-28 h-10 flex justify-center items-center`}>
                        {taskDetails.TaskStatus === "TO DO" ? (
                            <FaPlus className='text-black' />
                        ) : (
                            <span className='text-black'>{taskDetails.TaskStatus}</span>
                        )}
                    </button>
                    <div ref={divRef} className={`${isOpen ? "block" : "hidden"} absolute bg-[#FFF9F9] border p-3 top-[380px] left-[900px] border-[#7B198426] rounded-lg w-40 mt-2`}>
                        <button
                            type="button"
                            className="block w-full text-left px-3 py-1"
                            onClick={(e) => {
                                e.preventDefault();
                                setTaskDetails({ ...taskDetails, TaskStatus: e.target.value });
                                setIsOpen(false);
                            }}
                            value="To Do"
                        >
                            To Do
                        </button>
                        <button
                            type="button"
                            className="block w-full text-left px-3 py-1"
                            onClick={(e) => {
                                e.preventDefault();
                                setTaskDetails({ ...taskDetails, TaskStatus: e.target.value });
                                setIsOpen(false);
                            }}
                            value="In Progress"
                        >
                            In Progress
                        </button>
                        <button
                            type="button"
                            className="block w-full text-left px-3 py-1"
                            onClick={(e) => {
                                e.preventDefault();
                                setTaskDetails({ ...taskDetails, TaskStatus: e.target.value });
                                setIsOpen(false);
                            }}
                            value="Completed"
                        >
                            Completed
                        </button>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsworkOpen(!isworkOpen);
                        }}
                        className='border border-gray-500 rounded-full w-10 min-w-28 h-10 flex justify-center items-center'>
                        {taskDetails.TaskCat === "PERSONAL" ? (
                            <FaPlus className='text-black' />
                        ) : (
                            <span className='text-black'>{taskDetails.TaskCat}</span>
                        )}
                    </button>
                    <div ref={divWork} className={`${isworkOpen ? "block" : "hidden"} absolute bg-[#FFF9F9] border p-3 top-[380px] right-[110px] border-[#7B198426] rounded-lg w-40 mt-2`}>
                        <button
                            type="button"
                            className="block w-full text-left px-3 py-1"
                            onClick={(e) => {
                                e.preventDefault();
                                setTaskDetails({ ...taskDetails, TaskCat: e.target.value });
                                setIsworkOpen(false);
                            }}
                            value="Work"
                        >
                            Work
                        </button>
                        <button
                            type="button"
                            className="block w-full text-left px-3 py-1"
                            onClick={(e) => {
                                e.preventDefault();
                                setTaskDetails({ ...taskDetails, TaskCat: e.target.value });
                                setIsworkOpen(false);
                            }}
                            value="Personal"
                        >
                            Personal
                        </button>
                    </div>
                </div>
                <div className='p-3 flex'>
                    <button type='submit' className="bg-[#7b1984] flex items-center justify-around border mr-3 text-center border-gray-300 text-white text-sm px-3 py-2 rounded-full w-20 h-[40px]">
                        Add
                        <IoIosReturnLeft className='text-2xl' />
                    </button>
                    <button className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm px-3 py-2 rounded-full w-20 h-[40px]">
                        Cancel
                    </button>
                </div>
            </form>
            <hr className="h-px mb-3 w-[98vw] bg-gray-900 border-0 mx-auto dark:bg-gray-300" />
        </>
    );
};

export default AddtaskMini;
