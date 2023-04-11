import React, { useState } from 'react';
import { createGateway } from '../../../firebase/services';
import { Props } from './types';

const AddGatewayForm = ({ data, setRefresh, refresh }: Props) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [name, setName] = useState('');
  const [ipAddress, setipAddress] = useState('');
  const [error, setError] = useState('');

  const inputs = [
    {
      state: serialNumber,
      setter: setSerialNumber,
      placeHolder: 'Serial number',
    },
    { state: name, setter: setName, placeHolder: 'Name' },
    { state: ipAddress, setter: setipAddress, placeHolder: 'Ip address' },
  ];

  const handleAdd = () => {
    if (
      serialNumber.trim() === '' ||
      name.trim() === '' ||
      ipAddress.trim() === ''
    ) {
      setError('There cannot be empty fields');
      return;
    }
    let tempData = data.filter((item) => item.serialNumber === serialNumber);
    if (tempData.length > 0) {
      setError('There cannot be two gateways with the same serial number');
      return;
    }

    createGateway(serialNumber, name, ipAddress);
    setRefresh(!refresh);
  };

  return (
    <div className='border-3 bg-slate-200 p-2 transition-all'>
      <div className='flex justify-center'>
        <button
          onClick={() => handleAdd()}
          className='bg-blue-500 text-white active:bg-indigo-600 text-md font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
        >
          Submit
        </button>
      </div>
      {error && <div className='text-center text-red-500'>{error}</div>}
      <div className='w-full flex flex-col gap-2'>
        {inputs.map((item, key) => (
          <input
            key={key}
            type='text'
            value={item.state}
            onChange={(e) => item.setter(e.target.value)}
            className='h-10 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none'
            placeholder={item.placeHolder}
          />
        ))}
      </div>
    </div>
  );
};

export default AddGatewayForm;
