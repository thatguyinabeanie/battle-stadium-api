import * as React from "react";

type noop = (this: any, ...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any

type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;

export function useMemoizedCallback<T extends noop>(fn: T) {
  const fnRef = React.useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = React.useMemo<T>(() => fn, [fn]);

  const memoizedFn = React.useRef<PickFunction<T> | null>(null);

  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
}
