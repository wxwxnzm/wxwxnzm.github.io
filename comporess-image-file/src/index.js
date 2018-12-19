import handleCompress from './handleCompress';

const { getOrientation, getImageObj, getCanvasWidthAndHeight, getCanvasFromImage, dataURItoFile } = handleCompress;

const  $input = document.querySelector('input'),
    $img = document.querySelector('img');
$input.addEventListener('change',async (e)=> {
     /* 
    *   1.拿到拍摄方向(电脑为空，手机为6/8/3等)
    *   2.通过fileReader构造img对象(旧的base64)
    *   3.对比实际宽高和限制宽高，判断是否要压缩
    *   4.取canvas画出正确方向且压缩后()的canvas对象
    *   5.canvas转base64
    *   6.base64转file
    */
    const file = e.target.files[0];
    const orientation = await getOrientation(file);
    console.log(file.size / 1024, 'kb, old file size');
    const imgObj = await getImageObj(file);
    const {width, height} = getCanvasWidthAndHeight(1024, imgObj.width, imgObj.height);
    if (file.size > 1024 * 150) {
        // console.log(imgObj, 'imgObj');
        let canvas = getCanvasFromImage(orientation, width, height, imgObj);
        let base64Url = canvas.toDataURL(file.type);
        let filesObj = dataURItoFile(base64Url, file.name);
        console.log(filesObj.size / 1024, ' kb, new file size');
        doUpload(filesObj);
        // this.doUploadByBlob(blobObj, file.name);
    } else {
        doUpload(file);
    }
})
const doUpload = async (files) => {
    const newImage = await getImageObj(files);
    $img.setAttribute('src', newImage.src);
}