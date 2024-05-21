import Messages from "../model/messageModel.js";

// add a message
const addMessage = async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
  
      const data = await Messages.create({
        message: {
          text: message,
        },
        users: [from, to],
        sender: from,
      });
  
      if (data) {
        return res.json({
          msg: "Message added successfully",
          status: true,
        });
      }
  
      return res.json({
        msg: "Failed to add Message",
        status: false,
      });
    } catch (error) {
      next(error);
    }
  };

// get all messages
const getAllMessages = async(req,res,next)=>{
  try {
    const {from,to} = req.body;
    const messages = await Messages.find({
      users:{
        $all:[from,to],
      }
    }).sort({updatedAt:1});

    const projectedMessages = messages.map((msg)=>{
      return{
        fromSelf: msg.sender.toString()===from,
        message:msg.message.text,
      }
    });

    return res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
}

export {addMessage,getAllMessages}