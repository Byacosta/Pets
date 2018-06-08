const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

// Cambio de prueba
// Cambio de prueba 2

var users = [
    {id: 0, name: 'William Hernando', lastname: 'Alvarez Villota', noid: '1131084989', login: 'WilliamA', pass:'123', address: 'Gaulcaloma', email: 'williamalvarez0094@gmail.com', sex:'Masculino' },
    {id: 1, name: 'Brian Yessid', lastname: 'Acosta Mosquera', noid: '1085283982', login: 'BrianA', pass:'456', address: 'Corazon De Jesus', email: 'yessidbryan@gmail.com', sex:'Masculino'}
];

// soporte para body codificados en jsonsupport
app.use(bodyParser.json());
// soporte para body codificados
app.use(bodyParser.urlencoded({ extended: true }));
 
app.get('/', (req, res) => {
  res.status(200).send("Welcome To PetsAppRest")
})

// Listar usuarios
app.get('/users', (req, res) => {
    let pos = 0;
    users.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(users)
})

// Crear usuarios
app.post('/users', (req, res) => {
    let data = req.body;
    let consecutive = users.length;
    let itemUser = {id: consecutive, name: data.Name, lastname: data.LastName, login: data.Login, pass: data.Password, address: data.Address, email: data.Email, sex: data.Sex};
    users.push(itemUser)
    res.send("New user create")
})

// Actualizar usuarios
app.put('/users/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    users[params.id]['name'] = data.Name;
	users[params.id]['lastname'] = data.LastName;
	users[params.id]['noid'] = data.NoId;
	users[params.id]['login'] = data.Login;
	users[params.id]['pass'] = data.Password;
	users[params.id]['address'] = data.Address;
	users[params.id]['email'] = data.Email;
	users[params.id]['sex'] = data.Sex;
    res.send("User update")
})

// Eliminar usuarios
app.delete('/users/:id',(req, res) => {
    let params = req.params;
    users.splice(params.id, 1);
    res.send('User delete')
})
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})