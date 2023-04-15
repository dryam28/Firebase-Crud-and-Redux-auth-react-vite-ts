import React, { useEffect, useState } from 'react';
import { IGatewayData } from '../../../firebase/services';

interface Props {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  data: IGatewayData | null;
  setData: (data: IGatewayData) => void;
}

const EditGatewayModal = ({ open, setOpen, data, setData }: Props) => {
  const [opacityTrans, setopacityTrans] = useState(false);
  const [name, setName] = useState(data?.name);
  const [ipAddress, setIpAddress] = useState(data?.ipAddress);
  const [devices, setDevices] = useState(data?.devices);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const handleCloseModal = () => {
    setopacityTrans(true);

    setTimeout(() => {
      setopacityTrans(false);
      setOpen(false);
    }, 160);
  };
  return (
    <div
      className={`flex top-0 items-center justify-center transition-all overflow-hidden
      ${opacityTrans && 'opacity-0 '} 
      ${!open && 'hidden'}`}
      style={{ height: '100vh', width: '100vw', position: 'fixed' }}
    >
      <div
        id='modal-bg'
        onClick={handleCloseModal}
        className={`w-full h-full bg-[#848A97] absolute z-0 transition duration-200 opacity-70`}
      />
      <div
        id='modal-box'
        className={`relative z-1 sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] transition-all flex flex-col items-center gap-2  p-6 bg-[#FFFF] rounded-lg ${
          opacityTrans && 'scale-0'
        }`}
      >
        <h3>Edit Gateway</h3>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            value={data?.name}
            // onChange={(e) => item.setter(e.target.value)}
            className='h-10 px-4 py-1 rounded border border-slate-400 text-gray-800'
            placeholder={'Name'}
          />
        </div>
        <div className='flex flex-col mt-3 gap-2'>
          <label htmlFor='name'>Ip Address</label>
          <input
            type='text'
            value={data?.name}
            // onChange={(e) => item.setter(e.target.value)}
            className='h-10 px-4 py-1 rounded border border-slate-400 text-gray-800'
            placeholder={'Name'}
          />
        </div>
        <div className='flex flex-col mt-3 gap-2'>
          <label htmlFor='name'>Devices</label>
          <input
            type='text'
            value={data?.name}
            // onChange={(e) => item.setter(e.target.value)}
            className='h-10 px-4 py-1 rounded border border-slate-400 text-gray-800'
            placeholder={'Name'}
          />
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='text-[#059669] mx-auto h-11 rounded-full bg-[#D1FAE5] w-11'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M5 13l4 4L19 7'
          />
        </svg>
        <span className='text-2xl font-medium'>Payment Successful</span>
        <p className='text-center'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          consequatur?
        </p>
        <button
          id='modal-close'
          className='p-3 bg-[#4F46E5] rounded-lg w-full text-white'
        >
          Click Background
        </button>
      </div>
    </div>
  );
};

export default EditGatewayModal;
