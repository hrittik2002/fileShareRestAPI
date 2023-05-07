import File from "../models/file.js"

export const downloadFile = async(req , res) =>{
    try{
        const file = await File.findOne({
            uuid : req.params.uuid,
        })
        // if link expired
        if(!file){
            return res.status(404).send("link expired");
        }
        const filePath = `${process.cwd()}/${file.path}`;
        res.download(filePath);
    }
    catch(err){
        res.status(404).send(err);
    }
    
}