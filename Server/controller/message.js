import Message from "../DB/Model/message.js";

export const addMessage = async (req, res) => {
  try {
    const msge = await Message.create({ ...req.body, messageDate: new Date() });
    await msge.save();
    res.status(200).json({ msge, msge: "Message successfully sent." });
  } catch (err) {
    res.status(500).json({ msge: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ msge: "Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const message = await Message.findOne({ _id: req.params.id });
    res.status(200).json({ message: message.message });
  } catch (err) {
    res.status(500).json({ msge: "Server Error" });
  }
};
