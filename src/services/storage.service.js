import ImageKit from "@imagekit/nodejs";

const imagekitClient = new ImageKit({
    privateKey: process.env.KEY
})

async function uploadFile(file){
    const result = await imagekitClient.files.upload({
        file,
        fileName: "music" + Date.now(),
        folder: "Backend/music"
    })
    return result
}

export default uploadFile