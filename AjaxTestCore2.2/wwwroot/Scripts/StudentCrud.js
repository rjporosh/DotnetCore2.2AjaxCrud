$(document).ready(function () {
    var options = {};
    options.url = "/Home/Index?handler=SelectAll";
    options.type = "GET";
    options.dataType = "json";
    options.success = function (data) {
        data.forEach(function (element) {
            $("#customerid").append("<option>"
                + element.ID + "</option>");
        });
    };
    options.error = function () {
        $("#msg").html("Error while making Ajax call!");
    };
    $.ajax(options);
});

$("#customerid").change(function () {
    var options = {};
    options.url = "/Index/" +
        $("#customerid").val() + "?handler=SelectByID";
    options.type = "GET";
    options.dataType = "json";
    options.success = function (data) {
        $("#companyname").val(data.companyName);
        $("#contactname").val(data.contactName);
        $("#country").val(data.country);
    };
    options.error = function () {
        $("#msg").html("Error while making Ajax call!");
    };
    $.ajax(options);
});

$("#insert").click(function () {
    var options = {};
    options.url = "/Index?handler=Insert";
    options.type = "POST";

    var obj = {};
    obj.customerID = $("#newcustomerid").val();
    obj.companyName = $("#companyname").val();
    obj.contactName = $("#contactname").val();
    obj.country = $("#country").val();

    options.data = JSON.stringify(obj);
    options.contentType = "application/json";
    options.dataType = "json";

    options.beforeSend = function (xhr) {
        xhr.setRequestHeader("MY-XSRF-TOKEN",
            $('input:hidden[name="__RequestVerificationToken"]').val());
    };
    options.success = function (msg) {
        $("#msg").html(msg);
    };
    options.error = function () {
        $("#msg").html("Error while making Ajax call!");
    };
    $.ajax(options);
});
$("#update").click(function () {
    var options = {};
    options.url = "/Index/"
        + $("#customerid").val() + "?handler=Update";
    options.type = "PUT";

    var obj = {};
    obj.customerID = $("#customerid").val();
    obj.companyName = $("#companyname").val();
    obj.contactName = $("#contactname").val();
    obj.country = $("#country").val();

    options.data = JSON.stringify(obj);
    options.contentType = "application/json";
    options.dataType = "html";

    options.beforeSend = function (xhr) {
        xhr.setRequestHeader("MY-XSRF-TOKEN",
            $('input:hidden[name="__RequestVerificationToken"]').val());
    };
    options.success = function (msg) {
        $("#msg").html(msg);
    };
    options.error = function () {
        $("#msg").html("Error while making Ajax call!");
    };
    $.ajax(options);
});

$("#delete").click(function () {
    var options = {};
    options.url = "/Index/"
        + $("#customerid").val() + "?handler=Delete";
    options.type = "DELETE";
    options.dataType = "html";
    options.beforeSend = function (xhr) {
        xhr.setRequestHeader("MY-XSRF-TOKEN",
            $('input:hidden[name="__RequestVerificationToken"]').val());
    };
    options.success = function (msg) {
        $("#msg").html(msg);
    };
    options.error = function () {
        $("#msg").html("Error while making Ajax call!");
    };
    $.ajax(options);
});
