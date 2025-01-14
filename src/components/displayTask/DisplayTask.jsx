import React from 'react';
import EditTask from "../EditTask/EditTask"
import { RiDeleteBinFill } from "react-icons/ri";
import { MdDragIndicator } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const DisplayTask = ({ checkTasks, setCheckTasks, task, setTasks}) => {
    const [valueBtn, setValueBtn] = React.useState(task.TaskStatus);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const divRef = React.useRef(null);

    // check or not
    const [isChecked,setIsChecked] = React.useState(false)

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

    const handleDelete = (e) => {
        e.preventDefault()
        const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
        const updatedTasks = existingTasks.filter(data => data.Id !== task.Id);
        localStorage.setItem("TaskDetails", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const handleChangeStatus = (e) => {
        e.preventDefault();
        const newStatus = e.target.value;
        const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
        const _data = existingTasks.map((curr) => {
            if (curr.Id === task.Id) {
                const _curr = { ...curr, TaskStatus: newStatus }
                return _curr
            }
            return curr
        })
        localStorage.setItem("TaskDetails", JSON.stringify(_data));
        setTasks(_data);
    };


    return (
        <div>
            <div key={task.Id} className='flex p-3 mb-2 items-center'>
                <div className='flex items-center'>
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        onChange={() => {
                            if(!isChecked){
                                console.log("added")
                                setCheckTasks([...checkTasks, task.Id])
                                setIsChecked(true)
                            }else{
                                console.log("removed")
                                setCheckTasks(checkTasks.filter((data)=>data!=task.Id))
                                setIsChecked(false)
                            }
                        }}

                        className="w-4 mx-0.5 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <MdDragIndicator className='text-xl text-gray-500 mx-0.5 lg:block hidden' />
                    <div className="inline-flex items-center mx-0.5">
                        <label className="flex items-center cursor-pointer relative">
                            <input
                                defaultChecked
                                type="checkbox"
                                className="peer h-6 w-6 lg:block hidden cursor-pointer transition-all appearance-none rounded-full bg-[#231f2071] shadow hover:shadow-md border border-slate-300 checked:bg-[#1B8D17] checked:border-[#1B8D17]"
                                id="check-custom-style"
                            />
                            <span className="absolute text-white peer-checked:text-white opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 lg:block hidden" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <div className="flex items-center w-full px-4 py-2">
                        <div className="flex- w-full lg:text-center text-black">{task.TaskTitle}</div>
                        <div className="flex- w-full lg:block hidden text-center text-black">{task.DueDate}</div>
                        <div className='lg:block hidden'>
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="border flex  justify-center items-center border-gray-300 bg-gray-300 text-gray-900 text-sm px-3 py-2 rounded-xl w-32 h-[40px] text-left"
                            >
                                {valueBtn}
                            </button>
                            <div ref={divRef} className={`${isOpen ? "block" : "hidden"} absolute bg-[#FFF9F9] border p-3 bottom-22 right-[480px] border-[#7B198426] rounded-lg w-40 mt-2`}>
                                <button
                                    type="button"
                                    className="block w-full text-left px-3 py-1"
                                    onClick={handleChangeStatus}
                                    value="To Do"
                                >
                                    To Do
                                </button>
                                <button
                                    type="button"
                                    className="block w-full text-left px-3 py-1"
                                    onClick={handleChangeStatus}
                                    value="In Progress"
                                >
                                    In Progress
                                </button>
                                <button
                                    type="button"
                                    className="block w-full text-left px-3 py-1"
                                    onClick={handleChangeStatus}
                                    value="Completed"
                                >
                                    Completed
                                </button>
                            </div>
                        </div>
                        <div className="flex- w-full lg:block hidden text-center text-black">{task.TaskCat}</div>
                    </div>
                    <div className="relative">
                        <button
                        className=''
                            onClick={() => {
                                setIsVisible(!isVisible)
                            }}
                        >
                            <BsThreeDots />
                        </button>
                        <div ref={divRef} className={` ${isVisible ? "block" : "hidden"} absolute bg-[#FFF9F9] border p-3 bottom-[-50px] right-5 border-[#7B198426] rounded-lg w-40 mt-2`}>
                            <button
                                type="button" className="flex items-center w-full text-left px-3 py-1">
                                <AiFillEdit className='mr-2' />
                                <EditTask buttonName="Edit" taskData={task} setTasks={setTasks} />
                            </button>
                            <button
                                onClick={handleDelete}
                                type="button" className="lg:flex w-full items-center hidden text-red-500 text-left px-3 py-1">
                                <RiDeleteBinFill className='mr-2' />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="h-px mb-3 w-[98vw] bg-gray-900 border-0 mx-auto dark:bg-gray-300" />
        </div>
    );
}

export default DisplayTask;
