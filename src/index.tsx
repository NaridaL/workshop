import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import CssBaseline from "@material-ui/core/CssBaseline"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom"
import * as ReactDOM from "react-dom"
import loadable from "@loadable/component"
import MenuIcon from "@material-ui/icons/Menu"
import * as React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"

import { useState, useCallback } from "react"

import { ErrorBoundary } from "./ErrorBoundary"

const pages = [
  { title: "Hex Sandpiles", module: "hexSandpiles" },
  { title: "Quickhull Animation", module: "quickhull" },
  { title: "Noises", module: "noises" },
  { title: "Delta3D", module: "delta3d" },
  { title: "Paper Prism Box", module: "paperBox1" },
  { title: "Circle Paper Box", module: "paperBox2" },
]

const AsyncPage = loadable(
  (props: { page: string }) =>
    import(/* webpackChunkName: "[request]" */ `./${props.page}/index`),
  { cacheKey: (props) => props.page },
)

const useStyles = makeStyles(() => ({
  "@global": {
    "html, body, #root": {
      margin: "0",
      height: "100%",
      width: "100%",
    },
  },
}))

const App = () => {
  const [navOpen, setNavOpen] = useState(false)

  const onDrawerClose = useCallback(() => setNavOpen(false), [])
  const onHamburgerClick = useCallback(() => setNavOpen(true), [])

  useStyles()

  return (
    <BrowserRouter basename="/workshop/">
      <CssBaseline />
      <Drawer open={navOpen} onClose={onDrawerClose}>
        <List>
          {pages.map(({ title, module }) => (
            <ListItem component={Link} key={module} to={`/${module}`}>
              <ListItemText>{title}</ListItemText>
            </ListItem>
          ))}
          <ListItem>
            <ListItemText>
              <a href="https://github.com/NaridaL/workshop">Back to Github</a>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton
        style={{
          position: "absolute",
          top: 16,
          left: 16,
        }}
        onClick={onHamburgerClick}
      >
        <MenuIcon />
      </IconButton>
      <Switch>
        {pages.map(({ module }) => (
          <Route key={module} path={`/${module}`}>
            <ErrorBoundary>
              <AsyncPage page={module} />
            </ErrorBoundary>
          </Route>
        ))}
        <Redirect from="/dist/:where" to="/:where" />
        <Redirect exact from="/" to="/hexSandpiles" />
        <Redirect exact from="/dist" to="/hexSandpiles" />
        <Route path="/">404</Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
