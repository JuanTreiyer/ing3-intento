const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createAdminClient } = require('../lib/supabase/client');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const supabase = createAdminClient();
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (userError || !user) {
            return res.status(401).json({ message: "User does not exist" });
        }

        console.log('Contraseña ingresada:', password);
        console.log('Hash en la base de datos:', user.password);

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const tokenData = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        const tokenSecret = process.env.TOKEN_SECRET;
        const token = jwt.sign(tokenData, tokenSecret, { expiresIn: "6h" });

        // Configurar la cookie con sameSite: "none" y secure: false en desarrollo
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true en producción, false en desarrollo
            sameSite: "none", // none para desarrollo
            maxAge: 6 * 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { loginUser };
