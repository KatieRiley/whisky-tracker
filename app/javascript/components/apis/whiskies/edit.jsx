import { keysToCamelCase, keysToSnakeCase } from "../../../utils/keysToSnakeCase"

const API_URL = 'http://localhost:3000/'

const getCSRFToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
}

const EditWhisky = async (data) => {
  const newWhiskyData = keysToSnakeCase({
    whisky: {
      name: data.name,
      tastingNotes: data.tastingNotes,
      rating: data.rating,
      id: data.id
    }})

  const response = await fetch(`${API_URL}/whiskies/${data.id}`, {
    method: 'PATCH',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'X-CSRF-Token': getCSRFToken(),
    },
    body: JSON.stringify(newWhiskyData),
    credentials: 'same-origin'
  })

  const json = await response.json()
  return keysToCamelCase(json)
}

  export default EditWhisky