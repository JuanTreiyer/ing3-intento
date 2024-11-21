const bcrypt = require('bcrypt');
const { createAdminClient } = require('../lib/supabase/client');

const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Verificar que todos los campos estén presentes
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'All fields (email, password, username) are required' });
        }

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Log para verificar el hash
        console.log('Hash de la contraseña:', hashedPassword);

        const supabase = createAdminClient();
        const { data, error } = await supabase
            .from('users')
            .insert([{ email, password: hashedPassword, username }]); // Guarda la contraseña cifrada

        if (error) {
            console.error('Error al crear el usuario en Supabase:', error);
            return res.status(500).json({ message: 'Error creating user', error });
        }

        res.status(201).json({ message: 'User created successfully', data });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerUser };
