import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import mapValues from "lodash/mapValues"
import debounce from "lodash/debounce"

const parseHash = (hash: string): Record<string, string> => {
  return !hash
    ? {}
    : hash
        .substr(1)
        .split("&")
        .map((part) => {
          const [key, value] = part.split("=")
          return [decodeURIComponent(key), decodeURIComponent(value)]
        })
        .reduce(
          (obj, [key, value]) => ((obj[key] = value), obj),
          {} as Record<string, any>,
        )
}
const objectToHash = (o: Record<string, any>): string => {
  return Object.entries(o)
    .map(
      ([key, value]) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(value),
    )
    .join("&")
}

export function useHashState<S extends {}>(
  initialState: S | (() => S),
): [S, (newState: SetStateAction<S>) => void] {
  const serialize = (x: S): Record<string, string> =>
    mapValues(x, (v) => "" + v)
  const deserialize = (x: Record<string, string>): S =>
    (mapValues(x, (v) => {
      if ("true" === v) {
        return true
      } else if ("false" === v) {
        return false
      } else if ("NaN" === v) {
        return NaN
      } else if ("undefined" === v) {
        return undefined
      } else if ("null" === v) {
        return null
      } else if (!isNaN(+v)) {
        return +v
      } else {
        return v
      }
    }) as unknown) as S
  const createInitialState = useCallback(() => {
    const state =
      "function" === typeof initialState ? initialState() : initialState
    // hash overrides parameter
    const mergedState = deserialize(
      Object.assign(serialize(state), parseHash(document.location.hash)),
    )
    document.location.hash = objectToHash(serialize(mergedState))
    return mergedState
  }, [initialState])
  const [state, setState] = useState<S>(createInitialState)
  const updateHashRef = useRef<(newState: S) => void>()
  if (!updateHashRef.current) {
    updateHashRef.current = debounce(function (newState: S) {
      document.location.hash = objectToHash(serialize(newState))
    })
  }
  updateHashRef.current!(state)
  useEffect(() => {
    const onHashChange: (e: HashChangeEvent) => void = () => {
      setState(createInitialState())
    }
    window.addEventListener("hashchange", onHashChange)
    return () => {
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [createInitialState])
  return [state, setState]
}
