var siteName = window.document.getElementById("siteName");
var siteURL = window.document.getElementById("siteURL");
var massage = window.document.getElementById("massage");

var arr = [];

if(localStorage.getItem("arr") != null){
    arr = JSON.parse(localStorage.getItem("arr"))
    display();
}

function btnSubmit(){

    if(validate(siteName, nameRegex) == true && validate(siteURL, URLRegex) == true){
        var product={
            siteName: siteName.value,
            siteURL: siteURL.value
        }
        arr.push(product);
        localStorage.setItem("arr", JSON.stringify(arr))
    
        display();
        clearInput();
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
    }else{
        massage.classList.replace("d-none", "d-flex")
    }

}

function display(){
    var box="";
    for(var i=0; i<arr.length;i++){
    
        box+=`
        
        <tr>
            <td>${i+1}</td>
            <td>${arr[i].siteName}</td>
            <td>     <a href="${arr[i].siteURL}" target="block">  <button class="btn btnVisit"> <i class="fa-solid fa-eye"></i> Visit </button>   </a>            </td>
            <td>
                <button  onclick="deleteItem(${i})" class="btn btnDelete"><i class="fa-solid fa-trash-can"></i> Delete </button>
            </td>
        </tr>
        
        
        `
        
    }
    window.document.getElementById("view").innerHTML=box


}


function deleteItem(i){
    arr.splice(i,1);
    localStorage.setItem("arr", JSON.stringify(arr))
    
    display();
}

function clearInput(){
    siteName.value= "";
    siteURL.value= "";
}


var nameRegex = /^\w{3,}(\s+\w+)*$/;
var URLRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function validate(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

function closeMassage(){
    massage.classList.replace("d-flex", "d-none");
}