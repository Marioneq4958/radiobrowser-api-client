import axios from 'axios';

export async function helloWorld() {
  const response = await axios.get('https://example.com');
  console.log(response.data);
}
