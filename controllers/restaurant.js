module.exports = {
    getListings
};

async function getListings(req, res) {
        res.json({
          movies: await modelRestaurants.getAll(req.query),
        });
        // next();  error handling/redirect to another endpoint/auditing log purpose
      }