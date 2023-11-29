//Get dashboard
exports.dashboard = async (req, res) => {
    const locals = {
        title: "Dashboard",
        description: "This is a notes app build using Node.jsm Express.js, MongoDb, Passport!"
    }
    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    });
}
