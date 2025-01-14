import React from 'react';
import { LuClipboardList } from "react-icons/lu";
import { auth, provider } from "../login/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
    const [userDetails, setUserDetails] = React.useState(null);

    React.useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                let {photoURL} = currentUser
                setUserDetails({
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                    photo: currentUser?.photoURL,
                });
            } else {
                window.location.href = "/";
            }
        });
    }, []);

    return (
        <div>
            <div className='px-4 py-2 flex justify-between mt-3'>
                {userDetails ? (
                    <>
                        <div className='flex justify-start items-center'>
                            <LuClipboardList className='text-2xl mr-2 hidden lg:block' />
                            <span className='lg:text-2xl text-lg font-bold'>TaskBuddy</span>
                        </div>
                        <div className='flex justify-end items-center'>
                            <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                                <img src={userDetails?.photo} className="object-cover w-full h-full" alt="avatar" />
                            </div>
                            <div className="ml-2">
                                <span className='font-semibold text-xl lg:block hidden'>{userDetails?.name}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Header;
