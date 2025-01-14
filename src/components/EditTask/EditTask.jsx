import React, { useState, useEffect, useRef } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoIosClose } from "react-icons/io";

const EditTask = ({ setTasks, taskData, buttonName }) => {
    const [valueBtn, setValueBtn] = useState(taskData.TaskStatus);
    const [isOpen, setIsOpen] = useState(false);
    const divRef = useRef(null);
    const [taskDetails, setTaskDetails] = useState({
        TaskTitle: taskData.TaskTitle,
        TaskDesc: taskData.TaskDesc,
        TaskCat: taskData.TaskCat,
        DueDate: taskData.DueDate,
        TaskStatus: taskData.TaskStatus,
        Id: taskData.Id,
        CreatedAt: taskData.CreatedAt,
        UpdatedAT: [taskData.updateAt]
    });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const updateChange = () => {
        const updatedTime = new Date().getTime()
        taskData.UpdatedAT.push(updatedTime)
        const existingTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
        const updatedTasks = existingTasks.map((task) =>
            task.Id === taskData.Id
                ? {
                    ...task,
                    TaskTitle: taskDetails.TaskTitle,
                    TaskDesc: taskDetails.TaskDesc,
                    TaskCat: taskDetails.TaskCat,
                    DueDate: taskDetails.DueDate,
                    TaskStatus: taskDetails.TaskStatus,
                    UpdatedAT: taskData.UpdatedAT
                }
                : task
        );
        localStorage.setItem("TaskDetails", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsFormOpen(!isFormOpen);
        updateChange();
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

    const modules = {
        toolbar: [['list', 'bullet'], ['bold', 'italic', 'strike']],
    };



    

    return (
        <>
            <button onClick={() => setIsFormOpen(!isFormOpen)}>{buttonName}</button>

            {isFormOpen && (
               <form
               onSubmit={handleSubmit}
               className="fixed top-0 left-0 w-full h-[100vh] lg:h-full bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center"
             >
               <div className="bg-white relative flex flex-col md:flex-row justify-between rounded-2xl p-8 w-11/12 md:w-3/4 h-[85%]">
                 <div className="w-full md:w-[60%]">
                   <div className="flex justify-between items-center mb-4">
                     <p className="text-gray-500 mb-4 text-2xl">Update Task</p>
                   </div>
             
                   <input
                     type="text"
                     placeholder="Task Title"
                     value={taskDetails.TaskTitle}
                     onChange={(e) =>
                       setTaskDetails({ ...taskDetails, TaskTitle: e.target.value })
                     }
                     className="block mt-2 w-full p-3 border bg-gray-50 border-gray-300 rounded-lg"
                   />
             
                   <div className="mt-6 mb-10 rounded-lg border-none">
                     <ReactQuill
                       modules={modules}
                       value={taskDetails.TaskDesc}
                       onChange={(content) =>
                         setTaskDetails({ ...taskDetails, TaskDesc: content })
                       }
                       placeholder="Description"
                       className="h-28"
                     />
                   </div>
             
                   <div className="flex flex-col md:flex-row justify-between items-start lg:mt-20 mt-12">
                     <div className="flex flex-col mb-4 md:mb-0">
                       <label className="text-gray-500">Task Category*</label>
                       <div className="flex">
                         <button
                           type="button"
                           onClick={() =>
                             setTaskDetails({ ...taskDetails, TaskCat: 'Work' })
                           }
                           className={`${
                             taskDetails.TaskCat === 'Work'
                               ? 'bg-[#7b1984] text-white'
                               : 'bg-gray-50 text-gray-900'
                           } border border-gray-300 text-sm px-3 py-2 rounded-full w-20 h-[40px] text-center`}
                         >
                           Work
                         </button>
                         <button
                           type="button"
                           onClick={() =>
                             setTaskDetails({ ...taskDetails, TaskCat: 'Personal' })
                           }
                           className={`${
                             taskDetails.TaskCat === 'Personal'
                               ? 'bg-[#7b1984] text-white'
                               : 'bg-gray-50 text-gray-900'
                           } border border-gray-300 text-sm px-3 py-2 rounded-full w-20 h-[40px] text-center`}
                         >
                           Personal
                         </button>
                       </div>
                     </div>
             
                     <div className="flex flex-col mb-4 md:mb-0">
                       <label className="text-gray-500">Due Date*</label>
                       <input
                         type="date"
                         value={taskDetails.DueDate}
                         onChange={(e) =>
                           setTaskDetails({ ...taskDetails, DueDate: e.target.value })
                         }
                         className="rounded-lg py-2 px-3 border border-gray-200"
                       />
                     </div>
             
                     <div className="relative mb-4 md:mb-0">
                       <label className="text-gray-500">Task Status*</label>
                       <button
                         type="button"
                         onClick={() => setIsOpen(!isOpen)}
                         className="bg-gray-50 border flex justify-between items-center border-gray-300 text-gray-900 text-sm px-3 py-2 rounded-xl w-32 h-[40px] text-left"
                       >
                         {valueBtn}
                         <FaAngleDown />
                       </button>
                       {isOpen && (
                         <div
                           ref={divRef}
                           className="absolute bg-[#FFF9F9] border z-50 p-3 lg:bottom-22 bottom-0 left-28 lg:right-10 border-[#7B198426] rounded-lg w-40 mt-2"
                         >
                           {['To Do', 'In Progress', 'Completed'].map((status) => (
                             <button
                               key={status}
                               type="button"
                               className="block w-full text-left px-3 py-1"
                               onClick={() => {
                                 setTaskDetails({
                                   ...taskDetails,
                                   TaskStatus: status,
                                 });
                                 setValueBtn(status);
                                 setIsOpen(false);
                               }}
                             >
                               {status}
                             </button>
                           ))}
                         </div>
                       )}
                     </div>
                   </div>
             
                   <div className="mt-3 lg:block hidden">
                     <span className="text-gray-500">Attachment</span>
                     <button className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm px-3 py-2 rounded-xl w-full h-[40px]">
                       Drag your file here or Update
                     </button>
                   </div>
             
                   <div className="bg-gray-200 border border-t-[2px] border-gray-300  w-[92vw] bottom-0 relative right-8 rounded-bl-2xl rounded-br-2xl">
                     <div className="flex justify-end p-3">
                       <button
                         type="button"
                         onClick={() => setIsFormOpen(false)}
                         className="bg-gray-50 border mr-3 text-center border-gray-300 text-gray-900 text-sm px-3 py-2 rounded-full w-20 h-[40px]"
                       >
                         Cancel
                       </button>
                       <button
                         type="submit"
                         className="bg-[#7b1984] border text-center border-gray-300 text-white text-sm px-3 py-2 rounded-full w-20 h-[40px]"
                       >
                         Update
                       </button>
                     </div>
                   </div>
                 </div>
             
                 <div className="lg:flex flex-col justify-between w-full md:w-[40%] hidden items-start mt-8 md:mt-0">
                   <div className="flex justify-between w-full items-center">
                     <h3 className="text-gray-500 mb-4 text-2xl">Activity</h3>
                     <button onClick={() => setIsFormOpen(!isFormOpen)}>
                       <IoIosClose className="text-4xl" />
                     </button>
                   </div>
                   <div className="w-full bg-gray-100 flex-1 p-4">
                     <div>
                       <div className="flex justify-between">
                         <p className="text-gray-500 text-xs">You created this task</p>
                         <span className="text-gray-500 text-xs">
                           {new Date(taskData.CreatedAt).toLocaleString('en-US', {
                             month: 'short',
                             day: 'numeric',
                           })}{' '}
                           at{' '}
                           {new Date(taskData.CreatedAt).toLocaleString('en-US', {
                             hour: 'numeric',
                             minute: 'numeric',
                             hour12: true,
                           })}
                         </span>
                       </div>
                       <div>
                         {taskData.UpdatedAT.map((data, index) => (
                           <div key={index} className="flex justify-between">
                             <p className="text-gray-500 text-xs">You Updated This Task</p>
                             <span className="text-gray-500 text-xs">
                               {new Date(data).toLocaleString('en-US', {
                                 month: 'short',
                                 day: 'numeric',
                               })}{' '}
                               at{' '}
                               {new Date(data).toLocaleString('en-US', {
                                 hour: 'numeric',
                                 minute: 'numeric',
                                 hour12: true,
                               })}
                             </span>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </form>
             
            )}
        </>
    );
};

export default EditTask;
