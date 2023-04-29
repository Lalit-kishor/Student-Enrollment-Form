/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName = "SCHOOL-DB";
var stuRelationName = "STUDENT-TABLE";
var connToken = "90932740|-31949278408894157|90950897";

$("#rollNo").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getRollNoAsJsonObj(){
    var rollNo = $("#rollNo").val();
    var jsonStr = {
        stuRollNo : rollNo
    };
//    console.log(rollNo); 
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#rollNo").val(record.stuRollNo);
    $("#name").val(record.stuName);
    $("#clas").val(record.stuClass);
    $("#birthdate").val(record.stuBirthDate);
    $("#address").val(record.stuAddress);
    $("#enrolldate").val(record.stuEnrollDate);
    
}
function resetData() {
    $("#rollNo").val("");
    $("#name").val("");
    $("#clas").val("");
    $("#birthdate").val("");
    $("#address").val("");
    $("#enrolldate").val("");
    $("#rollNo").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#update").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#rollNo").focus();
}
function validateData()
{
    var rollNo, name, clas, birthdate, address, enrolldate;
    rollNo = $("#rollNo").val();
    name = $("#name").val();
    clas = $("#clas").val();
    birthdate = $("#birthdate").val();
    address = $("#address").val();
    enrolldate = $("#enrolldate").val();
    
    if(rollNo==="")
    {
        alert("Enter Student Roll No");
        $("#rollNo").focus();
        return "";
    }
    if(name==="")
    {
        alert("Enter Full-Name of Student");
        $("#name").focus();
        return "";
    }
    if(clas==="")
    {
        alert("Enter Class of Student");
        $("#clas").focus();
        return "";
    }
    if(birthdate==="")
    {
        alert("Enter Bith-Date of Student");
        $("#birthdate").focus();
        return "";
    }
    if(address==="")
    {
        alert("Enter address of Student");
        $("#address").focus();
        return "";
    }
    if(enrolldate==="")
    {
        alert("Enter Enrollment-Date of Student");
        $("#enrolldate").focus();
        return "";
    }
    
    var jsonStrObj = {
        
        stuRollNo : rollNo,
        stuName : name,
        stuClass :clas,
        stuBirthDate : birthdate,
        stuAddress : address,
        stuEnrollDate : enrolldate
    };
    return JSON.stringify(jsonStrObj);
}
function getStudent()
{
//    console.log("hello")
    var rollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,stuDBName,stuRelationName,rollNoJsonObj);
    jQuery.ajaxSetup({async:false});
//    console.log(getRequest)
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    
    console.log(resJsonObj); 
    
    if(resJsonObj.status===400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#name").focus();
    }
    else if(resJsonObj.status===200){
        $("#rollNo").prop("disabled",true);
        fillData(resJsonObj);
        
        $("#update").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#name").focus();
    }
}
function saveData()
{
    var jsonStrObj = validateData();
    if(jsonStrObj==="")
    {
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,stuDBName,stuRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    
    resetForm();
    $("#rollNo").focus();
}

function updateData(){
    $("#update").prop("disabled",true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,stuDBName,stuRelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    
    resetData();
    $("#rollNo").focus();
}

