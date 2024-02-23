import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';

import { useStore } from '../../contexts/store.context';

type LoginInputs = {
  email: string;
  password: string;
};

export const LoginPage = observer(() => {
  const { handleSubmit, register } = useForm<LoginInputs>();
  const {
    user: { isAuthenticated, unsetUserAuthentication }
  } = useStore();

  const onSubmitForm = (data: LoginInputs) => {
    console.log('data to authenticate', data);
  };

  return (
    <div className="login">
      <h1 className="login__title txt-xxl text-bold">{'Login'}</h1>
      <p className="login__text txt-m">{'Enter your details to login.'}</p>
      {isAuthenticated ? (
        <button type="submit" onClick={() => unsetUserAuthentication()}>
          {'Logout'}
        </button>
      ) : (
        <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
          <input
            type="email"
            placeholder="Enter your email"
            className="form__input"
            {...register('email', { required: true })}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="form__input"
            {...register('password', { required: true })}
          />
          <input
            type="submit"
            className="button button--primary form__button form__button--primary"
            value="Authenticate"
          />
        </form>
      )}
    </div>
  );
});
