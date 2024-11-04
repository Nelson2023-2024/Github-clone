import { Router } from 'express';
const router = Router();

router.get('/profile/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      }
    );
    const userProfile = await userResponse.json();

    const repoRes = await fetch(userProfile?.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const repos = await repoRes.json();

    res.status(200).json({ userProfile, repos });
  } catch (error) {
    console.log('Error in getUserProfile Route', error.message);
    res.status(500).json({ error: error.message });
  }
});

export { router as userRoutes };
