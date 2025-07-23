import React from "react"
import { createRoot } from "react-dom/client"
import HelloComponent from "../components/hello_controller"

console.log("Vite ⚡️ Rails")

function mountReactRoot() {
  const reactRoot = document.getElementById("react-root")
  if (!reactRoot) return

  const props = JSON.parse(reactRoot.dataset.reactProps || "{}")
  createRoot(reactRoot).render(<HelloComponent {...props} />)
}

mountReactRoot()
