import { Router } from 'express'; 
const router = Router();
router.get('/', (req, res) => {
  res.render('coh', { title: 'Code of Honor' });
});
export default router;
