import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { LuClipboardList } from "react-icons/lu";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user; // Get user info
            console.log("User Info:", user);
            alert(`Welcome ${user.displayName || "User"}!`);
            if (user) {
                navigate("/home"); // Use navigate instead of window.location.href
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Failed to log in. Please try again.");
        }
    };

    return (
        <div className="min-h-screen h-screen flex items-center justify-center bg-[#FFF9F9] overflow-hidden">
            <div className="lg:flex lg:items-center w-full max-w-7xl overflow-hidden px-4 sm:px-6">
                {/* Left Side (Text and Google Login Button) */}
                <div className="flex flex-col items-center lg:items-start lg:w-1/2 p-6">
                    <div className="text-center lg:text-left mb-6">
                        <div className="flex items-center justify-between">
                            <LuClipboardList className="text-2xl lg:text-4xl text-[#7B1984] mr-2" />
                            <span className="lg:text-4xl text-2xl font-semibold text-[#7B1984]">TaskBuddy</span>
                        </div>
                    </div>
                    <p className="lg:text-xl text-sm w-full text-center lg:text-left mb-8">
                        Streamline your workflow and track progress effortlessly with our all-in-one task management app.
                    </p>
                    <button
                        className="bg-[#292929] text-white lg:p-4 py-3 lg:rounded-3xl rounded-2xl flex items-center justify-center lg:justify-start w-[70vw] lg:w-auto"
                        onClick={handleGoogleLogin}
                    >
                        {/* Google Logo */}
                        <img src={"/googlelogo.png"} className="lg:w-10 z-50 lg:h-10 w-5 h-5 mr-4" alt="Google Logo" />
                        <span className="lg:text-2xl">Continue With Google</span>
                    </button>
                </div>

                {/* Right Side (Image) */}
                <div className="hidden h-[70vh] absolute right-[-20vw] z-10 lg:block w-[50vw]">
                    <img
                        className="h-auto w-[42vw] rounded-2xl shadow-xl"
                        src={"altarloginphoto.png"}
                        alt="Altar Login Illustration"
                    />
                </div>
            </div>
            {/* Circle Decorations */}
            <div className="flex justify-center lg:hidden items-center absolute bottom-[5vh] sm:left-[10vw] lg:left-[15vw]">
                <div className="w-48 h-48 rounded-full border-2 border-[#7B1984] flex justify-center items-center">
                    <div className="w-36 h-36 rounded-full border-2 border-[#7B1984] flex justify-center items-center">
                        <div className="w-24 h-24 rounded-full border-2 border-[#7B1984]"></div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center lg:hidden items-center absolute bottom-[60vh] left-[-17vh] sm:left-[-12vh] lg:left-[-15vh]">
                <div className="w-48 h-48 rounded-full border-2 border-[#7B1984] flex justify-center items-center">
                    <div className="w-36 h-36 rounded-full border-2 border-[#7B1984] flex justify-center items-center">
                        <div className="w-24 h-24 rounded-full border-2 border-[#7B1984]"></div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center lg:top-10 items-center absolute top-[-15vh] right-[0vh] sm:left-[-12vh] lg:left-[100vh]">
                <div className="w-48 h-48 lg:h-[80vh] lg:w-[45vw] rounded-full border-2 border-[#7B1984] flex justify-center items-center">
                    <div className="w-36 h-36 lg:h-[60vh] lg:w-[35vw] rounded-full border-2 border-[#7B1984] flex justify-center items-center">
                        <div className="w-24 h-24 lg:h-[30vh] lg:w-[20vw] rounded-full border-2 border-[#7B1984]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
