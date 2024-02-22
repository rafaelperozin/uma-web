import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { FieldError, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { useStore } from '../../contexts/store.context';
import { RegisterInputs, UserRegisterDto } from '../../models/register.model';
import { fileSizeIsAllowed, fileTypeIsAllowed, formRules } from '../../utils/form-rules.util';

export const RegisterPage = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInputs>();
  const {
    user: { createUser }
  } = useStore();
  const [photoFields, setPhotoFields] = useState([{ id: uuidv4() }]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const onSubmitForm: SubmitHandler<RegisterInputs> = data => {
    const photosArray = Object.keys(data.photos).map((key, index) => ({
      name: data.photoNames && data.photoNames[`photoName${index + 1}`],
      photo: data.photos[key]
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, photoNames, ...dataSanitised } = data;
    const finalData: UserRegisterDto = { ...dataSanitised, photos: photosArray };

    console.log('finalData', finalData);

    createUser(finalData);
  };

  const handleAddPhoto = () => photoFields && setPhotoFields([...photoFields, { id: uuidv4() }]);

  const handleFileChange = (
    { target: { files } }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const currentFile = files && files[0];
    let newPreviewUrls: string[] = [];

    if (currentFile) {
      const currentFileUrl = URL.createObjectURL(currentFile);
      newPreviewUrls = [...previewUrls];
      newPreviewUrls[index] = currentFileUrl;
      setPreviewUrls(newPreviewUrls);
    } else {
      newPreviewUrls = [...previewUrls];
      newPreviewUrls[index] = '';
    }

    setPreviewUrls(newPreviewUrls);
  };

  const renderFormFields = () =>
    Object.keys(formRules).map((key: string) => {
      const field = key as keyof typeof formRules;
      const { type, placeholder } = formRules[field];
      const error: FieldError | undefined = errors[field];
      const fieldOptions: RegisterOptions = formRules[field];

      return (
        <div className="form__field" key={field}>
          <input
            className={`form__input${error ? ' form__input--error' : ''}`}
            placeholder={placeholder}
            type={type}
            {...register(field, fieldOptions)}
          />
          {error && <span className="form__error">{`✘ ${error.message}`}</span>}
        </div>
      );
    });

  const renderPhotoFields = () =>
    photoFields.map((field, index) => {
      const error = errors.photos && errors.photos[`photo${index + 1}`];

      return (
        <div className="photo-field" key={field.id}>
          <label
            className="photo-field__label"
            htmlFor={`photos.photo${index + 1}`}
          >{`Photo ${index + 1}${index === 0 ? ' (required)' : ''}`}</label>
          {previewUrls[index] && (
            <img
              className="photo-field__preview"
              src={previewUrls[index]}
              alt={`Preview Photo ${index + 1}`}
            />
          )}
          <input
            className={`form__input photo-field__input photo-field__input--file${error ? ' form__input--error' : ''}`}
            type="file"
            {...register(`photos.photo${index + 1}`, {
              validate: {
                required: (value: FileList) => {
                  return index === 0 && !value[0] ? 'The photo is required' : true;
                },
                checkFileType: (value: FileList) => {
                  return value[0] ? fileTypeIsAllowed(value[0].type) : true;
                },
                checkFileSize: (value: FileList) => {
                  return value[0] ? fileSizeIsAllowed(value[0].size) : true;
                }
              }
            })}
            onChange={e => handleFileChange(e, index)}
          />
          {error && <span className="form__error photo-field__error">{`✘ ${error.message}`}</span>}

          <input
            placeholder={`Photo name`}
            className="form__input photo-field__input"
            type="text"
            {...register(`photoNames.photoName${index + 1}`)}
          />
        </div>
      );
    });

  return (
    <div className="register">
      <h1 className="register__title txt-xxl text-bold">Register</h1>
      <p className="register__text txt-m">Enter your details to register</p>
      <form className="default-theme__form form" onSubmit={handleSubmit(onSubmitForm)}>
        {renderFormFields()}
        <h3 className="form__section-title txt-xl txt-bold">Photos</h3>
        <p className="form__section-text txt-m">Upload up to 4 photos</p>
        {renderPhotoFields()}
        {photoFields.length < 4 && (
          <button className="button button--secondary" onClick={handleAddPhoto}>
            Add photo
          </button>
        )}
        <input
          className="button button--primary form__button form__button--primary"
          type="submit"
        />
      </form>
    </div>
  );
});
