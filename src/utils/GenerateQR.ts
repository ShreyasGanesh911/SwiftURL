import fs from 'fs';
import path from "path"
import QRCode  from "qrcode"
const generateQR = async(link:string):Promise<string | boolean>=>{
    try{
        const dirPath = path.join(__dirname,'../../assets')
        const rand = Date.now()
        const filePath = path.join(dirPath, `qrcode-${rand}.png`);
        if (!fs.existsSync(dirPath)) 
            fs.mkdirSync(dirPath, { recursive: true });
        await QRCode.toFile(filePath,link)
        return filePath 
    }catch(e){
        console.log("Error saving the file ", e)
        return false
    }
}
export default generateQR