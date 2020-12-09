/*
Script of actions in PAIR in first screen
1. choosing customer search
2. adding the customer number + checkboxes
3. click on search
*/
function searchByCustomerNumber(){

                // Initizlize all Variables
                
                //this variables will come from kryon as parameteres
                let currentCustomerNumber = XXXXX,
                    selectCustomerOptionIndex = 2;


                const   pastDaysOptionIndex = 1,
                        pastDaysOptionValue = "7 days",
                        sortByOptionIndex = 0,
                        sortByOptionValue = "Image UploadDate";
        
                let searchElements,
                    searchByCustomer,
                    viewCorrespondenceElement,
                    unviewedRadioButtonElement,
                    rootSelectOptionElement,
                    pastDaysElement,
                    pastDaysElementValueCheck,
                    sortByElement,
                    sortByElementValueCheck,
                    selectCustomerElement,
                    selectCustomerValueCheck,
                    finalSubmitButton;
    try {
 // ------------------------------------------------------------------------

         // Select Search by Customer number
        searchElements = document.querySelectorAll("a.noborderedGray12pt");
        if (! searchElements)
            throw "Search Element not exist";

        searchByCustomer = searchElements[1];
         // Clicking on this option will open the search by customer number options
         searchByCustomer.click();
// ------------------------------------------------------------------------

        // Select VIEW CORRESPONDENCE FILTER
        viewCorrespondenceElement = document.getElementById("ViewOutgoingCorrespondence");
        if (! viewCorrespondenceElement)
            throw "View Correspondence Element not exist";

        // click this option to select this way of sorting
        viewCorrespondenceElement.click();
// ------------------------------------------------------------------------

        // Select Radio button for UNVIEWED RESULTS
        unviewedRadioButtonElement = document.querySelector('input[title="unviewed"]');
       if (! unviewedRadioButtonElement)
            throw "unviewd Radio Button Element not exist";
    
        // click this option to select this way of communications
       unviewedRadioButtonElement.click();
// ------------------------------------------------------------------------

        // Choose the necessary option from the list - 
        // past Days + sort by
        rootSelectOptionElement = document.querySelectorAll("select#ViewOutgoingCorrespondence");
        pastDaysElement = rootSelectOptionElement[0];
        sortByElement = rootSelectOptionElement[1];

        // Select the 7 days option element
        pastDaysElement.selectedIndex = pastDaysOptionIndex;
        pastDaysElementValueCheck = pastDaysElement.selectedOptions[0].innerText;
        if (! pastDaysElementValueCheck == pastDaysOptionValue )
            throw "Selected past days didnot work";

        // sort by Select the option needed
        sortByElement.selectedIndex = sortByOptionIndex;
        sortByElementValueCheck = sortByElement.selectedOptions[0].innerText;
        if (! sortByElementValueCheck == sortByOptionValue )
            throw "Sort by didnot work";
// ------------------------------------------------------------------------

        // choose the specific customer from the List of customers
        selectCustomerElement = document.querySelector("select#customernumber_id1");
        selectCustomerElement.selectedIndex = selectCustomerOptionIndex;
        selectCustomerValueCheck = selectCustomerElement.selectedOptions[0].innerText;
        if (! selectCustomerValueCheck.includes(currentCustomerNumber) )
            throw "choosing customer didnot work";
// ------------------------------------------------------------------------

        // click submit to continue
        finalSubmitButton = document.querySelector("input#SubmitCustomer");
        finalSubmitButton.click();

    } 
    
    catch (error) {
        console.log(error);
    } 

}