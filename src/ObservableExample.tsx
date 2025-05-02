import { delay, filter, from, map, mergeMap } from "rxjs";
import { useObservable } from "./hooks/useObservable";
import React from "react";

let numbersObervable = from([1, 2, 3, 4, 5]);
let squaredNumbers = numbersObervable.pipe(
  filter((val) => val > 2),
  mergeMap((val) => from([val]).pipe(delay(2000 * val))),
  map((val) => val * val)
);

const ObservableExample = () => {
  const [currentNumber, setCurrentNumber] = React.useState<number>(0);
  useObservable(squaredNumbers, setCurrentNumber);

  return (
    <div>
      <h2>Observable Example</h2>
      <p>Current Number: {currentNumber}</p>
    </div>
  );
};
export default ObservableExample;
