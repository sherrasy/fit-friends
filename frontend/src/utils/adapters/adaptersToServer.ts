import { FileTypeName } from '../constant';

export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append(FileTypeName.Avatar, file, file.name);
    return formData;
  };
