import { RegisterOptions } from 'react-hook-form';
import { RegisterInputs } from '../models/register.model';

type FieldOptions = RegisterOptions & { type: string };
type ReducedInputs = Omit<RegisterInputs, 'photos' | 'photoNames'>;
type FormRules = {
  [K in keyof ReducedInputs]: FieldOptions;
};

export const fileTypeIsAllowed = (type: string): boolean | string => ['image/jpeg', 'image/jpg', 'image/png'].includes(type) || 'The file must be a jpeg or png';
export const fileSizeIsAllowed = (size: number): boolean | string => size < 1048576 || 'The file size must be less than 1MB';

export const formRules: FormRules = {
  firstName: {
    type: 'text',
    required: 'The firstName is required',
    minLength: { value: 2, message: 'First name must be at least 2 characters' },
    maxLength: { value: 25, message: 'First name cannot exceed 25 characters' }
  },
  lastName: {
    type: 'text',
    required: 'The lastName is required',
    minLength: { value: 2, message: 'Last name must be at least 2 characters' },
    maxLength: { value: 25, message: 'Last name cannot exceed 25 characters' }
  },
  email: {
    type: 'email',
    required: 'The email is required',
    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
  },
  password: {
    type: 'password',
    required: 'The password is required',
    minLength: { value: 6, message: 'Password must be at least 6 characters' },
    maxLength: { value: 50, message: 'Password cannot exceed 50 characters' },
    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, message: 'Password must be alphanumeric' }
  },
  confirmPassword: {
    type: 'password',
    required: 'The confirmPassword is required',
    validate: (value, { password }) =>
      value === password || 'The passwords do not match'
  },
};
