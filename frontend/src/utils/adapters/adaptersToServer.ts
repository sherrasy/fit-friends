export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return formData;
  };
