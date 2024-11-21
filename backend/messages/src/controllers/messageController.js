const { createAdminClient } = require('../utils/client');
const fetch = require('node-fetch');

const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('messages')
    .insert([{ sender_id: senderId, receiver_id: receiverId, content }]);

  if (error) {
    return res.status(500).json({ message: 'Error sending message', error });
  }

  res.status(201).json({ message: 'Message sent', data });
};

const getMessages = async (req, res) => {
  try {
    console.log('Cookies recibidas:', req.cookies)
    
    const isAuth = await fetch('http://localhost:5000/checkauth', {
      credentials: true,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cookietoken: req.cookies.cookietoken }) 
  });
  

    console.log('Respuesta de autenticación:', isAuth.status, await isAuth.text());

    if (isAuth.status !== 200) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { userId } = JSON.parse(await isAuth.text());

    const supabase = createAdminClient();

    
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        created_at,
        sender:sender_id (username),
        receiver:receiver_id (username),
        content,
        is_read
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ message: 'Error fetching messages', error });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error('Error during authentication check:', err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
  
};

module.exports = { sendMessage, getMessages };
