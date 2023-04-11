import { Dispatch, SetStateAction } from 'react';
import { IGatewayData } from '../../../firebase/services';

export interface Props {
  data: IGatewayData[] | any[];
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
}
