const API_URL = 'http://localhost:3000/'

const getCSRFToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
}

const DeleteWhisky = async (data) => {
    fetch(`${API_URL}/whiskies/${data.id}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRF-Token': getCSRFToken(),
      },
      credentials: 'same-origin'
    })
  }

  export default DeleteWhisky