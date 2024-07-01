import express, { Request, Response } from 'express';
import render from '../render';
import { Place } from '../models/places';
import db from '../models';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    db.Place.find()
    .then((places: Place[]) => {
        res.send(render('places/index', { places }))
    })
    .catch(err => {
        console.log(err)
        res.send(render('error404'))
    })
});

router.get('/new', (req: Request, res: Response) => {
    res.send(render('places/new'));
});

router.get('/:id', (req: Request, res: Response) => {
    db.Place.findById(req.params.id)
    .populate('comments')
    .then((place: Place) => {
        console.log(place.comments)
        res.send(render('places/show', { place }))
    })
    .catch((err: Error) => {
        console.log('err', err)
        res.send(render('error404'))
    })
});

router.post('/', (req: Request, res: Response) => {
    db.Place.create(req.body)
    .then(() => {
        res.redirect('/places');
    })
    .catch((err: Error) => {
        console.log('err', err);
        res.send(render('error404'));
    });
});

const getPlaceById = (req: Request, res: Response) => {
    db.Place.findById(req.params.id)
        .then((place: any) => {
            res.send(render('places/Edit', { place }));
        })
        .catch((err: any) => {
            console.log(err);
            res.status(404).send(render('Error404'));
        });
};

const updatePlaceById = (req: Request, res: Response) => {
    db.Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedPlace: any) => {
            res.redirect(`/places/${updatedPlace.id}`);
        })
        .catch((err: any) => {
            console.log(err);
            res.status(404).send(render('Error404'));
        });
};

const deletePlaceById = (req: Request, res: Response) => {
    db.Place.findByIdAndDelete(req.params.id)
        .then((place: any) => {
            res.redirect('/places');
        })
        .catch((err: any) => {
            console.log('err', err);
            res.render('error404');
        });
};

router.get('/:id/comments/new', (req: Request, res: Response) => {
    db.Place.findById(req.params.id)
        .populate('comments')
        .then((place: any) => {
            console.log(place.comments);
            res.send(render('comments/New', { place }));
        })
        .catch((err: any) => {
            console.log('err', err);
            res.send(render('error404'));
        });
});

router.post('/:id/comments', (req: Request, res: Response) => {
    let commentData: any = req.body;
    commentData.rant = commentData.rant === 'on';
    commentData.stars = parseFloat(commentData.stars);
    db.Comment.create(commentData)
        .then((comment: any) => {
            db.Place.findById(req.params.id)
                .then((place: any) => {
                    place.comments.push(comment);
                    place.save();
                    res.redirect(`/places/${place._id}`);
                })
                .catch((err: any) => {
                    console.log(err);
                    res.status(404).send('Not Found');
                });
        })
        .catch((err: any) => {
            console.log(err);
            res.status(400).send('Bad Request');
        });
});

export { getPlaceById, updatePlaceById, deletePlaceById };

export default router;