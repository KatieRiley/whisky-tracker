import React from "react"
import { createRoot } from "react-dom/client"
import HelloComponent from "../components/hello_controller"
import { ThemeProvider } from "@planningcenter/tapestry-react" 

console.log("Vite ⚡️ Rails")

function mountReactRoot() {
  const whiskyNode = document.getElementById("whisky");
  const locationNode = document.getElementById("location");
  const appRoot = document.getElementById("app"); // <- define this

  const whiskies = whiskyNode ? JSON.parse(whiskyNode.dataset.reactProps) : [];
  const locations = locationNode ? JSON.parse(locationNode.dataset.reactProps) : [];

  const props = {
    whiskies: whiskies.whiskies || [],
    locations: locations.locations || [],
  }

  const theme = {
    boxSizes: {
      small: { paddingHorizontal: 1, paddingVertical: 0.75 },
      medium: { paddingHorizontal: 1.5, paddingVertical: 1 },
    },
    breakpoints: {
      phone: 480,
      tablet: 720,
      desktop: 960,
    },
    colors: {
      primary: 'hotpink',
      secondary: 'pink',
    },
  }

  createRoot(appRoot).render(
    <ThemeProvider theme={theme}>
      <HelloComponent {...props} />
    </ThemeProvider>
  )
}

mountReactRoot()
