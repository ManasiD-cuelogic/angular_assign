export interface User{
    email:string,
        fname:string,
        lname:string,
        gender:string,
        address:string,
        password:string,
        todoList:any[],
        profilePic: string | ArrayBuffer
}

export interface ToDoList{
    name:string;
    creationDate:string;
    isReminder:string;
    categorie:string;
    status:string;
    isPublic:string;
    reminderDate:string;
}