//Get homepage
exports.homepage = async (req, res) => {
    const locals = {
        title: "Notes App",
        description: "This is a notes app build using Node.jsm Express.js, MongoDb, Passport!"
    }
    res.render('index', {
        locals,
        layout: '../views/layouts/front-page'
    });
}

//Get about
exports.about = async (req, res) => {
    const locals = {
        title: "About - Notes App",
        description: "This is a notes app build using Node.jsm Express.js, MongoDb, Passport!"
    }
    res.render('about', locals);
}