import * as React from "react"
import { Component, ErrorInfo, ReactElement, ReactNode } from "react"

export class ErrorBoundary extends Component<{ children?: ReactNode }> {
  state = {
    error: undefined as (Error & { shaderSource?: string }) | undefined,
  }

  constructor(props: { children?: ReactNode }) {
    super(props)
  }

  private static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo)
  }

  private static formatShader(
    message: string,
    shaderSource: string,
  ): ReactElement {
    const errors = [...message.matchAll(/ERROR: \d+:(\d+): (.*)/g)].map(
      ([_, line, message]) => ({ line: +line, message }),
    )
    return (
      <pre style={{ fontSize: "small" }}>
        {shaderSource.split(/\r\n|\r|\n/).flatMap((line, lineIndex) => {
          const lineNo = lineIndex + 1
          const lineError = errors.find((e) => e.line === lineNo)
          return [
            <div
              key={lineNo}
              style={
                lineError
                  ? {
                      backgroundColor: "red",
                      color: "white",
                    }
                  : {}
              }
            >
              {("" + lineNo).padStart(3, " ")} {line}
            </div>,
            lineError && (
              <div
                style={{
                  color: "red",
                  fontWeight: "bolder",
                }}
              >
                {"    " + lineError.message}
              </div>
            ),
          ].filter(Boolean)
        })}
      </pre>
    )
  }

  render(): ReactNode {
    const error = this.state.error
    if (error) {
      return (
        <div
          style={{
            padding: 16,
            border: "3px solid orange",
            margin: "16px 200px",
          }}
        >
          <pre style={{ color: "red", fontWeight: "bolder" }}>
            {error.message}
          </pre>
          {error.shaderSource &&
            ErrorBoundary.formatShader(error.message, error.shaderSource)}
          <pre style={{ fontSize: "smaller" }}>{error.stack}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
