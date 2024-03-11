import React, { useContext, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const notify = () => toast.success("You have been logged in successfully");
  const auth = getAuth();
  const user = useContext(AuthContext);
  const [isExistingUser, setIsExistingUser] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailWrong, setEmailWrong] = useState(false);
  const [passwordWrong, setPasswordWrong] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user.setAsUser(userCredential.displayName);
        notify();
        navigate("/");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        if (errorCode === "auth/invalid-login-credentials") {
          setIsExistingUser(false);
          setTimeout(() => {
            setIsUserNotExisting(true);
          }, 3000);
        } else if (errorCode === "auth/invalid-email") {
          setEmailWrong(true);
          setTimeout(() => {
            setEmailWrong(false);
          }, 3000);
        } else if (errorCode === "auth/missing-password") {
          setPasswordWrong(true);
          setTimeout(() => {
            setPasswordWrong(false);
          }, 3000);
        } else if (errorCode === "auth/invalid-credential") {
          setPasswordWrong(true);
          setTimeout(() => {
            setPasswordWrong(false);
          }, 3000);
        }
      });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-100">
        <div className="relative w-auto my-6 mx-auto max-w-lg">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex p-5 rounded-t">
           <svg width="60px" height="60px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-lquEm" d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path></svg>
              <button
                className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => navigate("/")}
              >
                <AiFillCloseCircle />
              </button>
            </div>
            <div className="flex justify-center"></div>
            {/* body */}
            <div className="relative px-8 flex-auto">
              {!isExistingUser && (
                <div>
                  <p className="text-red-600 p-3 font-semibold">
                    Invalid username or password
                  </p>
                </div>
              )}
              <form className="p-3">
                <p className="font-bold text-2xl text-gray-700">Enter your email to login</p>
                <p className="p-3">
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    ref={emailRef}
                    className="rounded block w-full border border-gray-300 text-gray-700 p-4 outline-0 font-medium placeholder-gray-400"
                    type="email"
                    placeholder="Enter your email"
                  />
                </p>
                {emailWrong && (
                  <p className="text-red-600 p-3 font-bold">
                    Please enter a valid email address
                  </p>
                )}
                <p className="p-3">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    ref={passwordRef}
                    className="rounded block w-full border border-gray-300 text-gray-700 p-4 outline-0 font-medium placeholder-gray-400"
                    type="password"
                    placeholder="Type your password"
                  />
                </p>
                {passwordWrong && (
                  <p className="text-red-600 p-3 font-bold">
                    Password should contain at least 6 characters
                  </p>
                )}
              </form>
            </div>
            {/*footer*/}
            <div>
              <p className="text-center font-serif p-3">
                Don't have an account?
                <a
                  className="ms-2 text-blue-900 underline cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signup");
                  }}
                >
                  Signup
                </a>
              </p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => navigate("/")}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleLogin()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <Toaster />
    </>
  );
};

export default Login;
