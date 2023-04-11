import React from 'react';
import eyeIcon from '../../../assets/eye-white-svgrepo-com.svg';

interface Props {
  data: any[];
  handleToggleSelectAll: () => void;
  isSelectedAll: boolean;
  handleSelectField: (id: string) => void;
}

const DataTableRows = ({
  data,
  handleSelectField,
  isSelectedAll,
  handleToggleSelectAll,
}: Props) => {
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
              IP Address
            </th>
            <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
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
                  {item.ipAddress}
                </td>
                <td className='flex justify-start items-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                  <i className='fas fa-arrow-up text-emerald-500 mr-4' />
                  {item.devices.length}
                  <button
                    className={`${
                      item.devices.length === 0 && 'hidden'
                    } bg-indigo-500 ml-2 text-white active:bg-indigo-600 text-xs font-bold uppercase p-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type='button'
                  >
                    <img src={eyeIcon} className='h-5' />
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
