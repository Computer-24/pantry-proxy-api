const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const { log } = require('console');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const PANTRY_ID = process.env.PANTRY_ID;
const PANTRY_API_BASE_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket`
app.use(cors());
app.use(express.json());

app.get('/:basketName', async (req, res) => {
    const { basketName } = req.params;
    const url = `${PANTRY_API_BASE_URL}/${basketName}`
    log(url);
    try {
        const response = await axios.get(`${PANTRY_API_BASE_URL}/${basketName}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/:basketName', async (req, res) => {
    const { basketName } = req.params;
    const newData = req.body;
    try {
        const response = await axios.post(`${PANTRY_API_BASE_URL}/${basketName}`, newData);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.put('/:basketName', async (req, res) => {
    const { basketName } = req.params;
    const newData = req.body;
    try {
        const response = await axios.put(`${PANTRY_API_BASE_URL}/${basketName}`, newData);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.delete('/:basketName', async (req, res) => {
    const { basketName } = req.params;
    try {
        const response = await axios.delete(`${PANTRY_API_BASE_URL}/${basketName}`);
        res.json({ message: 'Basket deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.get("/star.png", (req, res) => {
    res.sendFile(path.join(__dirname, 'star.png'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});