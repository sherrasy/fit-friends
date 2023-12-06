import { FileTypeName } from '../constant';

export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append(FileTypeName.Avatar, file, file.name);
    return formData;
  };

export const adaptVideoToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append(FileTypeName.Video, file, file.name);
    return formData;
  };

export const adaptCertificateToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append(FileTypeName.Certificate, file, file.name);
    return formData;
  };
