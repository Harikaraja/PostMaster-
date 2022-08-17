//function to add elements to DOM
function run(string) {
    let tag = document.createElement("div");
    tag.innerHTML = string;
    var element = document.getElementById('paramBox');
    element.appendChild(tag);
}

//Initially hiding parameters box
let paramBox = document.getElementById('paramBox');
paramBox.style.display = "none";
let addBtn = 1;

//hiding the paramsbox when json was choosen

let jsonRadio = document.getElementById('json'); //id of json radio button
let jsontst = document.getElementById('requestJsonBox');//id of json text box
jsonRadio.addEventListener('click', () => {

    let parameters = document.getElementById('paramBox');
    parameters.style.display = "none";
    requestJsonBox.style.display = "block";
});

//hiding the jsonbox when custom parameters was choosen

let paramsRadio = document.getElementById('parameters'); //id of parameter radio button
let paramtst = document.getElementById('paramBox');   //id of parameter text box
paramsRadio.addEventListener('click', () => {

    let json = document.getElementById('requestJsonBox');
    json.style.display = "none";
    paramtst.style.display = "block";
});


let pressBtn = document.getElementById('addParam');
pressBtn.addEventListener('click', () => {
    let string;
    string = `<div id="paramBox" class="form-row">
                    <form class="row g-3">
                        <label for="url" class="col-sm-2 col-form-label">
                            <h5>Parameter${addBtn + 1}</h5>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="keyParam${addBtn + 1}" placeholder="Enter parameter ${addBtn + 1} key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="valueParam${addBtn + 1}" placeholder="Enter parameter ${addBtn + 1} value">

                        </div>

                    </form>
                    <button id="addParam" class="btn btn-primary deleteBtn" id="delBtn"style="margin-left: 85%">-</button>
             </div>`;
    addBtn++; //increment whenever a parameter is added
    run(string);

    //code for deleting parameter elements.....

    let delBtn = document.getElementsByClassName('deleteBtn');
    //console.log(typeof(delBtn)) ;
    for (a of delBtn) {
        //console.log(a);
        a.addEventListener('click', (e) => {

            e.target.parentElement.remove();
        })
    }

});

//obtaining the entered values...
let result = document.getElementById('responsetext');
let submit = document.getElementById('submit');

//submit function

submit.addEventListener('click', () => {
    result.innerHTML = `Please Wait.... your request is being processed....`;
    let urls = document.getElementById('inputurl').value;
    console.log(urls);
    let request = document.querySelector("input[name=request]:checked").value;
    console.log(request);
    let content = document.querySelector("input[name=content]:checked").value;
    console.log(content);
    let data = {};
    if (content == "customparam") {
        for (let i = 1; i <= addBtn; i++) {
            console.log("enter in");
            if (document.getElementById('keyParam' + (i)) != undefined) {
                console.log("entered if");
                let key = document.getElementById('keyParam' + (i)).value;
                let value = document.getElementById('valueParam' + (i)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('json').value;  //if json text is choosen
    }

    //API fetching for get & post requests

    if (request == "GET") {

        fetch(urls,
            {
                method: 'GET',
            }).then((response) => {
                return response.text();
            }).then((data) => {
                document.getElementById('responsetext').value = data;
            });
    }
    else {
        fetch(urls,
            {
                method: 'POST',
                body: data,
                headers: { 'Content-type': 'application/json; charset=UTF-8', }
            }).then((response) => {
                console.log("entered first then");
                return response.text();
            }).then((data) => {
                console.log("entered second then");
                document.getElementById('responsetext').value = data;
                //console.log(data);
            });
    }
});




