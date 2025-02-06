const { v4: uuidv4 } = require('uuid');

let USERS = [{
    id: 'u1',
    name: 'Max',
    email: 'max@zimttech.org'
}];

const getUsers = (req, res, next) => {
    res.status(200).json({ users: USERS });
};

const getUserById = (req, res, next) => {
    const userId = req.params.uid;
    const user = USERS.find(u => u.id === userId); // Use '===' for comparison
    res.status(200).json({ user });
};

const createUser = (req, res, next) => { 
    const { name, email } = req.body;
    const createdUser = {
        id: uuidv4(), 
        name,
        email
    };
    USERS.push(createdUser);
    res.status(201).json({ user: createdUser });
};

const patchUser = (req, res, next)=>{
    const userId = req.params.id;
    const {name, email} = req.body;
    const user = {...USERS.find(u=>u.id === userId)};
    const index = USERS.findIndex(u=>u.id === userId);
    user.name = name;
    user.email = email;
    USERS[index]= user;
    res.status(200).json({user});
    
}
const deleteUser = (req, res, next)=>{
    const userId = req.params.id;
    USERS = USERS.filter(u=>u.id !== userId);
    res.status(200).json({message: 'User deleted'});
}



module.exports = { getUsers, getUserById, createUser, patchUser, deleteUser};