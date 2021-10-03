export const AudioCmd = 'AudioCmd';

export const createSoundCommand = url => {
  return {
    [AudioCmd]: url,
  }
};
