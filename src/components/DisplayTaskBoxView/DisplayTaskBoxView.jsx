import React from 'react';
import EditTask from "../EditTask/EditTask";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const DisplayTask = ({ setTasks, updatedTasks, task }) => {
    console.log(updatedTasks); // Log to verify the structure of the updatedTasks array
    const [isVisible, setIsVisible] = React.useState(false);
    const divRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDelete = (taskId) => {
        const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
        const filteredTasks = existingTasks.filter(data => data.Id !== taskId);
        localStorage.setItem("TaskDetails", JSON.stringify(filteredTasks));
        setTasks(filteredTasks);
    };

    return (
        <div key={task.Id} className='p-3 mb-2 flex flex-col justify-between bg-white rounded-lg h-[15vh]'>
        <div className='flex justify-between items-center'>
            <div className="text-xl w-full text-black">{task.TaskTitle}</div>
            <div className="relative">
                <button onClick={() => setIsVisible(!isVisible)}>
                    <BsThreeDots className='text-xl`' />
                </button>
                <div ref={divRef} className={`${isVisible ? "block" : "hidden"} absolute bg-[#FFF9F9] border p-3 bottom-[-50px] right-5 border-[#7B198426] rounded-lg w-40 mt-2`}>
                    <button type="button" className="flex items-center w-full text-left px-3 py-1">
                        <AiFillEdit className='mr-2' />
                        <EditTask buttonName="Edit" taskData={task} setTasks={setTasks} />
                    </button>
                    <button
                        onClick={handleDelete}
                        type="button"
                        className="flex w-full items-center text-left px-3 py-1"
                    >
                        <RiDeleteBinFill className='mr-2' />
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <div className='flex justify-between items-center'>
            <div className="text-xs text-gray-700">{task.DueDate}</div>
            <div className="text-xs text-gray-700">{task.TaskCat}</div>
        </div>
    </div>
    );
};

export default DisplayTask;
