import { Router } from 'express';
const router = Router();
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const { cityName } = req.body;

  try {
    let data = await weatherService.getWeatherForCity(cityName);
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send({ error: 'Failed to fetch weather data' });
  }

  try {
    await historyService.addCity(cityName);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add city' });
  }
});

// GET search history
router.get('/history', async (_req, res) => {
  try {
    const citiesData = await historyService.getCities();
    res.json(citiesData);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch History' });
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await historyService.removeCity(id);
    res.status(204).send(); 
  } catch (error) {
    console.error('Error removing city from history:', error);
    res.status(500).send({ error: 'Failed to remove city from history' });
  }
});

export default router;
