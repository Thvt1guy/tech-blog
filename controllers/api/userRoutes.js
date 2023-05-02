const router = require('express').Router();
const { User } = require('../../models');

//Creates a new user from the signup page; currently, a 'bad request' alert will appear if the specified email address already exists in the database
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(req.session);

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Logs a user in from the login page
router.post('/login', async (req, res) => {
  try {
    console.log("\n\nlogin route ran!!")
    const userData = await User.findOne({ where: { username: req.body.username } });

    //Checks for a valid email address in the database
    if (!userData) {
      console.log("\n\ninvalid user Data!!");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    //Checks for a valid password in the database
    if (!validPassword) {
      console.log("\n\ninvalid Password!!");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    //Saves the user ID and enables functions with the withAuth argument to run
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//Logs out a logged in user from a button on the main page
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;