const Message = require("../models/message");

// send message
exports.sendMessage = async (req, res) => {
  const { to, subject, body } = req.body;

  const msg = new Message({
    from: req.user.id,
    to,
    subject,
    body
  });

  await msg.save();

  res.json(msg);
};

// get my messages
exports.getMessages = async (req, res) => {
  const msgs = await Message.find({
    to: req.user.id
  }).populate("from", "name");

  res.json(msgs);
};