import { useContext } from 'react';
import FormContext from './FormContext';

export function useForm() {
    return useContext(FormContext);
}
