const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

let users = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','users.json'),'utf-8'));
const {validationResult} = require('express-validator');

module.exports = {
    registro : (req,res) => {
        return res.render('users/registro', {
            title : 'Registro usuario',
        });
    },
    processRegistro : (req,res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            const {name, lastname, email, password, rePassword} = req.body;
            let user = {
                id : users.length !=0 ? users[users.length - 1].id + 1 : 1,
                name : name.trim(),
                lastname : lastname.trim(),
                email : email.trim(),
                password : bcrypt.hashSync(password,5),
                rePassword : bcrypt.hashSync(password,5),
                avatar : req.file ? req.file.filename : 'default.jpg',
                rol : "user"
            }
            users.push(user);
            fs.writeFileSync(path.join(__dirname,'../data/users.json'),JSON.stringify(users,null,3),'utf-8');
                
            return res.redirect('/')

        }else{
        return res.render('users/registro',{
            errores : errors.mapped(),
            old : req.body
        })}
    },
    login : (req,res) => {
        return res.render('users/login', {
            title : 'Login usuario',
        })
    },
    processLogin :(req,res)=>{
        let errors = validationResult(req);

        if (errors.isEmpty()) {

        }else{
            return res.render('login', {errors: errors.errors});
        }
    }
}

//quedé en SESSIONS playground 13:13