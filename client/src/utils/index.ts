export const updateHistory = (company:string,category:string) => {
    if(localStorage.getItem("user")){
        const user = JSON.parse(localStorage.getItem("user") as string);
        if(!user.history){
            user.history = [];
        }
        else{
            user.history = user.history.push({company,category});
        }
        localStorage.setItem("user", JSON.stringify(user));
    }
}