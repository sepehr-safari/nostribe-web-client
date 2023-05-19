import localState from './LocalState';

export const report = (pub: string) => {
  if (confirm('Publicly report this user?')) {
    localState.get('muted').get(pub).set(true);
    // toast
  }
}

export const mute = (pub: string) => {
  if (confirm('Mute this user (private)?')) {
    localState.get('muted').get(pub).set(true);
    // toast
  }
}