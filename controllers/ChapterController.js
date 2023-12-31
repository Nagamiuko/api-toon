import ChapterData from '../models/ChapterModels.js'
import BookData from '../models/BookModels.js'
import ImageChapter from '../models/ImageModels.js'
import cloudinary from '../cloudinary/cloudinary.js'
import fs from 'fs'
import BookModels from '../models/BookModels.js'
import UserModels from '../models/UserModels.js'

export const createChapter = async (req, res, next) => {
   const bookid = req.params.bookid;
   const  {title_name, contents} = req.body;
   const imagechapter = req.files ;

     let imaArry = imagechapter.map((file)=>{
     let img = fs.readFileSync(file.path)
     return img.toString('base64')
   })
   console.log(imagechapter);
   // console.log(req.files.path);
   try{
   
      const newChapterBook = new ChapterData({
         title_name:title_name,
         contents:contents,
         books:bookid
      }) 
      const saveChapter = await newChapterBook.save()
      imaArry.map((dataimage,index)=>{
         const newImageChapter = {
            chapterbook:saveChapter._id,
            image:imagechapter[index].filename,
            filename:imagechapter[index].originalname,
            imageNumber:index+1
            // imagebaes64:dataimage,
         }
         const newImage = new ImageChapter(newImageChapter)
         return newImage.save()
      }) 
     
       res.status(200).json(saveChapter)
      }catch(err)
      {
         res.status(404).json(err)
      }
}
export const updataChapter = async (req, res, next) => {
   const chapid = req.params.chapterid
   const  {title_name, contents, book_pdf} = req.body
   const imagechapter = req.files 
   console.log(imagechapter);
   console.log(title_name,contents);
   console.log(chapid);
   // console.log(req.files.path);
       let imaArry = imagechapter.map((file)=>{
       let img = fs.readFileSync(file.path)
       return img.toString('base64')
    })
   try{
      if(imagechapter){
         const UpdataChapterBook = await ChapterData.findByIdAndUpdate(chapid,{
           $set:{
            title_name:title_name,
            contents:contents,
            book_pdf:book_pdf,
         }
       },
       {new:true}
      )      
              imaArry.map((dataimage,index)=>{
                 const newImageChapter = {
                    chapterbook:UpdataChapterBook._id,
                    image:imagechapter[index].filename,
                    filename:imagechapter[index].originalname,
                    imageNumber:index+1
              }
              const newImage = new ImageChapter(newImageChapter)
              return newImage.save()
           }) 
           res.status(200).json(UpdataChapterBook)
      }
   else{
       const newChapterBook = await ChapterData.findByIdAndUpdate(chapid,{
            $set:{
               title_name:title_name,
               contents:contents,
               book_pdf:book_pdf,
            }
          },
        {new:true}
      ) 
      res.status(200).json(newChapterBook)
      console.log(newChapterBook);
   }
      }catch(err)
      {
         res.status(404).json(err)
         console.log(err)
      }
}

export const getChapterBookAll = async (req, res ,next) => {
     const book_id = req.params.bookid
     try{
       const Data = await ChapterData.find({
          books:book_id
       }).populate('books')
       res.status(200).json(Data)
     }catch(err){
        res.status(404).json({message:err})
     }

}
export const getChapterBookOne = async (req, res ,next) => {
     const chapter_id = req.params.chapterid
     try{
       const Data = await ChapterData.findById(chapter_id).populate('books')
       res.status(200).json(Data)
     }catch(err){
        res.status(404).json({message:err})
     }

}
export const deleteChapter = async (req, res ,next) => {
     const chapter_id = req.params.chapterid
     try{
       const Data = await ChapterData.findByIdAndDelete(chapter_id).populate('books')
       res.status(200).json("Delete Successfully")
     }catch(err){
        res.status(404).json({message:err})
     }

}

