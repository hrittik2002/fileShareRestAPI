import File from "../models/file.js"

// download file page details
export const showDownloadPageDetails = async(req , res) => {
    try{
        const file = await File.findOne({
            uuid : req.params.uuid
        });

        // if link expired
        if(!file){
            return res.status(404).send("link expired");
        }

        return res.status(200).send({
            uuid : file.uuid,
            fileName : file.filename,
            fileSize : file.size,
        })

    }
    catch(err){
        res.status(404).send("Something went wrong")
    }
}