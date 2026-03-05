import ImageKit from "@imagekit/nodejs";

<<<<<<< HEAD
const client = new ImageKit({
      privateKey: process.env.IMAGEKIT_KEY
})

async function uploadFile(file){
    const result = await client.files.upload({
          file,
          fileName: "music_" + Date.now(),
          folder: "collection/music"
=======
const imagekitClient = new ImageKit({
    privateKey: process.env.KEY
})

async function uploadFile(file){
    const result = await imagekitClient.files.upload({
        file,
        fileName: "music" + Date.now(),
        folder: "Backend/music"
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25
    })
    return result
}

export default uploadFile