import { useState } from 'react';
import { IDeviceData } from '../../../firebase/services';

interface Props {
  addDevice: (device: IDeviceData, setError: (msg: string) => void) => void;
}

const AddDeviceForm = ({ addDevice }: Props) => {
  const [error, setError] = useState('');
  const [uid, setUid] = useState('');
  const [vendor, setVendor] = useState('');
  const [status, setStatus] = useState<'online' | 'offline'>('online');
  const [dateCreated, setdateCreated] = useState('');

  const inputs = [
    { placeHolder: 'ID', value: uid, setter: setUid },
    { placeHolder: 'Vendor', value: vendor, setter: setVendor },
    { placeHolder: 'Created At', value: dateCreated, setter: setdateCreated },
  ];

  const handleAdd = () => {
    if (
      uid.trim() === '' ||
      vendor.trim() === '' ||
      dateCreated.trim() === ''
    ) {
      setError('There cannot be empty fields ');
      return;
    }
    addDevice({ uid, status, vendor, dateCreated }, setError);
  };

  return (
    <div className='p-2 flex flex-col border-4 border-slate-400 my-5 shadow-lg'>
      <h4 className='text-center uppercase'>Add device</h4>
      {inputs.map((item, key) => (
        <input
          key={key}
          type='text'
          value={item.value}
          onChange={(e) => item.setter(e.target.value)}
          className='h-10 px-4 py-1 rounded-r-md border border-gray-400 text-gray-800'
          placeholder={item.placeHolder}
        />
      ))}
      {/* Radio buttons */}
      <main className='flex w-full items-center justify-center'>
        <div
          className='grid w-[40rem] grid-cols-2 space-x-2 rounded-xl p-2'
          x-data='app'
        >
          <div>
            <input
              value={'online'}
              onChange={() => setStatus('online')}
              type='radio'
              name='option'
              id={'1'}
              className='peer hidden'
              defaultChecked
            />
            <label
              htmlFor={'1'}
              className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
            >
              online
            </label>
          </div>
          <div>
            <input
              value={'offline'}
              onChange={() => setStatus('offline')}
              type='radio'
              name='option'
              id={'2'}
              className='peer hidden'
            />
            <label
              htmlFor={'2'}
              className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
            >
              offline
            </label>
          </div>
        </div>
      </main>
      {error && <div className='text-center text-red-500'>{error}</div>}
      <button
        onClick={handleAdd}
        className='bg-indigo-500 text-white active:bg-indigo-600 text-xl font-bold uppercase px-3 py-2 mt-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        type='button'
      >
        Add
      </button>
    </div>
  );
};

export default AddDeviceForm;
