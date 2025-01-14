import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import Addtask from '../addtask/Addtask';

const ThirdNavbar = ({ setTasks, setTaskToDisplay, getTask, setTosearch }) => {
    const [valueBtn, setValueBtn] = useState("Category");
    const [dueDate, setDueDate] = useState("Due Date");
    const [isOpen, setIsOpen] = useState(false);
    const [duedateIsOpen, setDueDateIsOpen] = useState(false);
    const divRef = useRef(null);
    const duedateRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (duedateRef.current && !duedateRef.current.contains(event.target)) {
                setDueDateIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="relative flex flex-col lg:flex-row justify-between px-5 items-center mt-3">
                {/* Filter Section */}
                    <span className='text-sm text-gray-600 lg:hidden block mb-3 w-full'>Filter by:</span>
                <div className="flex lg:flex-row gap-4 lg:gap-6 items-start w-full lg:items-center">
                    <span className='text-sm text-gray-600 hidden lg:block'>Filter by:</span>

                    {/* Category Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-gray-50 border flex justify-between items-center border-gray-300 text-gray-900 text-sm px-3 py-2 rounded-full lg:w-28 lg:h-[48px] text-left"
                    >
                        {valueBtn}
                        <FaAngleDown />
                    </button>

                    {/* Due Date Button */}
                    <button
                        onClick={() => setDueDateIsOpen(!duedateIsOpen)}
                        className="bg-gray-50 border flex justify-between items-center border-gray-300 text-gray-900 text-sm px-3 py-2 rounded-full lg:w-32 lg:h-[48px] text-left"
                    >
                        {dueDate}
                        <FaAngleDown />
                    </button>

                    {/* Category Dropdown */}
                    <div ref={divRef} className={`${isOpen ? "block" : "hidden"} absolute bg-[#FFF9F9] border p-3 top-12 left-14 border-[#7B198426] rounded-lg w-40 mt-2`}>
                        <button
                            className="block w-full text-left px-3 py-1"
                            onClick={(e) => {
                                setTaskToDisplay(e.target.value);
                                setValueBtn(e.target.value);
                                setIsOpen(false);
                            }}
                            value="Work"
                        >
                            Work
                        </button>
                        <button
                            className="block w-full text-left px-3 py-1"
                            onClick={(e) => {
                                setTaskToDisplay(e.target.value);
                                setValueBtn(e.target.value);
                                setIsOpen(false);
                            }}
                            value="Personal"
                        >
                            Personal
                        </button>
                    </div>

                    {/* Due Date Dropdown */}
                    <div ref={duedateRef} className={`${duedateIsOpen ? "block" : "hidden"} absolute bg-[#FFF9F9] border p-3 border-[#7B198426] top-12 left-44 rounded-lg w-44 mt-2`}>
                        <button
                            className="block w-full text-left px-3 py-1"
                            onClick={(e) => {
                                setDueDate(e.target.value);
                                setDueDateIsOpen(false);
                            }}
                            value="Ascending"
                        >
                            Ascending
                        </button>
                        <button
                            className="block w-full text-left px-3 py-1"
                            onClick={(e) => {
                                setDueDate(e.target.value);
                                setDueDateIsOpen(false);
                            }}
                            value="Descending"
                        >
                            Descending
                        </button>
                    </div>
                </div>

                {/* Search and Add Task Section */}
                <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0 items-center">
                    {/* Search Form */}
                    <form onSubmit={getTask} className="bg-white flex justify-center items-center px-1 py-1 rounded-full border border-gray-300 overflow-hidden max-w-md mx-auto font-[sans-serif] w-full">
                        <CiSearch className='text-gray-400 text-xl mr-1' />
                        <input
                            onChange={(e) => { setTosearch(e.target.value) }}
                            type='text' placeholder='search'
                            className="lg:w-[20vw] lg:h-[36px] w-[35vh] h-[30px] outline-none bg-white text-sm"
                        />
                    </form>

                    {/* Add Task Button */}
                    <div className='lg:block hidden'>
                    <Addtask setTasks={setTasks} />
                    </div>
                </div>
            </div>
            <hr className="h-px my-8 w-[98vw] bg-gray-900 border-0 mx-auto dark:bg-gray-300" />
        </>
    );
};

export default ThirdNavbar;
