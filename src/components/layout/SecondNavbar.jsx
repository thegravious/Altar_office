import React from 'react'
import { FaList } from "react-icons/fa";
import { CiViewBoard } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { signOut } from 'firebase/auth';
import {auth} from "../login/firebase"
import Addtask from '../addtask/Addtask';


const SecondNavbar = ({setlist , list , setTasks}) => {
    const handleLogout = ()=>{
        signOut(auth).then(()=>{
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
        <div className='lg:block hidden'>
            <div className='flex justify-between  px-5'>
                <div className='flex justify-center items-center'>
                    <div className='flex justify-center items-center mr-2'>
                        <button
                        onClick={()=>{
                            setlist(true)
                        }}
                        className={`flex ${list? "underline underline-offset-4" : ""} justify-center items-center mr-2`}>
                        <FaList className='text-md mr-2' />
                        <span className='text-md'>List</span>
                        </button>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button 
                        onClick={()=>{
                            setlist(false)
                        }}
                        className={`flex ${list? "" : "underline-offset-4 underline"} justify-center items-center mr-2`}>
                        <CiViewBoard className='text-md mr-2' />
                        <span className='text-md'>Board</span>
                        </button>
                    </div>
                </div>
                <div className=''>
                    <button 
                    onClick={handleLogout}
                    className='flex justify-center bg-[#FFF9F9] rounded-lg border border-[#7B198426] px-2 py-1 items-center'>
                    <CiLogout className='text-md mr-2' />
                    <span className='text-md'>Logout</span>
                    </button>
                </div>
            </div>
        </div>
        <div className='lg:hidden block relative left-[150px]'>
        <Addtask setTasks={setTasks} />
        </div>
        </>
    )
}

export default SecondNavbar