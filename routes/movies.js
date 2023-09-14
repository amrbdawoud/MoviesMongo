const express = require("express");
const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Movies = require("../schemas/movies");

router.get("/", async (req, res) => {
  const movies = await Movies.find({});
  res.send(movies);
});

router.post("/", (req, res) => {
  const body = req.body;

  const newMovie = new Movies({
    title: body.title,
    director: body.director,
    rating: body.rating,
    duration: body.duration,
  });

  newMovie.save();

  res.send(newMovie);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!id) {
    res.send("id is not defined");
    return;
  }

  const movies = await Movies.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  res.send(movies);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.send("id is not defined");
    return;
  }

  const result = await Movies.findByIdAndDelete(id);
  res.send(result);
});

module.exports = router;
