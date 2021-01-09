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
import { useState, useCallback } from "react"

import { ErrorBoundary } from "./ErrorBoundary"

import "./style.css"
import makeStyles from "@material-ui/core/styles/makeStyles"

const pages = [
  { title: "Hex Sandpiles", module: "hexSandpiles" },
  { title: "Quickhull Animation", module: "quickhull" },
  { title: "Noises", module: "noises" },
  { title: "Delta3D", module: "delta3d" },
  { title: "Paper Prism Box", module: "paperBox1" },
]

const AsyncPage = loadable(
  (props: { page: string }) =>
    import(/* webpackChunkName: "[request]" */ `./${props.page}/index`),
)

const App = () => {
  const [navOpen, setNavOpen] = useState(false)

  const onDrawerClose = useCallback(() => setNavOpen(false), [])
  const onHamburgerClick = useCallback(() => setNavOpen(true), [])

  return (
    <BrowserRouter>
      <CssBaseline />
      <Drawer open={navOpen} onClose={onDrawerClose}>
        <List>
          {pages.map(({ title, module }) => (
            <ListItem component={Link} key={module} to={`/${module}`}>
              <ListItemText>{title}</ListItemText>
            </ListItem>
          ))}
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
        <Route path="/dist">
          <Redirect to="/hexSandpiles" />
        </Route>
        <Route exact path="/">
          <Redirect to="/hexSandpiles" />
        </Route>
        <Route path="/">404</Route>
      </Switch>
    </BrowserRouter>
  )
}

const root = document.createElement("div")
root.id = "root"
document.body.appendChild(root)
ReactDOM.render(<App />, root)
