const express = require('express');

const router = express.Router();

const Project = require('../models/Project');
const Calculation = require('../models/Calculation');
const User = require('../models/User');

router.get('/', async (req, res) => {
  const { userId } = req.query;

  const projects = await Project.find({ userId }).exec();

  res.json({
    projects,
  });
});

router.get('/all', async (req, res) => {
  const projects = await Project.find({}).exec();
  const projectsByUser = {};

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const id = project.userId;

    if (projectsByUser[id]) {
      projectsByUser[id].projects.push(project);
    } else {
      const user = await User.findOne({ _id: id }).exec();

      projectsByUser[id] = {
        user_name: user.organisation_email
          .split('@')[0]
          .replace('.', ' ')
          .toUpperCase(),
        projects: [project],
      };
    }
  }

  res.json({
    projects: projectsByUser,
  });
});

router.get('/calculations', async (req, res) => {
  const { project_id } = req.query;

  const project = await Project.findOne({ _id: project_id }).exec();
  const calculations = await Calculation.find({ project_id }).exec();

  res.json({
    project,
    calculations,
  });
});

router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();

  res.json({
    project,
  });
});

router.delete('/', async (req, res) => {
  const { id } = req.query;

  await Calculation.deleteMany({ project_id: id }).exec();

  await Project.deleteOne({ _id: id }).exec();

  res.json({
    message: `Project with id ${id} has been deleted`,
  });
});

module.exports = router;
