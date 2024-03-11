import React, { useContext, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { AiFillCloseCircle } from 'react-icons/ai';


function Signup() {
  const navigate = useNavigate();
  const notify = () => toast.success('Successfully signed up');
  const user = useContext(AuthContext);
  const auth = getAuth();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [userNameState, setUserNameState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [emailState, setEmailState] = useState(false);

  const handleSignup = () => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!userName.trim() || !regex.test(userName)) {
      nameRef.current.focus();
      setUserNameState(true);
      setTimeout(() => {
        setUserNameState(false);
      }, 3000);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const date = new Date().toLocaleDateString();
          const userData = {
            Username: userName,
            Email: email,
            Password: password,
            CreatedAt: date,
          };
          await updateProfile(userCredential.user, { displayName: userName });
          setDoc(doc(db, 'users', userCredential.user.uid), userData)
            .then(() => {
              user.setAsUser(userCredential.user);
              notify();
              navigate('/');
            })
            .catch(() => {
              console.log('An error occurred');
            });
        })
        .catch((err) => {
          const errorCode = err.code;
          if (errorCode === 'auth/invalid-email') {
            setEmailState(true);
            emailRef.current.focus();
            setTimeout(() => {
              setEmailState(false);
            }, 3000);
          } else if (errorCode === 'auth/weak-password') {
            setPasswordState(true);
            passwordRef.current.focus();
            setTimeout(() => {
              setPasswordState(false);
            }, 3000);
          } else if (errorCode === 'auth/email-already-in-use') {
            setIsExistingUser(true);
            setTimeout(() => {
              setIsExistingUser(false);
            }, 3000);
          }
        });
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-100">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex p-5 rounded-t">
             
              <button
                className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => navigate('/')}
              >
                <AiFillCloseCircle />
              </button>
            </div>
            <div className="flex justify-center"></div>
            <div className="relative px-8 flex-auto">
              {isExistingUser && (
                <p className="text-red-600 p-3 font-semibold">You are already registered. Please login.</p>
              )}
              <form className="p-3">
                <p className="p-3">
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    ref={nameRef}
                    className="block w-full border rounded border-gray-600 text-gray p-4 outline-0 font-[0.95em]"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="username"
                    value={userName}
                  />
                </p>
                {userNameState && (
                  <p className="text-red-600 p-3 font-bold">Please enter a valid username</p>
                )}
                <p className="p-3">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                    className="block w-full border rounded border-gray-600 text-gray p-4 outline-0 font-[0.95em]"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </p>
                {emailState && (
                  <p className="text-red-600 p-3 font-bold">Please enter a valid email address</p>
                )}
                <p className="p-3">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    ref={passwordRef}
                    className="block w-full border rounded border-gray-600 text-gray p-4 outline-0 font-[0.95em]"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                  />
                </p>
                {passwordState && (
                  <p className="text-red-600 p-3 font-bold">Password should contain at least 6 characters</p>
                )}
              </form>
            </div>
            <div>
              <p className="text-center font-serif text-xl pb-3">
                Already have an account?
                <a
                  className="ms-3 text-blue-900 underline cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  Login
                </a>
              </p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => navigate('/')}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-green-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleSignup()}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <Toaster />
    </>
  );
}

export default Signup;
