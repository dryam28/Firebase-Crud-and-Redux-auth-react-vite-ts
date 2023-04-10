import React, { useState } from 'react';
import emailSVG from '../../assets/email-svgrepo-com.svg';
import eyeOpenVG from '../../assets/eye-svgrepo-com.svg';
import eyeCloseSVG from '../../assets/eye-svgrepo2-com.svg';

interface IAuthInput {
  placeHolder: string;
  isPasswordType?: boolean;
  state: string;
  setState: (value: string) => void;
}

function AuthInput({
  isPasswordType = false,
  placeHolder,
  state,
  setState,
}: IAuthInput) {
  const [showPass, setShowPass] = useState(false);

  const handleClick = () => {
    if (isPasswordType) setShowPass(!showPass);
  };

  return (
    <div className='my-2 border mx-auto border-[2px] justify-center flex items-center rounded-md shadow-md'>
      <div>
        <button
          onClick={handleClick}
          className='flex bg-gray-100 rounded-l-md border border-white justify-center text-white '
        >
          <img
            src={
              isPasswordType && showPass
                ? eyeOpenVG
                : isPasswordType
                ? eyeCloseSVG
                : emailSVG
            }
            className='max-h-6 m-2'
          />
        </button>
      </div>
      <div className='  w-full'>
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          type={
            isPasswordType && showPass
              ? 'text'
              : isPasswordType
              ? 'password'
              : 'email'
          }
          x-model='input1'
          className='w-full h-10 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none'
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
}

export default AuthInput;
