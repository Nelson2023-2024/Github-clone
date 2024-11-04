import { Router } from 'express';

const router = Router();

router.get('/github', async (req, res) => {});
router.get('/github/callback', async (req, res) => {});

export { router as authRoutes };
