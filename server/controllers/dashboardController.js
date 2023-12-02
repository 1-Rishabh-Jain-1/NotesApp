const Note = require('../models/Notes');
const mongoose = require('mongoose');

//Get dashboard
exports.dashboard = async (req, res) => {
    let perPage = 12;
    let page = req.query.page || 1;

    const locals = {
        title: "Dashboard",
        description: "This is a notes app build using Node.jsm Express.js, MongoDb, Passport!"
    }

    try {
        const notes = await Note.aggregate([
            {
                $sort: { createAt: -1 }
            },
            {
                $match: {user: new mongoose.Types.ObjectId(req.user.id)}
            },
            {
                $project: {
                    title: { $substr: ['$title', 0, 30]},
                    body: { 
                        $cond: {
                            if: { $gte: [{ $strLenCP: "$body" }, 100] },
                            then: { $concat: [{ $substrCP: ["$body", 0, 100] }, "..."] },
                            else: "$body"
                        }
                    },
                }
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Note.countDocuments({ user: new mongoose.Types.ObjectId(req.user.id) });

        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: '../views/layouts/dashboard',
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch(err) {
        console.log("Error: " + err);
    }
}

//View specific note
exports.dashboardViewNote = async(req, res) => {
    const note = await Note.findById({_id: req.params.id})
    .where({ user: req.user.id }).lean();
    if(note) {
        res.render('dashboard/viewNotes', {
            noteId: req.params.id,
            note,
            layout: '../views/layouts/dashboard'
        });
    } else {
        res.send("Something went wrong!");
    }
}

//Update specific note
exports.dashboardUpdateNote = async(req, res) => {
    try {
        await Note.findOneAndUpdate(
            { _id: req.params.id },
            { title: req.body.title, body: req.body.body }
        ).where({ user: req.user.id });
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
    }
}