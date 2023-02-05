import Note from "../models/noteSchema.js";

export const getNotes = async (req, res) => {
  try {
    const data = await Note.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const setNote = async (req, res) => {
  try {
    const newNote = new Note(req.body);
    console.log("newnote", newNote);
    newNote
      .validate()
      .then(async () => {
        const data = await Note.create(newNote);
        res.status(200).json(`Note created`);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateNote = async (req, res) => {
  try {
    const data = await Note.findById(req.params.id);
    if (!data) {
      throw new Error("Note not found");
    } else {
      const updatedNote = await Note.findByIdAndUpdate(
        data.id,
        {
          text: req.body.text,
          author: req.body.author,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Note updated!",
        result: updatedNote,
      });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const data = await Note.findById(req.params.id);
    if (!data) {
      throw new Error("The Note you wanna delete doesn't exist");
    } else {
      await Note.findByIdAndDelete(req.params.id);
      res.status(200).json("Note deleted");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
