import { keysToCamelCase, keysToSnakeCase } from "../../../utils/keysToSnakeCase"

const API_URL = 'http://localhost:3000/'

const getCSRFToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
}

const AddLocation = async (data) => {
    const newLocationData = keysToSnakeCase({
      location: {
        name: data.name,
      }})

    const response = await fetch(`${API_URL}/locations`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRF-Token': getCSRFToken(),
      },
      body: JSON.stringify(newLocationData),
      credentials: 'same-origin'
    })
    const rawJSON = await response.json()
    return keysToCamelCase(rawJSON)
  }

  export default AddLocation