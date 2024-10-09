// Selectable and returnable items
const draggableItems = document.querySelectorAll('.draggable-item');
const draggableList = document.getElementById('draggable-list');
const selectedList = document.getElementById('selected-list'); // Corrected 'getElementById'
const orderedList = document.getElementById('ordered-list');
const errorMessage = document.getElementById('error-message');

let selectedCount = 0;
const maxSelection = 5;

// Function to handle returning selected items to the left
function addReturnFunctionality(item, originalItem) {
    const returnButton = document.createElement('button');
    returnButton.innerText = 'إرجاع';
    returnButton.classList.add('return-button');
    
    // Return the item to the left list when the button is clicked
    returnButton.addEventListener('click', () => {
        orderedList.removeChild(item.parentElement);
        selectedCount--;
        errorMessage.style.display = 'none'; // Hide error message

        // Re-enable the original item in the draggable list
        originalItem.classList.remove('disabled');
    });
    
    return returnButton;
}

// Function to move the item up in the list
function moveUp(listItem) {
    const prevItem = listItem.previousElementSibling;
    if (prevItem) {
        orderedList.insertBefore(listItem, prevItem);
    }
}

// Function to move the item down in the list
function moveDown(listItem) {
    const nextItem = listItem.nextElementSibling;
    if (nextItem) {
        orderedList.insertBefore(nextItem, listItem);
    }
}

// Add click event to each selectable item
draggableItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const clickedItemText = e.target.innerText; // Get clicked item text
        
        // If less than the maximum allowed items are selected
        if (selectedCount < maxSelection) {
            const listItem = document.createElement('li'); // Create a new list item (numbered)
            const controls = document.createElement('div'); // Container for controls
            controls.classList.add('controls');

            // Add controls (up and down arrows)
            const upButton = document.createElement('button');
            upButton.classList.add('arrow-button');
            upButton.innerText = '↑';
            upButton.addEventListener('click', () => moveUp(listItem));

            const downButton = document.createElement('button');
            downButton.classList.add('arrow-button');
            downButton.innerText = '↓';
            downButton.addEventListener('click', () => moveDown(listItem));

            controls.appendChild(upButton);
            controls.appendChild(downButton);

            // Create the draggable item
            const newItem = document.createElement('div'); // Create a new div for the selected item
            newItem.classList.add('draggable-item');
            newItem.innerText = clickedItemText; // Set the selected item's text

            // Add the return button to the new item
            newItem.appendChild(addReturnFunctionality(newItem, item));
            
            listItem.appendChild(controls); // Add the controls (arrows) between the number and field
            listItem.appendChild(newItem); // Add the div to the list item
            orderedList.appendChild(listItem); // Add the list item to the ordered list
            selectedCount++; // Increase the count

            // Disable the original item in the left list
            item.classList.add('disabled');

            errorMessage.style.display = 'none'; // Hide error message
        } else {
            errorMessage.style.display = 'block'; // Show error message if limit exceeded
        }
    });
});
