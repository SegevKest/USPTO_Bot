function performClick(el){
    el.click();
    console.log("click"); 
}

function performUnClick(){
    console.log("Unclick"); 
}


try {

    let spansElements = document.querySelectorAll("span.menu-item-text");
    let searchText = "ביטחון ובטיחות", secondTextToSearch = "בטיחות בעבודה";
    let foundFirst, foundSecond;

   
    for (var i = 0; i < spansElements.length; i++) {

        if (spansElements[i].textContent == searchText) {
                foundFirst= spansElements[i];
                    console.log(foundFirst);
            }

        if (spansElements[i].textContent == secondTextToSearch ) {
                foundSecond= spansElements[i];
                    console.log(foundSecond);
            }
            
        if(  foundSecond &&  foundFirst)
            break;
    }

   if( foundSecond == null ||   foundFirst == null )
        throw "Elements Not Found";

 // Adding event listener to the button       
foundFirst.addEventListener("mouseover", performClick(foundFirst) );
foundSecond.addEventListener("click", performClick(foundSecond) );


foundFirst.removeEventListener("mouseover", performUnClick(foundFirst) );
foundSecond.removeEventListener("click", performUnClick(foundSecond) );

}

catch(err) {

    console.log(err);

}

