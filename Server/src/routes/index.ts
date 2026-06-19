import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

router.get('/health', (_req: any, res: { json: (arg0: { status: string; timestamp: string; }) => void; }) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
