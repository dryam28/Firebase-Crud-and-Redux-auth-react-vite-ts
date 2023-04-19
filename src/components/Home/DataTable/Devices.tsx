import './devices.css';
import { IDeviceData } from '../../../firebase/services';
import deleteIcon from '../../../assets/delete.svg';

interface Props {
  devices: IDeviceData[];
  setDevices: (devices: IDeviceData[]) => void;
}

interface InputProps {
  item: IDeviceData;
  key2: 'status' | 'dateCreated' | 'vendor';
  handleEdit: (id: string, value: string, key: string) => void;
}

const Input = ({ item, key2, handleEdit }: InputProps) => {
  return (
    <div className='flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2'>
      <span className='bg-gray-400 h-2 w-2 m-2 rounded-full' />
      <div className='flex-grow font-medium w-2'>
        <input
          type='text'
          className='px-2 w-4/5'
          value={item[key2]}
          onChange={(e) => handleEdit(item.uid, e.target.value, key2)}
        />
      </div>
      <div className='text-sm font-normal text-gray-500 tracking-wide'>
        status
      </div>
    </div>
  );
};

const Devices = ({ devices, setDevices }: Props) => {
  const handleEdit = (id: string, value: string, key: string) => {
    let newDevices = [...devices];
    for (let i = 0; i < newDevices.length; i++) {
      if (newDevices[i].uid === id) {
        newDevices[i][key] = value;
        break;
      }
    }

    setDevices(newDevices);
  };

  const handleDelete = (id: string) => {
    let newDevices = devices.filter((item) => item.uid !== id);
    setDevices(newDevices);
  };

  return (
    <div className='w-full max-w-lg px-2 mx-auto'>
      {devices.map((item: IDeviceData, key) => (
        <details
          key={key}
          className='w-full bg-white border border-slate-400 cursor-pointer mb-3 rounded'
        >
          <summary className="w-full bg-white text-dark flex items-center justify-between px-2 py-1  after:content-['+']">
            <div className='flex items-center'>
              <button
                className='bg-red-500 p-1 rounded active:bg-sky-700 mr-2'
                onClick={() => handleDelete(item.uid)}
              >
                <img src={deleteIcon} alt='edit' className='h-5 ' />
              </button>
              ID: {item.uid}
            </div>
          </summary>
          <Input item={item} key2='status' handleEdit={handleEdit} />
          <Input item={item} key2='vendor' handleEdit={handleEdit} />
          <Input item={item} key2='dateCreated' handleEdit={handleEdit} />
        </details>
      ))}
    </div>
  );
};

export default Devices;
