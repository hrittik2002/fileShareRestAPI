import File from "../models/file.js"
import request from "superagent"
export const downloadFile = async(req , res) =>{
    try{
        const file = await File.findOne({
            uuid : req.params.uuid,
        })
        // if link expired
        if(!file){
            return res.status(404).send("link expired");
        }
        console.log(file.path)
        res.send({downloadLink : file.path});
        // res.set(
        //     'Content-Disposition',
        //     'attachment; filename='+ file.filename
        //   );
        //   request(file.path).pipe(res);
    }
    catch(err){
        res.status(404).send(err);
    }
    
}