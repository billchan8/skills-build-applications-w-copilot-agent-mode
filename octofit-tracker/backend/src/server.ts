import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@octofit.example', level: 'Pro' },
  { id: 2, name: 'Grace Hopper', email: 'grace@octofit.example', level: 'Advanced' },
  { id: 3, name: 'Katherine Johnson', email: 'katherine@octofit.example', level: 'Intermediate' }
];

const teams = [
  { id: 1, name: 'Orbit Crew', members: 12, activityScore: 91 },
  { id: 2, name: 'Trail Blazers', members: 8, activityScore: 84 }
];

const activities = [
  { id: 1, type: 'Run', distance: '5 km', user: 'Ada Lovelace', points: 150 },
  { id: 2, type: 'Strength', distance: 'Upper body', user: 'Grace Hopper', points: 200 },
  { id: 3, type: 'Cycle', distance: '12 km', user: 'Katherine Johnson', points: 175 }
];

const leaderboard = [
  { id: 1, user: 'Ada Lovelace', points: 3210 },
  { id: 2, user: 'Grace Hopper', points: 2980 },
  { id: 3, user: 'Katherine Johnson', points: 2740 }
];

const workouts = [
  { id: 1, name: 'Core Circuit', difficulty: 'Medium', duration: '20 min' },
  { id: 2, name: 'Hill Intervals', difficulty: 'Hard', duration: '30 min' },
  { id: 3, name: 'Mobility Flow', difficulty: 'Easy', duration: '15 min' }
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: 'octofit_db', baseUrl });
});

app.get('/api/users', (_req, res) => {
  res.json({ results: users, count: users.length });
});

app.get('/api/users/:id', (req, res) => {
  const found = users.find((user) => user.id === Number(req.params.id));
  if (!found) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(found);
});

app.get('/api/teams', (_req, res) => {
  res.json({ results: teams, count: teams.length });
});

app.get('/api/activities', (_req, res) => {
  res.json({ results: activities, count: activities.length });
});

app.get('/api/leaderboard', (_req, res) => {
  res.json({ results: leaderboard, count: leaderboard.length });
});

app.get('/api/workouts', (_req, res) => {
  res.json({ results: workouts, count: workouts.length });
});

async function start() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit Tracker API running at ${baseUrl}`);
  });
}

start().catch((error) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exit(1);
});
