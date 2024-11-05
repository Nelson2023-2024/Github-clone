import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js';

const router = Router();

router.use(ensureAuthenticated);

router.get('/repos/:language', async (req, res) => {
  const { language } = req.params;
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,
      {
        headers: {
          authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    res.status(200).json({ repos: data });
  } catch (error) {
    console.log('Error in explore roure', error.message);

    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as exploreRoutes };
