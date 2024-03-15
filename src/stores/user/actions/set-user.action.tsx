import { UserResponse } from '../../../models/user.model';

export const setUserAction = (self: any) =>
  function (data: UserResponse) {
    self.setEmail(data.email);
    self.setFirstName(data.firstName);
    self.setLastName(data.lastName);
    data.role && self.setRole(data.role);
    self.setIsActive(data.isActive);
    self.setAvatar(data.avatar);
    self.setCreatedAt(new Date(data.createdAt));
    self.setUpdatedAt(new Date(data.updatedAt));
    self.setId(data.id);
    data.photos && self.setPhotos(data.photos);
  };
