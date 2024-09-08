import path from 'path';

export const moveFileFunction = async (reqFile, reqPath) => {
    return new Promise(function (fulfill, reject){
const fileName = Date.now() + path.extname(reqFile.name);
reqFile.mv(reqPath + fileName, (error) => {
            if (error) {
                reject(error);
            }
            const up_file_path = reqPath.replace('./public/', '') + fileName;
            fulfill({ up_file_path });
        })
    }).catch(err => err);
}

export const checkDataIsValid = (data) => {
    if(data !== null && data !== undefined && data !== ''){
        return true;
    }
    return false;
}