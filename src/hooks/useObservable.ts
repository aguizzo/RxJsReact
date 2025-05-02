import { useEffect } from "react";
import { Observable } from "rxjs";

const useObservable = <T>(
  observable: Observable<T>,
  setter: (value: T) => void
) => {
  useEffect(() => {
    const subscription = observable.subscribe((value) => {
      setter(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [observable, setter]);
};
export { useObservable };

