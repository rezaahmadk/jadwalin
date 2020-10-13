import express from 'express';
import Homework from './database.js';

const router = express.Router();

//@desc Create New Homework
//@route POST /api/homeworks
router.post('/homeworks', async (req, res) => {
    try {
        const {course, title, due_date, status} = req.body;
        const homework = new Homework({
            course,
            title,
            due_date,
            status,
        });

        const createdHomework = await homework.save();

        res.status(201).json(createdHomework);
    } catch (error) {
        res.status(500).json({ error: 'Database Creation Fail' });
    }
});

//@desc GET All Homeworks
//@router GET /api/homeworks
router.get('/homeworks', async (req, res) => {
    const homeworks = await Homework.find();

    if(homeworks){
        res.json(homeworks);
    } else {
        res.status(404).json({ message: 'Homework Not Found' });
    }
});

//@desc GET Homeworks by ID
//@router GET /api/homeworks/:id
router.get('/homeworks/:id', async (req, res) => {
    const homework = await Homework.findById(req.params.id);

    if(homework){
        res.json(homework);
    } else {
        res.status(404).json({ message: 'Homework Not Found' });
    }
});

//@desc Update Homeworks
//@router PUT /api/homeworks/:id
router.put('/homeworks/:id', async (req, res) => {
    const {course, title, due_date, status} = req.body;
    const homework = await Homework.findById(req.params.id);

    if(homework){
        homework.course = course;
        homework.title = title;
        homework.due_date = due_date;
        homework.status = status;

        const updatedHomework = await homework.save();

        res.json(updatedHomework);
    } else {
        res.status(404).json({ message: 'Homework Not Found' });
    }
});

// @desc DELETE Homeworks
// @router DELETE /api/homeworks/:id
router.delete('/homeworks/:id', async (req, res) => {
    const homework = await Homework.findById(req.params.id);

    if(homework){
        await homework.remove();
        res.json({ message: 'Data Removed' });
    } else {
        res.status(404).json({ message: 'Homework Not Found' });
    }
});


// @desc DELETE ALL Homeworks
// @router DELETE /api/delete-homeworks
router.delete('/delete-homeworks', async (req, res) => {
    try {
        const hapus = await Homework.remove( { } );
        if(hapus){
            res.json({ message: 'All Data Removed', data: hapus});
        } else {
            res.status(404).json({ message: 'Homework Not Found' });
        }
    } catch (error) {
        console.log(error);
    }
});

export default router;