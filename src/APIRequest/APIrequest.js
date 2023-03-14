import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = '33555589-7466b1bd2f6ce55c871b4b965';
const URL = 'https://pixabay.com/api/';

export async function getImage(query, page, per_page) {
  try {
    const configs = {
      baseURL: URL,

      params: {
        key: API_KEY,
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        page,
        per_page,
      },
    };
    const response = await axios(configs);
    return response.data;
  } catch (error) {
    toast.error(
      'Sorry, there are some problems with connection to the server. Check your internet connection, or try to search later',
      {
        autoClose: 5000,
        theme: 'dark',
      }
    );
  }
}
