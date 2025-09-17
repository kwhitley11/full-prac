
// displays text on React home page
export async function getHello() {
  const response = await fetch('http://localhost:5000/api/hello');
  return response.json();
}

//
export async function getItems() {
    const response = await fetch('http://localhost:5000/api/items')
    if(!response.ok) throw new Error('Network response was not ok.')
    return response.json();
}