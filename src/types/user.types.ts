export const RegisterSchema = {
    body:{
        type:'object',
        required:['name','email','password'],
        properties:{
            name:{type:'string'},
            email:{type:'string'},
            password:{type:'string'}
        }
    }
}
export const LoginSchema = {
    body:{
        type:'object',
        required:['email','password'],
        properties:{
            email:{type:'string'},
            password:{type:'string'}
        }
    }
}