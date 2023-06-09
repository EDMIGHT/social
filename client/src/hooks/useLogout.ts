import { setUserData } from '@/store/slices/user.slice';

import { useAppDispatch } from './reduxHooks';
import useLocalStorage from './useLocalStorage';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const [getLocalStorage, setLocalStorage, clearLocalStorage] = useLocalStorage();

  const clear = () => {
    clearLocalStorage();
    dispatch(setUserData(null));
  };

  return clear;
};

export default useLogout;
