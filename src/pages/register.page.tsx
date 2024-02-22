import { useState } from 'react'
import { FieldError, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { RegisterInputs, UserRegisterDto } from '../models/register.model';
import { fileSizeIsAllowed, fileTypeIsAllowed, formRules } from '../utils/form-rules.util';

export const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>();
  const [photoFields, setPhotoFields] = useState([{ id: uuidv4() }]);
  
  const onSubmitForm: SubmitHandler<RegisterInputs> = (data) => {
    const photosArray = Object.keys(data.photos).map((key, index) => ({
      name: data.photoNames && data.photoNames[`photoName${index + 1}`],
      photo: data.photos[key],
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, photoNames, ...dataSanitised } = data;
    const finalData: UserRegisterDto = { ...dataSanitised, photos: photosArray };
    
    console.log('finalData', finalData)
  }

  const handleAddPhoto = () => photoFields && setPhotoFields([...photoFields, { id: uuidv4() }])

  const renderFormFields = () => Object.keys(formRules).map((key: string) => {
    const field = key as keyof typeof formRules;
    const { type } = formRules[field];
    const error: FieldError | undefined = errors[field]
    const fieldOptions: RegisterOptions = formRules[field];

    return (
      <div key={field}>
        <label htmlFor={field}>{field}</label>
        <input type={type} {...register(field, fieldOptions)} />
        {error && <span>{error?.message}</span>}
      </div>
    )
  })
  
  const renderPhotoFields = () => photoFields.map((field, index) => {
    const error = errors.photos?.[`photo${index + 1}`];
    
    return (<div key={field.id}>
      <label htmlFor={`photos.photo${index + 1}`}>Photo {index + 1}</label>
      <input type="file" {...register(`photos.photo${index + 1}`, {
        required: index === 0,
        validate: {
          checkFileType: (value: FileList) => {
            console.log('File type', value[0].type.includes(value[0].type))
            return fileTypeIsAllowed(value[0].type)
          },
          checkFileSize: (value: FileList) => {
            console.log('File size', value[0].size)
            return fileSizeIsAllowed(value[0].size)
          }
        }
      })} />
      {error && <span>{error.message}</span>}
      <input type="text" {...register(`photoNames.photoName${index + 1}`)} />
    </div>
    )
  })

  return (
    <main>
      <h1>Register Page</h1>
      <p>Welcome to the register page.</p>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {renderFormFields()}        
        <h3>Add Up to 4 Photos</h3>
        {renderPhotoFields()}
        {photoFields.length < 4 && <button onClick={handleAddPhoto}>Add photo</button>}
        <input type="submit" />
      </form>
    </main>
  )
}
