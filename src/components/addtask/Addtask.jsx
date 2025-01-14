import React, { useState, useEffect, useRef } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoIosClose } from "react-icons/io";


//react drag and drop

const CreateBlog = ({setTasks}) => {
    const [valueBtn, setValueBtn] = useState("Category");
    const [isOpen, setIsOpen] = useState(false);
    const divRef = useRef(null);
    const [taskDetails, setTaskDetails] = useState({
        TaskTitle: "",
        TaskDesc: "",
        TaskCat: "Personal",
        DueDate: "",
        TaskStatus: "TO DO",
        Id : "",
        CreatedAt : new Date().getTime(),
        UpdatedAT :[new Date().getTime()]
    });

    const Savedata = () => {
        const _data = {...taskDetails , Id: new Date().getTime()}
        const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
        existingTasks.push(_data);
        localStorage.setItem("TaskDetails", JSON.stringify(existingTasks));
        setTasks(existingTasks)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setisformopen(!isformopen)
        Savedata()
    };

    useEffect(() => {
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

    const [isformopen, setisformopen] = useState(false);

    const modules = {
        toolbar: [
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'strike'],
        ],
    };

    return (
        <>
            <button
                onClick={() => setisformopen(!isformopen)}
                className='bg-[#7b1984] text-white uppercase rounded-full w-[152px] h-[48px]'
            >
                Add Task
            </button>

            <form onSubmit={handleSubmit}>
                {isformopen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center">
                        <div className="bg-white lg:top-10 lg:absolute lg:rounded-2xl p-4 lg:p-8 lg:w-2/4 lg:h-[90%] w-full rounded-tl-2xl rounded-tr-2xl h-[80vh]">
                            <div className='flex justify-between items-center'>
                                <p className='text-2xl text-gray-600'>Create Task</p>
                                <button
                                    onClick={() => setisformopen(!isformopen)}
                                >
                                    <IoIosClose className='text-4xl' />
                                </button>
                            </div>
                            <hr className="h-px lg:my-8 bg-gray-900 border-0 mx-auto dark:bg-gray-300"></hr>
                            <InputField
                                fieldTitle="Task Title"
                                fieldValue={taskDetails.TaskTitle}
                                setFieldValue={(e) => {
                                    setTaskDetails({ ...taskDetails, TaskTitle: e.target.value });
                                }}
                            />
                            <div className="lg:mt-6 mt-2 lg:mb-10 mb-12 rounded-lg border-none">
                                <ReactQuill
                                    modules={modules}
                                    value={taskDetails.TaskDesc}
                                    onChange={(content) => setTaskDetails({ ...taskDetails, TaskDesc: content })}
                                    placeholder='Description'
                                    className='placeholder-black h-28'
                                />
                            </div>

                            <div className='lg:flex flex-col lg:flex-row lg:justify-between  lg:items-center lg:mt-20'>
                                <div className='flex lg:flex flex-col justify-between'>
                                    <label className='text-gray-500 lg:text-xl text-xs mb-1' htmlFor="">Task Category*</label>
                                    <div className='flex'>
                                        <button
                                            type="button"
                                            onClick={() => setTaskDetails({ ...taskDetails, TaskCat: 'Work' })}
                                            className={`border flex justify-center items-center ${taskDetails.TaskCat === 'Work' ? 'bg-[#7b1984] text-white' : 'bg-gray-50 text-gray-900'} border-gray-300 text-gray-900 text-sm lg:px-3 lg:py-4 px-1 py-1 mr-2 mb-1 rounded-full lg:w-20 lg:h-[40px] w-16 h-[36px] text-center`}

                                        >
                                            Work
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setTaskDetails({ ...taskDetails, TaskCat: 'Personal' })}
                                            className={`border flex justify-center items-center ${taskDetails.TaskCat === 'Personal' ? 'bg-[#7b1984] text-white' : 'bg-gray-50 text-gray-900'} border-gray-300 text-gray-900 text-sm lg:px-3 lg:py-4 px-1 py-1 mr-2 mb-1 rounded-full lg:w-20 lg:h-[40px] w-16 h-[36px] text-center`}

                                        >
                                            Personal
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <label className='text-gray-500 lg:text-xl text-xs mb-1' htmlFor="">Due Date*</label>
                                    <input
                                        value={taskDetails.DueDate}
                                        onChange={(e) => {
                                            setTaskDetails({ ...taskDetails, DueDate: e.target.value });
                                        }}
                                        type="date"
                                        className='rounded-lg py-1 px-2 mb-1 border border-gray-200'
                                    />
                                </div>
                                <div>
                                    <label className='text-gray-500 text-xs lg:text-xl mb-1' htmlFor="">Task Status*</label>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="bg-gray-50 border flex justify-between items-center border-gray-300 text-gray-900 text-sm px-3 py-2 rounded-xl w-32 h-[40px] text-left"
                                    >
                                        {valueBtn}
                                        <FaAngleDown />
                                    </button>
                                    <div ref={divRef} className={`${isOpen ? "block" : "hidden"} absolute bg-[#FFF9F9] border p-3 bottom-22 right-10 border-[#7B198426]  rounded-lg w-40 mt-2`}>
                                        <button
                                            type="button"
                                            className="block w-full text-left px-2 py-1"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setTaskDetails({ ...taskDetails, TaskStatus: e.target.value });
                                                setValueBtn(e.target.value);
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
                                                setValueBtn(e.target.value);
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
                                                setValueBtn(e.target.value);
                                                setIsOpen(false);
                                            }}
                                            value="Completed"
                                        >
                                            Completed
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-3'>
                                <span className='text-gray-500 lg:text-xl  text-xs'>Attachment</span>
                                <button className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm px-3 py-2 rounded-xl w-full h-[40px]">
                                    Drag your file here or Update
                                </button>
                            </div>

                            <div className='bg-gray-200 border border-t-[2px] border-gray-300 absolute w-full left-0 rounded-bl-2xl rounded-br-2xl bottom-0'>
                                <div className='flex justify-end p-3'>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setisformopen(false);
                                        }}
                                        className="bg-gray-50 border mr-3 text-center border-gray-300 text-gray-900 text-sm px-3 py-2 rounded-full w-20 h-[40px]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className="bg-[#7b1984] border text-center border-gray-300 text-white text-sm px-3 py-2 rounded-full w-20 h-[40px]"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form >
        </>
    );
};

export default CreateBlog;

const InputField = ({ fieldTitle, fieldValue, setFieldValue }) => {
    return (
        <div className="lg:mt-10">
            <input
                type="text"
                placeholder={fieldTitle}
                value={fieldValue}
                onChange={setFieldValue}
                className="block mt-2 w-full p-3 border bg-gray-50 border-gray-300 rounded-lg"
            />
        </div>
    );
};
