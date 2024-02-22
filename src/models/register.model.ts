type PhotoInputs = {
  [key: string]: FileList;
}

type PhotoNames = {
  [key: string]: string | undefined;
}

export type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  photos: PhotoInputs;
  photoNames: PhotoNames;
}

export interface UserRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photos: { name: string | undefined; photo: FileList }[];
}
