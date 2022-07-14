const yup =require('yup');

class MessageSchema {

    static#Schema = yup.object().object({
        author: yup.string(ypu.ref('messages')),
        text : yup.string().required(),
    });


constructor(author, text) {
    this.author=author;
    this.text=text;
}

static async validate(messageItem){
    try{
        return await MessageSchema.#Schema.validate(messageItem);
    }
    catch(err){
        throw err;
        }
    }
}

module.exports=MessageSchema
