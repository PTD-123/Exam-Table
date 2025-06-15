// document.addEventListener('DOMContentLoaded', async () => {
//     const token = localStorage.getItem('token'); // ดึง token จาก localStorage
//     if (!token) {
//       console.error('No token found, please login.');
//       return;
//     }
  
//     try {
//       const response = await fetch('/api/profile', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}` // แนบ token แบบ Bearer
//         }
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to fetch profile: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       console.log('Profile Data:', data);
//       document.getElementById('profileInfo').textContent = `Welcome, ${data.username}`;
//     } catch (error) {
//       console.error(error.message);
//     }
//   });
  