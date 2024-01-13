
function ajoute() {
    let Affich = document.getElementById('affich');
    let list = document.getElementById('output');
    let Titre = document.getElementById('titre').value;
    let Description = document.getElementById('description').value;
    let Dd = new Date(document.getElementById('dd').value);
    let Df = new Date(document.getElementById('df').value);
    let today = new Date();
    let prio = document.getElementById('check');

    document.getElementById("titre_span").innerHTML = "";
    document.getElementById("description_span").innerHTML = "";
    document.getElementById("Dd_span").innerHTML = "";
    document.getElementById("Df_span").innerHTML = "";

    if (Titre === "") {
        document.getElementById('titre_span').innerHTML = "Please enter a title";
    }
    if (Description === "") {
        document.getElementById("description_span").innerHTML = "Please enter a description";
    }
    if (isNaN(Dd) || Dd < today) {
        document.getElementById('Dd_span').innerHTML = "Invalid start date";
    }
    if (isNaN(Df) || Dd > Df) {
        document.getElementById('Df_span').innerHTML = "Invalid end date";
    }
    if (!isNaN(Dd) && Dd > today && isNaN(Df) || Dd > Df) {
        document.getElementById("Df_span").style.left = "1015px"
    }
    if (Titre != "" && Description != "" && !isNaN(Dd) && Dd > today && !isNaN(Df) && Dd < Df) {

        let formattedOutput = Titre + ' | ' + Description + ' | ' + Dd.toDateString() + ' | ' + Df.toDateString();

        document.getElementById('titre').value = "";
        document.getElementById('description').value = "";
        document.getElementById('dd').value = "";
        document.getElementById('df').value = "";

        Affich.style.display = "block";

        let Output = document.createElement('li');
        let trash = document.createElement('i');
        let edit = document.createElement('i');
        let finished = document.createElement('i');
        let editOutput;
        let X;
        let save;

        Output.innerHTML = formattedOutput;
        const itemId = Date.now();
        Output.id = `item_${itemId}`;
        trash.classList.add('fas', 'fa-trash');
        edit.classList.add('fas', 'fa-pen');
        finished.classList.add('fas', 'fa-check');

        list.appendChild(Output);
        list.appendChild(finished);
        list.appendChild(trash);
        list.appendChild(edit);

        document.getElementById(`item_${itemId}`).style.animation = "popin 0.6s linear";

        if (prio.checked) {
            Output.style.backgroundColor = "#F39F5A";
            Output.style.boxShadow = "5px 5px 15px 0px black";
            prio.checked = false;
        }

        finished.onclick = function () {
            X = document.createElement("i");
            X.classList.add('fas', 'fa-times');
            Output.style.color = "#b5b5b5";
            Output.style.textDecoration = "line-through";
            list.replaceChild(X, finished);
            list.removeChild(edit);

            X.onclick = function () {
                Output.style.color = "#ffff";
                Output.style.textDecoration = "none";
                list.replaceChild(finished, X);
                list.appendChild(edit);
            };
        };
        edit.onclick = function () {
            editOutput = document.createElement('input');
            editOutput.value = formattedOutput;
            editOutput.id = 'outputedit';
            save = document.createElement('i');
            save.classList.add('fas', 'fa-check');
            save.id = 'saveButton';
            list.replaceChild(editOutput, Output);
            list.replaceChild(save, edit);
            list.removeChild(trash);
            list.removeChild(finished);

            save.onclick = function () {
                formattedOutput = editOutput.value;
                Output.innerHTML = formattedOutput;
                list.removeChild(editOutput);
                list.removeChild(save);
                list.appendChild(Output);
                list.appendChild(finished);
                list.appendChild(trash);
                list.appendChild(edit);
            };
        };

        trash.onclick = function () {
            document.getElementById(`item_${itemId}`).style.animation = "slideOut 0.5s linear";
            trash.remove()
            if (X != null) {
                X.remove()
            }
            if (edit != null) {
                edit.remove()
            }
            if (finished != null) {
                finished.remove()
            }
            if (editOutput != null) {
                editOutput.remove()
            }
            
            setTimeout(function () {
                list.removeChild(document.getElementById(`item_${itemId}`));
                console.log(list.children.length)
                if (list.children.length == 0) {
                     Affich.style.display = "none"
                }
            }, 500);
        };
    }
}
