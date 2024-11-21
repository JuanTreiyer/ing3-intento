const express = require('express');
const { createAdminClient } = require('../lib/supabase/client');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const supabase = createAdminClient();
        const { data, error } = await supabase.from('users').select('id, username, email, password');

        if (error) {
            console.error('Error fetching users:', error.message);
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error('Error interno del servidor:', err.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
