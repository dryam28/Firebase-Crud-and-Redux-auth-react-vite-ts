interface Props {
  handleSetForm: (arg: boolean, arg2: boolean, ar3: boolean) => void;
  addGatewayForm: boolean;
  deleteGatewayForm: boolean;
  updateGatewayForm: boolean;
  isSelectedAll: boolean;
}

const TableHeader = ({
  handleSetForm,
  deleteGatewayForm,
  addGatewayForm,
  isSelectedAll,
}: Props) => {
  return (
    <div className='rounded-t mb-0 px-4 py-3 border-0'>
      <div className='flex flex-wrap items-center'>
        <div className='relative px-4 '>
          <h3 className='font-semibold text-base text-blueGray-700'>
            Gateways
          </h3>
        </div>
        <div className=' w-full px-4 max-w-full flex-grow flex-1 text-right'>
          {!addGatewayForm && (
            <button
              onClick={() => handleSetForm(!addGatewayForm, false, false)}
              className='bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
            >
              Add
            </button>
          )}
          {!deleteGatewayForm && (
            <button
              disabled={!isSelectedAll}
              onClick={() => handleSetForm(false, !deleteGatewayForm, false)}
              className={`${
                isSelectedAll ? 'bg-red-500 active:bg-red-600' : 'bg-slate-200'
              } text-white  text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
              type='button'
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
