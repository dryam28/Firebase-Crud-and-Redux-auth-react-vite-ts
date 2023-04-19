import { useEffect, useState } from 'react';
import loadingIcon from '../../../assets/loading-svgrepo-com.svg';
import eyeIcon from '../../../assets/eye-white-svgrepo-com.svg';
import {
  IDeviceData,
  IGatewayData,
  editGateway,
} from '../../../firebase/services';
import Devices from './Devices';
import AddDeviceForm from './AddDeviceForm';

interface Props {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  data: IGatewayData | null;
  setRefreshData: (value: boolean) => void;
}

interface ActionButtonsProps {
  exitSaveData: boolean;
  loading: boolean;
  handleCloseModal: (refresh: boolean) => void;
  handleSave: () => void;
}

const ActionsButtons = ({
  exitSaveData,
  loading,
  handleSave,
  handleCloseModal,
}: ActionButtonsProps) => {
  return (
    <>
      <div
        className={`${
          exitSaveData ? 'h-max scale-1' : 'h-0 scale-0'
        } transition-all my-2`}
      >
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
        <span className='text-2xl font-medium'>Saved!!!</span>
      </div>
      <div className=' w-full relative'>
        {loading && (
          <div className='absolute bg-white opacity-75 w-full h-full flex items-center justify-center'>
            <img
              src={loadingIcon}
              className='h-10 animate-spin'
              alt='loading...'
            />
          </div>
        )}
        {!exitSaveData ? (
          <div className='flex gap-4'>
            <button
              onClick={() => handleSave()}
              className='p-3 bg-[#4F46E5] rounded-lg w-full text-white'
            >
              Save
            </button>
            <button
              onClick={() => handleCloseModal(false)}
              className='p-3 bg-slate-500 rounded-lg w-full text-white'
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleCloseModal(true)}
            className='p-3 bg-slate-500 rounded-lg w-full text-white'
          >
            Close
          </button>
        )}
      </div>
    </>
  );
};

const EditGatewayModal = ({ open, setOpen, data, setRefreshData }: Props) => {
  const [opacityTrans, setopacityTrans] = useState(false);
  const [addDeviceForm, setAddDeviceForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewDevices, setViewDevices] = useState(false);
  const [exitSaveData, setExitSaveData] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [devices, setDevices] = useState<IDeviceData[]>([]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  useEffect(() => {
    setSerialNumber(data?.serialNumber);
    setName(data?.name);
    setIpAddress(data?.ipAddress);
    setDevices(data?.devices);
  }, [data]);

  const handleCloseModal = (refresData: boolean) => {
    setopacityTrans(true);

    if (refresData) setRefreshData(true);

    setTimeout(() => {
      setopacityTrans(false);
      setOpen(false);
    }, 160);
  };

  const handleSave = () => {
    setLoading(true);
    editGateway(serialNumber, name, ipAddress, devices)
      .then(() => {
        setExitSaveData(true);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const addDevice = (device: IDeviceData, setError: (msg: string) => void) => {
    if (
      devices.filter((item: IDeviceData) => item.uid === device.uid).length > 0
    ) {
      setError('The "ID" cannot be repeated');
      return;
    }
    setAddDeviceForm(false);
    setDevices([...devices, device]);
  };

  return (
    <div
      className={`flex top-0 items-center justify-center transition-all 
      ${opacityTrans && 'opacity-0 '} 
      ${!open && 'hidden'}`}
      style={{ height: '100vh', width: '100vw', position: 'fixed' }}
    >
      <div
        id='modal-bg'
        onClick={() => handleCloseModal(false)}
        className={`w-full h-full bg-[#848A97] absolute z-0 transition duration-200 opacity-70`}
      />
      <div
        id='modal-box'
        className={`relative overflow-y-scroll z-1 sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] max-h-[95vh] transition-all flex flex-col items-center gap-2  p-6 bg-[#FFFF] rounded-lg ${
          opacityTrans && 'scale-0'
        }`}
      >
        <h3>Edit Gateway</h3>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name && name}
            // onChange={(e) => item.setter(e.target.value)}
            className='h-10 px-4 py-1 rounded border border-slate-400 text-gray-800'
            placeholder={'Name'}
          />
        </div>
        <div className='flex flex-col mt-3 gap-2'>
          <label htmlFor='name'>Ip Address</label>
          <input
            type='text'
            onChange={(e) => setIpAddress(e.target.value)}
            value={ipAddress && ipAddress}
            // onChange={(e) => item.setter(e.target.value)}
            className='h-10 px-4 py-1 rounded border border-slate-400 text-gray-800'
            placeholder={'Name'}
          />
        </div>
        <div className='mt-5 w-full'>
          <div className='text-lg mb-1 flex items-center px-2'>
            Total devices: {devices && devices.length}{' '}
            <button
              onClick={() => setAddDeviceForm(!addDeviceForm)}
              disabled={devices?.length === 10}
              className='hover:bg-sky-700 transition-all px-1 w-6 h-6 rounded w-auto bg-slate-500 ml-4 text-white flex items-center justify-center cursor-pointer'
              style={{ fontSize: '2rem', width: '24px', height: '24px' }}
            >
              {addDeviceForm ? '-' : '+'}
            </button>
            <button
              onClick={() => setViewDevices(!viewDevices)}
              disabled={devices?.length === 0}
              className={`${
                devices?.length === 0
                  ? 'bg-slate-300'
                  : 'bg-emerald-600 hover:bg-sky-700 cursor-pointer'
              }  transition-all px-1 w-6 h-7 rounded w-auto  ml-4 text-white flex items-center justify-center `}
              style={{ fontSize: '2rem' }}
            >
              <img src={eyeIcon} alt='see' className='w-6 h-6' />
            </button>
          </div>
          {addDeviceForm && <AddDeviceForm addDevice={addDevice} />}

          {viewDevices && <Devices devices={devices} setDevices={setDevices} />}
        </div>
        <ActionsButtons
          exitSaveData={exitSaveData}
          handleSave={handleSave}
          handleCloseModal={handleCloseModal}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditGatewayModal;
