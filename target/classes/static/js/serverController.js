//Load users from server
var connection = true;
var loadUsersProcessed = true;
var updateUserProcessed = true;
var takenNicknamesProcessed = true;
var maxScoreProcessed = true;

function loadUsers(callback) {
    $.ajax({
        url: myIp
    }).done(function (users) {
    	//connection = true;
        //console.log('Users loaded: ' + JSON.stringify(items));
    	loadUsersProcessed = true;
        callback(users);
    }).fail(function(){
    	connection = false;
    	loadUsersProcessed = true;
    	console.error("No se ha podido cargar la lista de usuarios");
    })
}

//Create item in server
function createUser(user, callback) {
    $.ajax({
        method: "POST",
        url: myIp,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (userWithId) {
    	connection = true;
        console.log("User created: " + JSON.stringify(userWithId));
        callback(userWithId);
    }).fail(function(){
    	connection = false;
    	console.error("No se ha podido crear el usuario");
    })
}

//Update user in server
function updateUser(user) {
    $.ajax({
        method: 'PUT',
        url: myIp + user.id,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
    	connection = true;
    	updateUserProcessed = true;
        console.log("Updated user: " + JSON.stringify(user))
    }).fail(function(){
    	connection = false;
    	updateUserProcessed = true;
    	console.error("No se ha podido actualizar el usuario");
    })
}

//Delete user from server
function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: myIp + userId
    }).done(function (user) {
    	connection = true;
        console.log("Deleted user " + userId)
    }).fail(function(){
    	connection = false;
    	console.error("No se ha podido borrar el usuario");
    })
}

function takenNicknames(callback) {
    $.ajax({
        url: myIp + "takennames"
    }).done(function (names) {
    	connection = true;
    	takenNicknamesProcessed = true;
        callback(names);
    }).fail(function(){
    	connection = false;
    	takenNicknamesProcessed = true;
    	console.error("No se ha podido cargar la lista de nicknames ocupados");
    })
}

function maxScore(callback) {
    $.ajax({
        url: myIp + "maxscore"
    }).done(function (maxScore) {
    	connection = true;
    	maxScoreProcessed = true;
        callback(maxScore);
    }).fail(function(){
    	connection = false;
    	maxScoreProcessed = true;
    	console.error("No se ha podido cargar la puntuación máxima");
    })
}