import axios from "axios";

export class UserService {
    getUsers() {
        return axios.get("http://localhost:8080/user/");
    }
    
    signUp(user) {
        return axios.post("http://localhost:8080/user/signup/", {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        });
    }
    signIn(user) {
        console.log(user);
        return axios.post("http://localhost:8080/user/login",{
            email: user.email,
            password: user.password
        });
    }
    deleteUser(id) {
        return axios.delete("http://localhost:8080/user/delete/"+id);
    }
    updateUser(id,user) {  
        return axios.put("http://localhost:8080/user/update/"+ id,{
            id:0,
            email : user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            password:user.password,
            role:"member"
        });
    }
    addUser(user) {
        return axios.post("http://localhost:8080/user/add/",+ user);
    }
    

}