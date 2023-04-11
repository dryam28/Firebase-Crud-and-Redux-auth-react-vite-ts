import React, { useState } from 'react';
import { Props } from './types';
import { deleteGateways } from '../../../firebase/services';

interface DeleteProps extends Props {
  hideForm: (param: boolean) => void;
  setIsLoadingData: (param: boolean) => void;
}

const DeleteGatewayForm = ({
  data,
  setRefresh,
  refresh,
  hideForm,
  setIsLoadingData,
}: DeleteProps) => {
  const [error, setError] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const DeleteInfo = () => {
    let dataToDelete: string[] = [];
    let tempData = JSON.parse(JSON.stringify(data));
    tempData.forEach((item: any) => {
      if (item.checked) dataToDelete.push(item.serialNumber);
    });

    setIsLoadingData(true);
    deleteGateways(dataToDelete)
      .then((res) => setRefresh(!refresh))
      .catch((e) => console.log('Something went wrong'));
  };

  return (
    <div>
      <div className='text-red-500 text-center text-xl font-black '>
        Delete selected data?
      </div>
      <div className='flex justify-center gap-2 my-2'>
        <button
          onClick={() => DeleteInfo()}
          className='bg-red-500 text-white active:bg-indigo-600 text-md font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
        >
          Delete
        </button>

        <button
          onClick={() => hideForm(false)}
          className='bg-slate-500 text-white active:bg-indigo-600 text-md font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteGatewayForm;
