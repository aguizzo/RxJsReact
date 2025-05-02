import { useRef, useMemo } from "react";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  mergeMap,
} from "rxjs";
import { useObservable } from "./useObservable";

/**
 * Custom hook for creating reactive search functionality using RxJS
 *
 * @param searchFn - Function that takes a search term and returns a Promise with results
 * @param setResults - Setter function to update the component with search results
 * @param options - Optional configuration for the search behavior
 * @returns Function to update the search term
 */
const useRxSearch = <T>(
  searchFn: (term: string) => Promise<T[]>,
  setResults: (results: T[]) => void,
  options = { debounceMs: 500, minLength: 2 }
): ((term: string) => void) => {
  // Use useRef to maintain stable reference between renders
  const searchSubject = useRef(new BehaviorSubject<string>("")).current;

  // Create the observable pipeline
  const searchResultObservable = useMemo(() => {
    return searchSubject.pipe(
      filter((searchTerm) => searchTerm.length >= options.minLength),
      debounceTime(options.debounceMs),
      distinctUntilChanged(),
      mergeMap((searchTerm) => from(searchFn(searchTerm)))
    );
  }, [searchFn, options.debounceMs, options.minLength]);

  // Subscribe to the observable and update results
  useObservable(searchResultObservable, setResults);

  // Return function to update the search term
  return (term: string) => {
    searchSubject.next(term);
  };
};

export { useRxSearch };