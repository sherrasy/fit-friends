export const FORMAT_PATTERN = 'YYYY MM';

export const DEFAULT_OPTION_SPACE = 'application.db';

export const FILE_COLLECTION_NAME = 'files';

export const MAX_IMAGE_SIZE = 1048576;

export const FileError = {
  MimetypeError: 'Wrong file mimetype',
  InvalidSize: 'File size is too big',
} as const;

export const FilePath = {
  Main: 'files',
  Upload: '/upload',
  Id: '/:fileId',
} as const;

export const FileType = {
  Avatar: 'avatar',
  UserPhoto: 'user-photo',
  WorkoutPhoto: 'workout-photo',
  Certificate: 'certificate',
  Video: 'video',
} as const;

export const AllowedMimetype = {
  Image: ['jpeg', 'jpg', 'png'],
  File: ['pdf'],
  Video: ['mov', 'avi', 'mp4'],
};
