import loadable from "@loadable/component"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import GitHubIcon from "@material-ui/icons/GitHub"
import MenuIcon from "@material-ui/icons/Menu"
import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom"

import { ErrorBoundary } from "./ErrorBoundary"
import { isDev } from "./utils/isDev"

const pages = [
  { title: "Hex Sandpiles", module: "hexSandpiles" },
  { title: "Quickhull Animation", module: "quickhull" },
  { title: "Noises", module: "noises" },
  { title: "Raymarching", module: "raymarch" },
  { title: "Delta3D", module: "delta3d", hide: true },
  { title: "Paper Prism Box", module: "paperBox1" },
  { title: "Circle Paper Box", module: "paperBox2" },
  { title: "Spirograph", module: "spirograph", hide: true },
  { title: "Tiles", module: "tiles", hide: true },
]

const AsyncPage = loadable(
  (props: { page: string }) =>
    import(/* webpackChunkName: "[request]" */ `./${props.page}/index`),
  { cacheKey: (props) => props.page },
)

const useStyles = makeStyles((theme) => ({
  "@global": {
    "html, body, #root": {
      margin: "0",
      height: "100%",
      width: "100%",
    },
    "#root": {
      backgroundColor: theme.palette.background.default,
    },

    "svg.adrian": {
      "& *": {
        stroke: theme.palette.text.primary,
      },
      "& text": {
        stroke: "none",
        fill: theme.palette.text.primary,
      },
    },
  },
}))

const ThemedApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#F26430",
          },
          secondary: {
            main: "#685369",
          },
        },
        typography: {
          fontFamily: "Fira Sans",
        },
      }),
    [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
const App = () => {
  const [navOpen, setNavOpen] = useState(false)

  const onDrawerClose = useCallback(() => setNavOpen(false), [])
  const onHamburgerClick = useCallback(() => setNavOpen(true), [])
  const currentPage = pages.find(
    (p) => p.module === document.location.pathname.split("/")[2],
  )
  useEffect(() => {
    document.title = (currentPage?.title ?? "Loading...") + " - Adrian Leonhard"
  }, [currentPage])

  useStyles()

  return (
    <BrowserRouter basename="/workshop/">
      <Drawer open={navOpen} onClose={onDrawerClose}>
        <List onClick={() => setNavOpen(false)}>
          {pages
            .filter(({ hide }) => isDev() || !hide)
            .map(({ title, module }) => (
              <ListItem button component={Link} key={module} to={`/${module}`}>
                <ListItemText>{title}</ListItemText>
              </ListItem>
            ))}
          <ListItem
            button
            component="a"
            href="https://github.com/NaridaL/workshop"
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText>Github</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onHamburgerClick}
          >
            <MenuIcon />
          </IconButton>
          <h2> {currentPage?.title ?? "Loading..."}</h2>
        </Toolbar>
      </AppBar>

      <Routes>
        {pages.map(({ module }) => (
          <Route
            key={module}
            path={`/${module}`}
            element={
              <ErrorBoundary>
                <AsyncPage page={module} />
              </ErrorBoundary>
            }
          />
        ))}
        <Route
          path="/dist/:where"
          element={<Navigate replace to="/:where" />}
        />
        <Route path="/" element={<Navigate replace to="/hexSandpiles" />} />
        <Route path="/dist" element={<Navigate replace to="/hexSandpiles" />} />
        <Route path="/">404</Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(<ThemedApp />, document.getElementById("root"))
