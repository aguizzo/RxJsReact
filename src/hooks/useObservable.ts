import { useEffect } from "react";
import { Observable } from "rxjs";

const useObservable = <T>(
  observable: Observable<T>,
  setter: (value: T) => void
) => {
  useEffect(() => {
    const subscription = observable.subscribe({
      next: (value) => {
        setter(value);
      },
      error: (err) => {
        console.error("Error in observable:", err);
      },
      complete: () => {
        console.info("Observable completed");
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [observable, setter]);
};
export { useObservable };
