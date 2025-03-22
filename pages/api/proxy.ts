// import axios from 'axios';

// export default async function handler(req, res) {
//   try {
//     const response = await axios.post('https://your-api-endpoint.com/request-otp.php', req.body, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(error.response?.status || 500).json({ message: error.message });
//   }
// }