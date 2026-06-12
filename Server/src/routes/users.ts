import { Router } from 'express';
import { getAll, getOne, updateOne, deleteOne } from '../controllers/userController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, getAll);
router.get('/:id', requireAuth, getOne);
router.put('/:id', requireAuth, updateOne);
router.delete('/:id', requireAuth, deleteOne);

export default router;
