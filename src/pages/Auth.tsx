import { useState } from 'react';
import musalaSoft from '../assets/download.png';
import SubmitIcon from '../assets/submit-success-check-mark-svgrepo-com.svg';
import loadingIcon from '../assets/loading-svgrepo-com.svg';
import AuthInput from '../components/Auth/AuthInput';
import { useDispatch } from 'react-redux';
import { login, signUp, setAuthError } from '../store/slices/authSilce';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

function Auth() {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);
  const authLoading = useSelector((state: RootState) => state.auth.isLoading);
  const [isloginForm, setIsloginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (email.trim() === '' || password.trim() === '') {
      dispatch(setAuthError({ msg: 'There can not be emty fields' }));
      return;
    }
    if (isloginForm) {
      dispatch(login({ email, password }));
    } else {
      dispatch(signUp({ email, password }));
    }
  };

  return (
    <div
      className='flex justify-center items-center'
      style={{ height: '100vh' }}
    >
      <div className='relative py-16 bg-gradient-to-br from-sky-50 to-gray-300'>
        <div className='relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40 '>
          <div className='m-auto '>
            <div
              className={`rounded-xl bg-white shadow-xl ${
                authError && 'border-2 border-rose-500'
              } transition`}
            >
              <div className='py-6 px-4'>
                <div className=' flex flex-col items-center justify-center'>
                  <img
                    src={musalaSoft}
                    loading='lazy'
                    className='w-24'
                    alt='tailus logo'
                  />
                  <h2 className='mt-2 text-2xl text-cyan-900 font-bold'>
                    Sign {isloginForm ? 'in' : 'up'} to unlock the <br /> best
                    of{' '}
                    <a
                      target='_blank'
                      className='text-blue-700'
                      href='https://www.musala.com/'
                    >
                      Musala Soft
                    </a>
                    .
                  </h2>
                </div>
                <div
                  className={`mt-6 ${
                    authError ? 'opacity-1' : 'opacity-0'
                  } text-rose-500 text-center transition`}
                >
                  *{authError}*
                </div>
                <div className='relative mt-6 flex justify-around flex-col px-4'>
                  <div
                    className={`absolute ${
                      !authLoading && 'hidden'
                    } top-0 left-0 opacity-75 bg-white w-full h-full flex items-center justify-center`}
                  >
                    <img src={loadingIcon} className='h-16 animate-spin' />
                  </div>
                  <AuthInput
                    state={email}
                    setState={setEmail}
                    placeHolder='Email'
                  />
                  <AuthInput
                    state={password}
                    setState={setPassword}
                    placeHolder='Password'
                    isPasswordType
                  />
                  <div className='flex flex-col sm:flex-row sm:gap-2 mt-4'>
                    <button
                      onClick={handleSubmit}
                      type='button'
                      className='flex items-center justify-center w-full sm:w-1/2 bg-gradient-to-r from-indigo-500  to-blue-500 hover:from-indigo-600  hover:to-blue-600 focus:outline-none text-white  uppercase font-bold shadow-md rounded-lg  py-2 '
                    >
                      <div className='flex sm:flex-cols-12 gap-2'>
                        <div className='col-span-1 flex items-center'>
                          <img src={SubmitIcon} className='h-6' />
                        </div>
                        <div className='col-span-2 '>
                          {isloginForm ? 'Login' : 'Sign up'}
                        </div>
                      </div>
                    </button>
                    <div className='flex items-center justify-center w-full sm:w-1/2 mt-4 sm:mt-0'>
                      <button
                        onClick={() => setIsloginForm(!isloginForm)}
                        className='text-blue-700'
                      >
                        {isloginForm
                          ? 'Not registered?'
                          : 'Already have an account?'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className='mt-8 text-gray-600 text-center'>
                  <p className='text-xs'>
                    Lorem ipsum dolor sit amet.
                    <a href='#'>Lorem</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
