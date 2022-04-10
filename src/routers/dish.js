const express = require('express');
const router = express.Router();
const {checkAuth} = require('../middlewares/checkAuth');
const DishController = require('../controllers/dish');

router.get('/categories', DishController.getCategories);
router.get('/labels', DishController.getLabels);

router.get('/', DishController.getDishes);
router.post('/', checkAuth, DishController.postDish);

router.get('/comment', DishController.getComments);
router.post('/:id/comment',checkAuth, DishController.postComment);
router.delete('/:id/comment',checkAuth, DishController.deleteComment);

// match everything, keep at last
router.get('/:id', DishController.getDish);
router.delete('/:id',checkAuth, DishController.deleteDish);
router.put('/:id', checkAuth, DishController.updateDish);

module.exports = router;