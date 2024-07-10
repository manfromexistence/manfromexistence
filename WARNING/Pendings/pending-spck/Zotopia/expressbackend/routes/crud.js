const express = require('express');
const router = express.Router();
const {
        getAllData,
        createData,
        getOneItem,
        updateData,
        deleteData
} = require('../controllers/crud');

const {
        createDa,
        getOneItemYeh,
        updateDa,
        deleteDa
} = require('../controllers/user');


router.route('/').get(getAllData).post(createData);
router.route('/:itemID').get(getOneItem).patch(updateData).delete(deleteData);



router.route('/register').post(createDa);
router.route('/register/:itemID').get(getOneItemYeh).patch(updateDa).delete(deleteDa);



module.exports = router;