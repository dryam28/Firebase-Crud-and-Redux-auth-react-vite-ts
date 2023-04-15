import React from 'react';
import eyeIcon from '../../../assets/eye-white-svgrepo-com.svg';
import editIcon from '../../../assets/edit-svgrepo-com.svg';
import { IGatewayData } from '../../../firebase/services';

interface Props {
  data: any[];
  handleToggleSelectAll: () => void;
  isSelectedAll: boolean;
  handleSelectField: (id: string) => void;
  setUpdateModal: (value: boolean) => void;
  setUpdateFormData: (value: IGatewayData) => void;
}

const DataTableRows = ({
  data,
  handleSelectField,
  isSelectedAll,
  handleToggleSelectAll,
  setUpdateModal,
  setUpdateFormData
}: Props) => {

  const handleEdit = (serialNumber: string) => {
    const tempData = data.filter(item => item.serialNumber = serialNumber)
    setUpdateFormData(tempData[0])
    setUpdateModal(true)
  }

  return (
    <div className='block w-full overflow-x-auto'>
      <table className='items-center bg-transparent w-full border-collapse '>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                name=''
                id=''
                className='ml-2 h-6 my-auto'
                onClick={handleToggleSelectAll}
                checked={isSelectedAll}
              />
            </th>
            <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
              Serial Number
            </th>
            <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
              Name
            </th>
            <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
              <div className='hidden sm:block'>IP Address</div>
            </th>
            <th className='px-6 bg-blueGray-50 hidden sm:block text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
              Devices
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((item, key) => (
              <tr key={key}>
                <th className='py-4 '>
                  <input
                    type='checkbox'
                    value={item.checked}
                    id=''
                    className='ml-2 h-6'
                    checked={item.checked}
                    onClick={() => handleSelectField(item.serialNumber)}
                  />
                </th>
                <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 '>
                  {item.serialNumber}
                </th>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 '>
                  {item.name}
                </td>
                <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                  <button
                    onClick={() => handleEdit(item.serialNumber)}
                    className={`bg-emerald-600 sm:hidden ml-2 text-white active:bg-indigo-600 text-xs font-bold uppercase p-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type='button'
                  >
                    <img src={eyeIcon} className='h-6' alt='edit' />
                  </button>
                  <div className='hidden sm:block'>{item.ipAddress}</div>
                </td>
                <td className='hidden sm:flex justify-between items-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4'>
                  {item.devices.length}
                  <button
                    onClick={() => handleEdit(item.serialNumber)}
                    className={`bg-emerald-600 ml-2 text-white active:bg-indigo-600 text-xs font-bold uppercase p-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type='button'
                  >
                    <img src={eyeIcon} className='h-6' alt='edit' />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {data && data.length === 0 && (
        <div className='text-4xl font-bold text-slate-700 mx-auto text-center py-4 w-full flex-1'>
          There is nothing to show
        </div>
      )}
    </div>
  );
};

export default DataTableRows;
