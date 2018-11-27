//Load users from server
var connection = true;
function loadUsers(callback) {
    $.ajax({
        url: myIp
    }).done(function (users) {
    	//connection = true;
        //console.log('Users loaded: ' + JSON.stringify(items));
        callback(users);
    }).fail(function(){
    	connection = false;
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
        console.log("Updated user: " + JSON.stringify(user))
    }).fail(function(){
    	connection = false;
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
        url: myIp + "/takennames"
    }).done(function (names) {
    	connection = true;
        callback(names);
    }).fail(function(){
    	connection = false;
    	console.error("No se ha podido cargar la lista de nicknames ocupados");
    	
    })
}

/////////////////////////////////////////LUGAR DE CONSULTA///////////////////////////////////////
/*$(document).ready(function () {
	
	///Esto se crea cuando se cree mainMenu
	 item.nickname = prompt("Please enter your name", "Username");
	    if (item.nickname != null) {
	    	createItem(item, function(id){console.log("mi id: " + id)});
	    	console.log(item.nickname);
	    	//document.getElementById("demo").innerHTML = "Hello " + person + "! How are you today?";
	    } 
})
object.onunload = function(){myScript};
Show item in page
function showItem(item) {

    var checked = '';
    var style = '';

    if (item.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<div id="item-' + item.id + '"><input type="checkbox" ' + checked + '><span ' + style + '>' + item.description +
        '</span> <button>Delete</button></div>')
}

$(document).ready(function () {
    var item = {
        nickname: "Pepe",
        elemento: 1,
        puntuacion: 0
    } 
    createItem(item,function(id){console.log("mi id es: " + id)})
})
    loadItems(function (items) {
        //When items are loaded from server
        for (var i = 0; i < items.length; i++) {
            showItem(items[i]);
        }
    });

    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var itemDiv = elem.parent();
            var itemId = itemDiv.attr('id').split('-')[1];
            itemDiv.remove()
            deleteItem(itemId);
        }
    })

    //Handle items checkboxs
    info.change(function (event) {

        //Get page elements for item
        var checkbox = $(event.target);
        var itemDiv = checkbox.parent();
        var textSpan = itemDiv.find('span');

        //Read item info from elements
        var itemDescription = textSpan.text();
        var itemChecked = checkbox.prop('checked');
        var itemId = itemDiv.attr('id').split('-')[1];

        //Create updated item
        var updatedItem = {
            id: itemId,
            description: itemDescription,
            checked: itemChecked
        }

        //Update item in server
        updateItem(updatedItem);

        //Update page when checked
        var style = itemChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })

    //Handle add button
    $("#add-button").click(function () {

        var value = input.val();
        input.val('');

        var item = {
            description: value,
            checked: false
        }

        createItem(item, function (itemWithId) {
            //When item with id is returned from server
            showItem(itemWithId);
        });
    })
})*/