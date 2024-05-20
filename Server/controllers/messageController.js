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

}

export {addMessage,getAllMessages}