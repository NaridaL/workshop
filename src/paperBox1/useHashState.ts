import debounce from "lodash/debounce"
import mapValues from "lodash/mapValues"
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"

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
        .reduce((obj, [key, value]) => {
          obj[key] = value
          return obj
        }, {} as Record<string, string>)
}
const objectToHash = (o: Record<string, string>): string => {
  return (
    "#" +
    Object.entries(o)
      .map(
        ([key, value]) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(value),
      )
      .join("&")
  )
}

const defaultDeserialize = (
  x: Record<string, string>,
): Record<string, unknown> =>
  mapValues(x, (v) => {
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
    } else if ("" === v) {
      return ""
    } else if (!isNaN(+v)) {
      return +v
    } else {
      return v
    }
  })
const defaultSerialize = (x: Record<string, unknown>): Record<string, string> =>
  mapValues(x, (v) => "" + v)

export function useHashState<S extends {}>(
  initialState: S | (() => S),
  {
    deserialize = defaultDeserialize,
    serialize = defaultSerialize,
    wait = 1000,
  } = {},
): [S, (newState: SetStateAction<S>) => void] {
  const createInitialState = useCallback(() => {
    const state =
      "function" === typeof initialState
        ? (initialState as () => S)()
        : initialState
    // hash overrides parameter
    const mergedState = deserialize(
      Object.assign(serialize(state), parseHash(document.location.hash)),
    ) as S
    history.pushState(
      undefined,
      document.title,
      objectToHash(serialize(mergedState)),
    )

    return mergedState
  }, [deserialize, initialState, serialize])
  const [state, setState] = useState<S>(createInitialState)
  const updateHashRef = useRef<(newState: S) => void>()
  if (!updateHashRef.current) {
    updateHashRef.current = debounce(function (newState: S) {
      history.pushState(
        undefined,
        document.title,
        objectToHash(serialize(newState)),
      )
    }, wait)
  }
  useEffect(() => updateHashRef.current!(state), [state])

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
