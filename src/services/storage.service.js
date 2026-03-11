import dotenv from 'dotenv'
dotenv.config()
import ImageKit from "@imagekit/nodejs";

const Client = new ImageKit({
    privateKey: process.env.IMG_KEY
})

async function uploadFlie(file){
    const result = await Client.files.upload({
          file,
          fileName: "music" + Date.now()
    })
    return result
}

export default uploadFlie