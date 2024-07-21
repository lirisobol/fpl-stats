import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
// Create typed versions of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => useSelector(selector);