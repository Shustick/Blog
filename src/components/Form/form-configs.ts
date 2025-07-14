import type { FormMode } from './Form';

export type FieldType = 'text' | 'email' | 'password';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  matchField?: string;
  maxLengthAtr?: number;
}

export const signUpFields: FieldConfig[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
    minLength: 3,
    maxLength: 20,
    maxLengthAtr: 40,
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    required: true,
    pattern: /^\S+@\S+$/,
    maxLengthAtr: 40,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    minLength: 6,
    maxLength: 40,
    maxLengthAtr: 50,
  },
  {
    name: 'repeatPassword',
    label: 'Repeat password',
    type: 'password',
    required: true,
    matchField: 'password',
    maxLength: 40,
    maxLengthAtr: 50,
  },
];

export const signInFields: FieldConfig[] = [
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    required: true,
    pattern: /^\S+@\S+$/,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    minLength: 6,
    maxLength: 40,
  },
];

export const editProfileFields: FieldConfig[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
    minLength: 3,
    maxLength: 20,
    maxLengthAtr: 40,
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    required: true,
    pattern: /^\S+@\S+$/,
    maxLengthAtr: 40,
  },
  {
    name: 'password',
    label: 'New password',
    type: 'password',
    minLength: 6,
    maxLength: 40,
    maxLengthAtr: 50,
  },
  {
    name: 'image',
    label: 'Avatar image (url)',
    type: 'text',
    pattern: /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/[\w\-./?&=%]*)*\.(jpg|jpeg|png|gif|webp|svg)$/i,
    maxLength: 200,
    maxLengthAtr: 250,
  },
];
//https://www.m24.ru/b/d/nBkSUhL2hFElnsizJb6BrNOp2Z318Ji-miDHnvyDoGuQYX7XByXLjCdwu5tI-BaO-42NvWWBK8AqGfS8kjIzIymM8G1N_xHb1A=AacUOr4T8ge73-pJlJbA0Q.jpg
export interface AgreementConfig {
  name: 'agreement';
  label: string;
  required?: boolean;
}

export const agreementField: AgreementConfig = {
  name: 'agreement',
  label: 'I agree to the processing of my personal information',
  required: true,
};

interface FormConfig {
  fields: FieldConfig[];
  agreementField?: AgreementConfig;
}

export const formConfigs: Record<FormMode, FormConfig> = {
  signIn: {
    fields: signInFields,
  },
  signUp: {
    fields: signUpFields,
    agreementField: agreementField,
  },
  editProfile: {
    fields: editProfileFields,
  },
};
