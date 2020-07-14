import { User } from './user';


export class UserList{

    private list:User[] = [];

    constructor(){

    }

    public addUser(user:User){
        this.list.push(user);
        console.log(this.list);

        return user;
    }

    public updateName( id:string, name: string){

        this.list.forEach(user => {
            if(user.id === id){
                user.name = name;
            }
        });

        console.log('=== actualizando usuario');
        console.log(this.list);
    }

    // obtener toda la lista de usuarios
    public getList(){
        return this.list.filter(user => user.name != 'sin-nombre');
    }

    //obtener solo un usuario
    public getUser(id:string){
        return this.list.find(user=> user.id === id);
    }

    //obtener todos los usuarios de una sala
    public getUsersRoom(room:string){
        return this.list.filter(user => user.room === room);
    }

    //delete user
    public deleteUser(id:string){

        const tempUser = this.getUser(id);

        this.list = this.list.filter(user => user.id != id);

        return tempUser;
    }
}