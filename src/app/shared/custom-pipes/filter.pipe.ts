import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {


  removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject  = {};

    for(let i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(let i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}
  
  checkingEquality(item,propName,filterString,resultArray){
    /*
    if(item[propName].toLowerCase() === filterString.toLowerCase()){
      resultArray.push(item)

    }
    */
   if(item[propName].toLowerCase().indexOf(filterString.toLowerCase()) > -1){
    resultArray.push(item)
   }
  }
  

  transform(
            value: any, 
            filterString:string,
            propNameOfItem:string,
            propNameCreationDate:string,
            propNameReminderDate:string,
            propCategorie:string,
            propNameIsPublic:string,
            propNameStatus): any 
  {

    if(value.length === 0 || filterString === ''){
      return value;
    }
    const resultArray = []
    for(const item of value){
      this.checkingEquality(item,propNameOfItem,filterString,resultArray)
      this.checkingEquality(item,propNameCreationDate,filterString,resultArray)
      this.checkingEquality(item,propNameReminderDate,filterString,resultArray)
      this.checkingEquality(item,propCategorie,filterString,resultArray)
      this.checkingEquality(item,propNameIsPublic,filterString,resultArray)
      this.checkingEquality(item,propNameStatus,filterString,resultArray)
  }
  var uniqueArray = this.removeDuplicates(resultArray, "name");
    return uniqueArray;

  }
}


     