import localState from '@/utils/LocalState';

export default {
  async checkExistingAccount(pub: string) {
    if (!['new.iris.to', 'iris.to', 'beta.iris.to', 'localhost'].includes(window.location.hostname)) {
      return;
    }
    // get username linked to pub along with its user_confirmed status
    const res = await fetch(`https://api.iris.to/user/find?public_key=${pub}`);
    if (res.status === 200) {
      const json = await res.json();
      console.log('existingIrisToAddress', json);
      localState.get('existingIrisToAddress').set(json);
      const timeout = setTimeout(() => {
        if (!json?.confirmed) {
          localState.get('showNoIrisToAddress').set(true);
        }
      }, 1000);
      localState.get('showNoIrisToAddress').on((show) => {
        if (show) {
          clearTimeout(timeout);
        }
      });
      return json;
    }
    const timeout = setTimeout(() => {
      localState.get('showNoIrisToAddress').set(true);
    }, 2000);
    localState.get('showNoIrisToAddress').on((show) => {
      if (!show) {
        clearTimeout(timeout);
      }
    });
    return;
  },

  setAsPrimary(name: string) {
    const newNip = name + '@iris.to';
    /*
    const timeout = setTimeout(() => {
      SocialNetwork.setMetadata({ nip05: newNip });
    }, 2000);
    SocialNetwork.getProfile(Key.getPubKey(), (p) => {
      if (p) {
        clearTimeout(timeout);
        if (p.nip05 !== newNip) {
          p.nip05 = newNip;
          SocialNetwork.setMetadata(p);
        }
      }
      this.setState({ profile: p, irisToActive: true });
    });
     */
  },

  async checkAvailability(name: string) {
    const res = await fetch(`https://api.iris.to/user/available?name=${encodeURIComponent(name)}`);
    if (res.status < 500) {
      const json = await res.json();
      if (json.available) {
        return { available: true };
      } else {
        return {
          available: false,
          message: json.message,
        }
      }
    } else {
      return {
        available: false,
        message: 'Error checking username availability',
      };
    }
  }

};
