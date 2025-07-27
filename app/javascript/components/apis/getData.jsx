const API_URL = 'http://localhost:3000/'

const getCSRFToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
}

const GetData = async (data) => {
  const response = await fetch(`${API_URL}/${data}`, {
  headers: {
    Accept: "application/json",
    },
  })
  const json =  response.json()

  return json
  }

  export default GetData