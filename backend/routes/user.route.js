import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js';
import User from '../models/user.model.js';
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

router.use(ensureAuthenticated);

router.get('/likes', async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    console.log('Error in the getLikes controller', error.message);
    res.status(200).json({ error: 'Internal server error' });
  }
});
router.post('/like/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const authUser = await User.findById(req.user._id.toString());
    console.log(authUser);

    const userToLike = await User.findOne({ username });

    if (!userToLike)
      return res
        .status(404)
        .json({ error: 'Usernot found / not a member to this app' });

    //if the user is found check if they exist in the authUser array
    if (authUser.likedProfiles.includes(userToLike.username))
      return res.status(400).json({ error: 'User already liked' });

    userToLike.likedBy.push({
      username: authUser.username,
      avatarUrl: authUser.avatarUrl,
      likedDate: Date.now(),
    });

    authUser.likedProfiles.push(userToLike.username);

    await Promise.all([userToLike.save(), authUser.save()]);

    res.status(200).json({ message: 'User Liked successfully' });
  } catch (error) {
    console.log('Error in the Liked Controller', error.mesage);
    res.status(500).json({ error: 'Internal Server error' });
  }
});

export { router as userRoutes };
