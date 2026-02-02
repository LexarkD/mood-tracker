import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store.ts';

//тут типизируются хуки, что бы не было ееобходимости типизировать их при каждом использовании
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
