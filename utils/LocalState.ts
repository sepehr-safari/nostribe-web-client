import _ from 'lodash';
import { useEffect, useState, useCallback } from 'react';

export type Unsubscribe = () => void;

export type Callback = (data: any, path: string, unsub: Unsubscribe) => void;

// Localforage returns null if an item is not found, so we represent null with this uuid instead.
// not foolproof, but good enough for now.
const notInLocalStorage = new Set();

const LEAF = 1;
const BRANCH = 2;

class Node {
  path: string;
  parent: Node | null;
  children = new Map<string, Node>();
  on_subscriptions = new Map();
  list_subscriptions = new Map();
  value: any = undefined;
  counter = 0;
  loaded = false;

  /** */
  constructor(path = 'localState', parent: Node | null = null) {
    this.path = path;
    this.parent = parent;
  }

  saveLocalStorage = _.throttle(async () => {
    if (!this.loaded) {
      await this.loadLocalStorage();
    }
    try {
      if (this.children.size) {
        const children = Array.from(this.children.keys());
        const val = JSON.stringify({ type: BRANCH, value: children });
        localStorage.setItem(this.path, val);
      } else if (this.value === undefined) {
        localStorage.removeItem(this.path);
      } else {
        const val = JSON.stringify({ type: LEAF, value: this.value });
        localStorage.setItem(this.path, val);
      }
    } catch (e) {
      console.error(e);
    }
  }, 500);

  loadLocalStorage = _.throttle(async () => {
    if (notInLocalStorage.has(this.path)) {
      return undefined;
    }
    let result = undefined;
    try {
      result = localStorage.getItem(this.path);
    } catch (e) {
      console.error(e);
    }
    // getItem returns null if not found
    if (result === null || result === undefined) {
      result = undefined;
      notInLocalStorage.add(this.path);
    } else {
      try {
        result = JSON.parse(result);
        if (result?.type && result?.value) {
          if (result.type === BRANCH) {
            // result is a list of children
            const newResult = {} as any;
            await Promise.all(
              result.value.map(async (key: string) => {
                newResult[key] = await this.get(key).once();
              })
            );
            result = newResult;
          } else if (result.type === LEAF) {
            result = result.value;
          }
        } else {
          result = undefined;
          notInLocalStorage.add(this.path);
          console.log('invalid result', this.path, result);
        }
      } catch (e) {
        console.error(e);
        result = null;
        notInLocalStorage.add(this.path);
      }
    }
    this.loaded = true;
    return result;
  }, 500);

  doCallbacks = _.throttle(() => {
    for (const [id, callback] of this.on_subscriptions) {
      const unsub = () => this.on_subscriptions.delete(id);
      this.once(callback, unsub, false);
    }
    if (this.parent) {
      for (const [id, callback] of this.parent.on_subscriptions) {
        const unsub = () => this.parent?.on_subscriptions.delete(id);
        this.parent.once(callback, unsub, false);
      }
      for (const [id, callback] of this.parent.list_subscriptions) {
        const unsub = () => this.parent?.list_subscriptions.delete(id);
        this.once(callback, unsub, false);
      }
    }
  }, 40);

  /**
   *
   * @param key
   * @returns {Node}
   * @example node.get('users').get('alice').set({name: 'Alice'})
   */
  get(key: string) {
    const existing = this.children.get(key);
    if (existing) {
      return existing;
    }
    const new_node = new Node(`${this.path}/${key}`, this);
    this.children.set(key, new_node);
    this.saveLocalStorage();
    return new_node;
  }

  /**
   * Set a value to the node. If the value is an object, it will be converted to child nodes.
   * @param value
   * @example node.get('users').get('alice').set({name: 'Alice'})
   */
  set(value: any) {
    if (Array.isArray(value)) {
      throw new Error('Cannot set an array as a value');
    }
    if (typeof value === 'object' && value !== null) {
      this.value = undefined;
      for (const key in value) {
        this.get(key).set(value[key]);
      }
      _.defer(() => this.doCallbacks(), 100);
      return;
    }
    this.children = new Map();
    this.value = value;
    this.doCallbacks();
    this.saveLocalStorage();
  }

  // protip: the code would be a lot cleaner if you separated the Node API from storage adapters.
  /**
   * Return a value without subscribing to it
   * @param callback
   * @param event
   * @param returnIfUndefined
   * @returns {Promise<*>}
   */
  async once(
    callback?: Callback,
    unsub?: Unsubscribe,
    returnIfUndefined = true
  ): Promise<any> {
    let result: any;
    if (this.children.size) {
      // return an object containing all children
      result = {};
      await Promise.all(
        Array.from(this.children.keys()).map(async (key) => {
          result[key] = await this.get(key).once(undefined, unsub);
        })
      );
    } else if (this.value !== undefined) {
      result = this.value;
    } else {
      result = await this.loadLocalStorage();
    }
    if (result !== undefined || returnIfUndefined) {
      callback &&
        callback(
          result,
          this.path.slice(this.path.lastIndexOf('/') + 1),
          unsub || (() => {})
        );
      return result;
    }
  }

  /**
   * Subscribe to a value
   * @param callback
   */
  on(callback: Callback): Unsubscribe {
    const id = this.counter++;
    this.on_subscriptions.set(id, callback);
    const unsub = () => this.on_subscriptions.delete(id);
    this.once(callback, unsub, false);
    return unsub;
  }

  /**
   * Subscribe to the children of a node. Callback is called separately for each child.
   * @param callback
   * @returns {Promise<void>}
   */
  list(callback: Callback): Unsubscribe {
    const id = this.counter++;
    this.list_subscriptions.set(id, callback);
    const unsub = () => this.list_subscriptions.delete(id);
    (async () => {
      if (!this.loaded) {
        // ensure that the list of children is loaded
        await this.loadLocalStorage();
      }
      for (const child of this.children.values()) {
        child.once(callback, unsub, false);
      }
    })();
    return unsub;
  }
}

const localState = new Node();

// unsubscribes on unmount
export function useLocalState(
  key: string,
  initialValue: any = undefined,
  once = false
) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const unsub = localState.get(key).on((new_value, _key, unsubscribe) => {
      setValue(new_value);
      if (once) {
        unsubscribe();
      }
    });
    return unsub;
  }, [key, once]);
  const setter = useCallback(
    (new_value: any) => {
      localState.get(key).set(new_value);
    },
    [key]
  );
  return [value, setter];
}

export default localState;
