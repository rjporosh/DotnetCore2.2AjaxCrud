$(document).ready(function () {
    loadData();
    $.ajax({
        type: "GET",
        url: "/Home/getUser",
        data: "{}",
        success: function (data) {
            var s = '<option value="-1">Please Select a User</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
            }
            $("#usersDropdown").html(s);
        }
    });  
});
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
     
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            getUsers();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function getbyID(Id) {
    $('#Name').css('border-color', 'lightgrey');
   
    $.ajax({
        url: "/Home/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
         
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;
    var empObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val() 
       
    };

    $.ajax({

        url: "/Home/Update" ,
        
        data: JSON.stringify(empObj),
        async: true,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            loadData();
            getUsers();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
                getUsers();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function getUsers() {
    $.ajax({
        type: "GET",
        url: "/Home/getUser",
        data: "{}",
        success: function (data) {
            var s = '<option value="-1">Please Select a User</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
            }
            $("#usersDropdown").html(s);
        }
    });  
}
function clearTextBox() {
    $('#Id').val("");
    $('#Name').val("");
    
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
  
}
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
   
    return isValid;
}