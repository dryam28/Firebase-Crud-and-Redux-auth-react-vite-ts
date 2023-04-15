import React, { useEffect, useState } from 'react';
import loadingIcon from '../../../assets/loading-svgrepo-com.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IGatewayData, getUserData } from '../../../firebase/services';
import AddGatewayForm from '../Forms/AddGatewayForm';
import DeleteGatewayForm from '../Forms/DeleteGatewayForm';
import UpdateGatewayForm from '../Forms/UpdateGatewayForm';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/slices/authSilce';
import TableHeader from './TableHeader';
import DataTableRows from './DataTableRows';
import EditGatewayModal from './EditGatewayModal';

const DataTable = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const uid = useSelector((state: RootState) => state.auth.uid);
  const [refreshData, setRefreshData] = useState(false);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [data, setData] = useState<IGatewayData[] | any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [addGatewayForm, setAddGatewayForm] = useState(false);
  const [deleteGatewayForm, setDeleteGatewayForm] = useState(false);
  const [updateGatewayForm, setUpdateeleteGatewayForm] = useState(false);
  const [updateGatewayFormData, setUpdateGatewayFormData] =
    useState<IGatewayData | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsLoadingData(false);
      let tempData: any[] = JSON.parse(JSON.stringify(userData));
      tempData.forEach((item) => {
        item.checked = false;
      });

      setData(tempData);
    }
  }, [userData]);

  useEffect(() => {
    setIsLoadingData(true);
    const func = async () => {
      const res = await getUserData(uid ? uid : '');
      dispatch(setUserData({ userData: res }));
    };

    setAddGatewayForm(false);
    setDeleteGatewayForm(false);
    setUpdateeleteGatewayForm(false);
    func();
  }, [refreshData]);

  useEffect(() => {
    setIsSelectedAll(data.filter((item) => item.checked).length > 0);
    handleSetForm(false, false, false);
  }, [data]);

  const handleSetForm = (
    addForm: boolean,
    deleteForm: boolean,
    updateForm: boolean
  ) => {
    setAddGatewayForm(addForm);
    setDeleteGatewayForm(deleteForm);
    setUpdateeleteGatewayForm(updateForm);
  };

  const handleSelectField = (id: string) => {
    let tempData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < tempData.length; i++) {
      if (tempData[i].serialNumber === id) {
        tempData[i].checked = !tempData[i].checked;
        break;
      }
    }

    setData(tempData);
  };

  const handleToggleSelectAll = () => {
    let tempData = JSON.parse(JSON.stringify(data));
    if (isSelectedAll) tempData.forEach((item: any) => (item.checked = false));
    else tempData.forEach((item: any) => (item.checked = true));

    setData(tempData);
  };

  if (isLoadingData) {
    return (
      <div
        className={` z-10 ${!isLoadingData && 'hidden'
          } top-0 left-0 bg-white w-full h-full flex items-center justify-center`}
      >
        <img src={loadingIcon} className='h-16 animate-spin' />
      </div>
    );
  }

  return (
    <div className=' bg-slate-300 py-10'>
      <div className='w-full px-0 sm:px-4 mx-auto '>
        <div
          className=' z-0 flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded '
          style={{ minHeight: '150px' }}
        >
          <TableHeader
            addGatewayForm={addGatewayForm}
            deleteGatewayForm={deleteGatewayForm}
            updateGatewayForm={updateGatewayForm}
            isSelectedAll={isSelectedAll}
            handleSetForm={handleSetForm}
          />
          {addGatewayForm && (
            <AddGatewayForm
              data={data}
              setRefresh={setRefreshData}
              refresh={refreshData}
              hideForm={setAddGatewayForm}
            />
          )}
          {deleteGatewayForm && (
            <DeleteGatewayForm
              setIsLoadingData={setIsLoadingData}
              data={data}
              setRefresh={setRefreshData}
              refresh={refreshData}
              hideForm={setDeleteGatewayForm}
            />
          )}
          <DataTableRows
            data={data}
            handleSelectField={handleSelectField}
            handleToggleSelectAll={handleToggleSelectAll}
            isSelectedAll={isSelectedAll}
            setUpdateModal={setOpenModal}
            setUpdateFormData={setUpdateGatewayFormData}
          />
        </div>
      </div>
      <EditGatewayModal
        open={openModal}
        setOpen={setOpenModal}
        setData={setUpdateGatewayFormData}
        data={updateGatewayFormData}
      />
    </div>
  );
};

export default DataTable;
