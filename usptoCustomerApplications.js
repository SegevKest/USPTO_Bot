/*
Script of actions in PAIR in second screen
1. choosing customer search
2. adding the customer number + checkboxes
3. click on search
*/
function getCustomerApplications(){

        // Initizlize all Variables
                
        //this variables will come from kryon as parameteres

        const   singleDoc = 1, pairOfDocs = 2,
                docDescriptionCol = 9, 
                docCodeCol = 8,
                applicationNumCol = 2, 
                noticeOfAcceptanceDocDescription = "Notice of DO/EO Acceptance Mailed",
                noticeOfAcceptanceDocCode = "M903",
                filingReceiptDocDescription = "Filing Receipt",
                filingReceiptDocCode = "APP.FILE.REC";
        
        let tableByCustomerElement,
            objectOfRowsFromTable,
            arrayOfApplication = [],
            currentXML = "", currentXMLObj;

        let parser = new DOMParser();
    // ------------------------------------------------------------------------

    try {

         // Select Search by Customer number
        tableByCustomerElement = document.querySelector("table.appsByCustNumber");
        if (! tableByCustomerElement)
            throw "Main Table Element didnt found";

         // receive all rows from the Table
         // Start seperation of rows as needed
            
        objectOfRowsFromTable = tableByCustomerElement.getElementsByTagName("tr");

        // ------------------------------------------------------------------------

        // Iterate over all elements in the table
        for ( let i = 0 ; i < objectOfRowsFromTable.length ; i++) {

            // create variables for current Row
            let currentRow = objectOfRowsFromTable[i].children,
                currentRowAppNumberCol = currentRow[applicationNumCol].innerText,
                currentRowDescriptionCol = currentRow[docDescriptionCol].innerText,
                currentRowCodeCol = currentRow[docCodeCol].innerText;
            // ------------------------------------------------------------------------

            // check Document Description is filing Receipt - Code and Description
            if ( currentRowDescriptionCol.includes( filingReceiptDocDescription ) && 
                 currentRowCodeCol.includes( filingReceiptDocCode ) )    {
                    // create the xml object with 2 file - Filing Receipt and Notice of Acceptance
                    // and insert to array of all documents found

                    currentXML = `<application>
                                    <docsNumber>${singleDoc}</docsNumber>
                                    <appNumber>${currentRowAppNumberCol}</appNumber>
                                    <document1>
                                        <documentCode>${currentRowCodeCol}</documentCode>
                                        <documentDesc>${currentRowDescriptionCol}</documentDesc>
                                    </document1>
                                 </application>`;
            }
            // ------------------------------------------------------------------------    
            
            // check Document Description is Notice of acceptance - Code and Description
            if ( currentRowDescriptionCol.includes( noticeOfAcceptanceDocDescription ) && 
                 currentRowCodeCol.includes( noticeOfAcceptanceDocCode ) )    {
                // check if this is the end of the table or can check next element
                if ( i + 1 < objectOfRowsFromTable.length  ) {

                    // check next row element -if Filing Receipt
                    let nextRow = objectOfRowsFromTable[i + 1].children,
                    nextRowAppNumberCol = nextRow[applicationNumCol].innerText,
                    nextRowDescriptionCol = nextRow[docDescriptionCol].innerText,
                    nextRowCodeCol = nextRow[docCodeCol].innerText;
            // ------------------------------------------------------------------------
            
                    // check Document Description is filing Receipt - Code and Description and Application number is the Same!!!
                    if (nextRowDescriptionCol.includes( filingReceiptDocDescription ) && 
                        nextRowCodeCol.includes( filingReceiptDocCode ) &&
                        currentRowAppNumberCol == nextRowAppNumberCol ) {
                        // create the xml object with 2 file - Filing Receipt and Notice of Acceptance
                        // and insert to array of all documents found 

                            currentXML = `<application>
                                            <docsNumber>${pairOfDocs}</docsNumber>
                                            <appNumber>${currentRowAppNumberCol}</appNumber>
                                            <document1>
                                                <documentCode>${currentRowCodeCol}</documentCode>
                                                <documentDesc>${currentRowDescriptionCol}</documentDesc>
                                            </document1>
                                            <document2>
                                                <documentCode>${nextRowCodeCol}</documentCode>
                                                <documentDesc>${nextRowDescriptionCol}</documentDesc>
                                            </document2>
                                        </application>`;
                            
                            // increasing the counter of the loop to skip the next element
                            i++;
                    }
                    else
                        throw "Found single document of Notice of Acceptance - without Filing Receipt";
                }
                else 
                    throw "Reached end of main table, last file in table is Notice of Acceptance ";
            }
            // ------------------------------------------------------------------------

            // parse the XML string that was built during the loop only for necessary documents
            //currentXMLObj = parser.parseFromString( currentXML, "text/xml");
            // push to the array
            if(currentXML.length > 0)
                arrayOfApplication.push( currentXML );
            
                currentXML = '';
        } 


        

    } 
    
    catch (error) {
        console.log(error);
    } 

    finally {
                // Print the array of the Application relevant
                 console.log(arrayOfApplication);
                 
                let buttonSelectNewCaseElement = document.querySelector("a#ui-tabpanel-0-label");
                // select button for continue to next page
                if (! buttonSelectNewCaseElement)
                    throw "Button Element to next page didnt found";
                
                buttonSelectNewCaseElement.click();

                    
    }


}