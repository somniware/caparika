import { useState, useEffect, Dispatch, SetStateAction } from "react";

let globalState: object = {};
let listeners: Dispatch<SetStateAction<any>>[] = [];
let actions: { [index: string]: Function } = {};

export const useStore = (shouldListen = true): [object, Function] => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier: string, payload: any) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (
  userActions: { [index: string]: Function },
  initialState: object
) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
