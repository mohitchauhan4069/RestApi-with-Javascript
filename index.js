const express = require('express');
const app = express();
let router = express.Router();
let pieRepo = require('./repos/pieRepo');

app.use(express.json());
router.get('/', function(req, res, next) {
    pieRepo.get(function(data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "messeage": "All data retrieved",
            "data": data
        });
        //  console.log('api callled.... succesfully..')
    }, function(err) {
        next(err);
    });
});

router.get('/:id', function(req, res, next) {
    pieRepo.getByID(req.params.id, function(data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "messeage": "data retrieved",
                "data": data
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not found",
                "messeage": "the pie" + req.params.id + "could not found",
                "Error": {
                    "code": "NOT_FOUND",
                    "mssg": "the pie " + req.params.id + " could not be found"
                }
            });
        }
    }, function(err) {
        next(err);
    });
});
//helloo im mohit chauhan

router.post('/', function(req, res, next) {
    pieRepo.insert(req.params.id, function(err, id) {
        res.status(200).json({
            "status": 200,
            "statusText": "created",
            "messeage": "new data added",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});
router.delete("/:id", function(req, res, next) {
    // res.status(200).json({
    //     statusText: 'Okay.....',
    // })
    pieRepo.delete(req.params.id, function(err, id) {
        res.status(200).json({
            statusText: 'deleted',
            messeage: 'data sucesfully delted...',
        })
    })


})

app.use('/api/', router);

var server = app.listen(5000, () => {
    console.log('server is running on http://localhost:5000 ');
})