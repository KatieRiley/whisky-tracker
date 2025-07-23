import React from "react"

export default function HelloComponent({ name }) {
  return <h1>Hello, {name || "World"}!</h1>
}