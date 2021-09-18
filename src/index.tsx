import loadable from "@loadable/component"
import GitHubIcon from "@mui/icons-material/GitHub"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import CssBaseline from "@mui/material/CssBaseline"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import {
  adaptV4Theme,
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import useMediaQuery from "@mui/material/useMediaQuery"
import makeStyles from "@mui/styles/makeStyles"
import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom"

import { ErrorBoundary } from "./ErrorBoundary"
import { isDev } from "./utils/isDev"

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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

const GIT_HASH = process.env.GIT_HASH!
const BUILD_TIME = new Date(process.env.BUILD_TIME!)

const ThemedApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = React.useMemo(
    () =>
      createTheme(
        adaptV4Theme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
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
      ),
    [prefersDarkMode],
  )

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
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
          <ListItem
            sx={{
              fontSize: "smaller",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div>
              SHA1{" "}
              <a href={"https://github.com/NaridaL/workshop/tree/" + GIT_HASH}>
                {GIT_HASH!.substring(0, 6)}
              </a>
            </div>
            <div>BUILT {BUILD_TIME.toISOString().substring(0, 16)}</div>
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
            size="large"
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
