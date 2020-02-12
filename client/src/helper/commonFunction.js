
export function readMoreText(text){
    let textResult = '';
     if(text.length > 200){
         textResult = text.substring(0,200)+'...';
     } else{
         textResult = text;
     }
     return textResult;
 }