import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useStore } from '../../contexts/store.context';
import { RequestResponse } from '../../models/error.model';
import { FormRules, formRules } from '../../utils/form-rules.util';

type LoginInputs = {
  email: string;
  password: string;
};

export const LoginPage = observer(() => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginInputs>();
  const {
    user: { isAuthenticated, unsetUserAuthentication, login, getUser }
  } = useStore();
  const [loginStatus, setLoginStatus] = useState<RequestResponse | null>(null);

  const onSubmitForm = async (data: LoginInputs) => {
    const response = await login(data);
    await getUser(); // gets and save the user data
    setLoginStatus(response);
  };

  // create a form validation getting the email and password from formRules
  const fieldOptions: Partial<FormRules> = {
    ...{ email: formRules.email },
    ...{ password: formRules.password }
  };

  return (
    <div className="login">
      <h1 className="login__title txt-xxl text-bold">{'Login'}</h1>
      {isAuthenticated ? (
        <>
          <p className="login__text txt-m">{`√ You are authenticated.`}</p>
          <button
            type="submit"
            className="button button--secondary form__button form__button--secondary"
            onClick={() => unsetUserAuthentication()}
          >
            {'Logout'}
          </button>
        </>
      ) : (
        <>
          <p className="login__text txt-m">{'Enter your details to login.'}</p>
          <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
            <input
              type="email"
              placeholder="Enter your email"
              className="form__input"
              {...register('email', fieldOptions['email'])}
            />
            {errors.email && <span className="form__error">{`✘ ${errors.email.message}`}</span>}

            <input
              type="password"
              placeholder="Enter your password"
              className="form__input"
              {...register('password', fieldOptions['password'])}
            />
            {errors.password && (
              <span className="form__error">{`✘ ${errors.password.message}`}</span>
            )}
            {loginStatus && !loginStatus.success && (
              <span className="form__error">{loginStatus.message}</span>
            )}
            <input
              type="submit"
              className="button button--primary form__button form__button--primary"
              value="Authenticate"
            />
          </form>
        </>
      )}
    </div>
  );
});
