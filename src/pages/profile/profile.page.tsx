import { observer } from 'mobx-react-lite';

import { useStore } from '../../contexts/store.context';

export const ProfilePage = observer(() => {
  const {
    user: { id, email, fullName, avatar, photos }
  } = useStore();

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <img className="profile__avatar" src={avatar} alt="Profile" />
        <div className="profile__text-wrapper">
          <h1 className="profile__title">{fullName}</h1>
          <p className="profile__text">{`ID: ${id}`}</p>
          <p className="profile__text">{`Email: ${email}`}</p>
        </div>
      </div>
      {photos.length > 0 && (
        <>
          <h2 className="profile__sub-title">Photos</h2>
          <ul className="profile__photos">
            {photos.map(photo => (
              <li className="profile__photo" key={photo.id}>
                <img className="profile__photo-img" src={photo.url} alt={photo.name} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
});
