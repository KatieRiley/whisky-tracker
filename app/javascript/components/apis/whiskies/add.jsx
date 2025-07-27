import { keysToCamelCase, keysToSnakeCase } from "../../../utils/keysToSnakeCase"

const API_URL = 'http://localhost:3000/'

const getCSRFToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
}

const AddWhisky = async (data) => {
    const newWhiskyData = keysToSnakeCase({
      whisky: {
        name: data.name,
        locationId: data.locationId,
        tastingNotes: data.tastingNotes,
        rating: data.rating
      }})

    const response = await fetch(`${API_URL}/whiskies`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRF-Token': getCSRFToken(),
      },
      body: JSON.stringify(newWhiskyData),
      credentials: 'same-origin'
    })
    const rawJSON = await response.json()
    return keysToCamelCase(rawJSON)
  }

  export default AddWhisky