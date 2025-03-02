<<<<<<< HEAD:Frontend/script.js
document.addEventListener('DOMContentLoaded', function () {
    const GEMINI_API_KEY = "AIzaSyAtV-57N7QWcTaKYbFdxACeTnHtnMBCATo"; // Replace with your actual API key

    async function getDesignSuggestions(prompt) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error Response:", errorData);
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log("API Response Data:", data);

            return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestion available.";
        } catch (error) {
            console.error("Error fetching AI suggestions:", error);
            return "Here’s a general suggestion: Ensure the design is consistent with your brand guidelines and user expectations.";
        }
    }

    // UI Integration for AI suggestions
    const suggestionBtn = document.getElementById('ai-suggestion-btn');
    const aiSuggestionText = document.getElementById('ai-suggestion');

    if (suggestionBtn && aiSuggestionText) {
        suggestionBtn.addEventListener('click', async () => {
            if (!selectedElement) {
                alert('Select an element to get suggestions.');
                return;
            }

            const type = selectedElement.dataset.type;
            const props = JSON.parse(selectedElement.dataset.properties || '{}');
            const prompt = `Give me UI/UX design suggestions for a ${type} component with these properties: ${JSON.stringify(props)}`;

            suggestionBtn.textContent = 'Fetching...';
            const suggestion = await getDesignSuggestions(prompt);
            suggestionBtn.textContent = 'Get AI Suggestions';

            aiSuggestionText.textContent = suggestion;
        });
    } else {
        console.error("AI suggestion button or text element not found in the DOM.");
    }



=======
let selectedElement = null;
function setupAISuggestions() {
    // Create the suggestion button if it doesn't exist
    if (!document.getElementById('aiSuggestionBtn')) {
        const suggestionBtn = document.createElement('button');
        suggestionBtn.id = 'aiSuggestionBtn';
        suggestionBtn.className = 'btn btn-primary';
        suggestionBtn.textContent = 'Get AI Suggestions';
        suggestionBtn.style.position = 'absolute';
        suggestionBtn.style.top = '70px';
        suggestionBtn.style.right = '10px';
        document.body.appendChild(suggestionBtn);
        
        suggestionBtn.addEventListener('click', requestAISuggestions);
    }
}
// // Add this function to handle the suggestion request
// async function requestAISuggestions() {
//     if (!selectedElement) {
//         alert('Please select an element to get suggestions for.');
//         return;
//     }
    
//     const btn = document.getElementById('aiSuggestionBtn');
//     btn.textContent = 'Fetching...';
//     btn.disabled = true;
    
//     try {
//         const type = selectedElement.dataset.type;
//         const props = JSON.parse(selectedElement.dataset.properties || '{}');
//         const prompt = `Give me UI/UX design suggestions for improving a ${type} component with these properties: ${JSON.stringify(props)}. Suggest specific color combinations, spacing, typography, and layout improvements.`;
        
//         const suggestion = await getDesignSuggestions(prompt);
        
//         // Create a modal to display suggestions
//         const modal = document.createElement('div');
//         modal.style.position = 'fixed';
//         modal.style.top = '50%';
//         modal.style.left = '50%';
//         modal.style.transform = 'translate(-50%, -50%)';
//         modal.style.background = '#fff';
//         modal.style.padding = '20px';
//         modal.style.borderRadius = '8px';
//         modal.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
//         modal.style.zIndex = '1000';
//         modal.style.maxWidth = '500px';
//         modal.style.maxHeight = '80vh';
//         modal.style.overflow = 'auto';
        
//         modal.innerHTML = `
//             <h3>AI Design Suggestions</h3>
//             <div style="margin: 15px 0; white-space: pre-line;">${suggestion}</div>
//             <button id="closeModalBtn" style="background: #7c5dfa; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Close</button>
//         `;
        
//         document.body.appendChild(modal);
        
//         document.getElementById('closeModalBtn').addEventListener('click', () => {
//             document.body.removeChild(modal);
//         });
//     } catch (error) {
//         console.error('Error getting AI suggestions:', error);
//         alert('Failed to get AI suggestions. See console for details.');
//     } finally {
//         btn.textContent = 'Get AI Suggestions';
//         btn.disabled = false;
//     }
// }

async function requestAISuggestions() {
    if (!selectedElement) {
        alert('Please select an element to get suggestions for.');
        return;
    }
    
    const btn = document.getElementById('aiSuggestionBtn');
    btn.textContent = 'Fetching...';
    btn.disabled = true;
    
    try {
        const type = selectedElement.dataset.type;
        const props = JSON.parse(selectedElement.dataset.properties || '{}');
        
        let suggestion = "";
        
        // If it's a text component, provide immediate text styling suggestions
        if (type === 'text') {
            // Generate random color
            const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            
            suggestion = `I recommend making the following changes to your text component:
            
1. Make the text bold to increase readability and emphasis
2. Change the text color to ${randomColor} to make it stand out
3. Consider increasing the font size slightly for better visibility

Would you like me to apply these changes for you?`;

            // Create apply button for immediate action
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.background = '#fff';
            modal.style.padding = '20px';
            modal.style.borderRadius = '8px';
            modal.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            modal.style.zIndex = '1000';
            modal.style.maxWidth = '500px';
            modal.style.maxHeight = '80vh';
            modal.style.overflow = 'auto';
            
            modal.innerHTML = `
                <h3>AI Design Suggestions</h3>
                <div style="margin: 15px 0; white-space: pre-line;">${suggestion}</div>
                <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 15px;">
                    <button id="applyChangesBtn" style="background: #7c5dfa; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Apply Changes</button>
                    <button id="closeModalBtn" style="background: #f0f0f0; color: #333; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Close</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            document.getElementById('applyChangesBtn').addEventListener('click', () => {
                // Apply the suggested changes
                const props = JSON.parse(selectedElement.dataset.properties || '{}');
                props.fontWeight = 'bold';
                props.color = randomColor;
                
                // Get current font size and increase it
                let currentSize = props.fontSize || '16px';
                currentSize = parseInt(currentSize);
                if (isNaN(currentSize)) currentSize = 16; // fallback if parsing fails
                props.fontSize = `${currentSize + 2}px`;
                
                selectedElement.dataset.properties = JSON.stringify(props);
                
                // Directly apply changes to the text element
                const textElement = selectedElement.querySelector('.text-component');
                if (textElement) {
                    textElement.style.fontWeight = 'bold';
                    textElement.style.color = randomColor;
                    textElement.style.fontSize = props.fontSize;
                }
                
                // Update the component - call this function to ensure changes are applied
                updateComponentFromProps();
                
                // Generate preview to see updates in preview pane
                generatePreview();
                
                // Close the modal
                document.body.removeChild(modal);
            });
            
            document.getElementById('closeModalBtn').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        } else {
            // For other elements, fetch suggestions from API
            const prompt = `Give me UI/UX design suggestions for improving a ${type} component with these properties: ${JSON.stringify(props)}. Suggest specific color combinations, spacing, typography, and layout improvements.`;
            
            suggestion = await getDesignSuggestions(prompt);
            
            // Create a modal to display suggestions
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.background = '#fff';
            modal.style.padding = '20px';
            modal.style.borderRadius = '8px';
            modal.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            modal.style.zIndex = '1000';
            modal.style.maxWidth = '500px';
            modal.style.maxHeight = '80vh';
            modal.style.overflow = 'auto';
            
            modal.innerHTML = `
                <h3>AI Design Suggestions</h3>
                <div style="margin: 15px 0; white-space: pre-line;">${suggestion}</div>
                <button id="closeModalBtn" style="background: #7c5dfa; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Close</button>
            `;
            
            document.body.appendChild(modal);
            
            document.getElementById('closeModalBtn').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        }
    } catch (error) {
        console.error('Error getting AI suggestions:', error);
        alert('Failed to get AI suggestions. See console for details.');
    } finally {
        btn.textContent = 'Get AI Suggestions';
        btn.disabled = false;
    }
}

// Fix the getDesignSuggestions function
async function getDesignSuggestions(prompt) {
    try {
        const GEMINI_API_KEY = 'AIzaSyDPsUJuM6YAzETmrM-YeOnGMkqEe3sIw3U';
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
>>>>>>> b3881dd9ce07e43e1030294767bf0d732952c1d8:UI Components/script.js
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract response correctly
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestion available.";
    } catch (error) {
        console.error("Error fetching AI suggestions:", error);
        return "Failed to fetch suggestions. Check console for details.";
    }
}


document.addEventListener('DOMContentLoaded', function() {
//     // DOM Elements
//    // document.addEventListener('DOMContentLoaded', function() {
//         // OpenAI API Integration
//        // document.addEventListener('DOMContentLoaded', function () {
//             // Gemini API Key (Replace with your own key)
//             const GEMINI_API_KEY = 'AIzaSyAtV-57N7QWcTaKYbFdxACeTnHtnmbcaTo';
        
//             async function getDesignSuggestions(prompt) {
//                 try {
//                     const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({
//                             contents: [{ parts: [{ text: prompt }] }]
//                         })
//                     });
            
//                     if (!response.ok) {
//                         throw new Error(`HTTP error! Status: ${response.status}`);
//                     }
            
//                     const data = await response.json();
                    
//                     // Extract response correctly
//                     return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestion available.";
//                 } catch (error) {
//                     console.error("Error fetching AI suggestions:", error);
//                     return "Failed to fetch suggestions. Check console for details.";
//                 }
//             }
            
//             // UI Integration for AI suggestions
//             const suggestionBtn = document.createElement('button');
//             suggestionBtn.textContent = 'Get AI Suggestions';
//             suggestionBtn.style.position = 'absolute';
//             suggestionBtn.style.top = '10px';
//             suggestionBtn.style.right = '10px';
//             document.body.appendChild(suggestionBtn);
        
//             suggestionBtn.addEventListener('click', async () => {
//                 if (!selectedElement) {
//                     alert('Select an element to get suggestions.');
//                     return;
//                 }
        
//                 const type = selectedElement.dataset.type;
//                 const props = JSON.parse(selectedElement.dataset.properties || '{}');
//                 const prompt = `Give me UI/UX design suggestions for a ${type} component with these properties: ${JSON.stringify(props)}`;
        
//                 suggestionBtn.textContent = 'Fetching...';
//                 const suggestion = await getDesignSuggestions(prompt);
//                 suggestionBtn.textContent = 'Get AI Suggestions';
        
//                 alert(`AI Suggestion: ${suggestion}`);
//             });
        
setupAISuggestions();
        // ORIGINAL SCRIPT (Your full 700+ lines remain intact below this)
    
      
    const canvas = document.getElementById('canvas');
    const contextMenu = document.getElementById('contextMenu');
    const previewBtn = document.getElementById('previewBtn');
    const saveBtn = document.getElementById('saveBtn');
    const previewFrame = document.getElementById('preview-content');
    const propertiesPanel = document.getElementById('properties-content');
    
    // Variables
    let draggedElement = null;
    let elementCounter = 0;
    let isDragging = false;
    let isResizing = false;
    let currentResizeHandle = null;
    let resizeStartX, resizeStartY, resizeStartWidth, resizeStartHeight;
    let dragOffsetX, dragOffsetY;
    let clipboardElement = null;
    
    // Component templates
    const componentTemplates = {
        text: {
            html: '<div class="text-component">Text content</div>',
            properties: {
                content: 'Text content',
                color: '#333333',
                fontSize: '16px',
                fontWeight: 'normal'
            }
        },
        heading: {
            html: '<h2>Heading</h2>',
            properties: {
                content: 'Heading',
                level: 'h2',
                color: '#333333',
                fontSize: '24px',
                fontWeight: 'bold'
            }
        },
        button: {
            html: '<div class="btn-component">Button</div>',
            properties: {
                text: 'Button',
                bgColor: '#7c5dfa',
                textColor: '#ffffff',
                borderRadius: '4px'
            }
        },
        input: {
            html: '<input type="text" class="input-component" placeholder="Enter text...">',
            properties: {
                placeholder: 'Enter text...',
                width: '200px',
                borderColor: '#cccccc',
                borderRadius: '4px'
            }
        },
        container: {
            html: '<div class="container-component"></div>',
            properties: {
                bgColor: 'transparent',
                borderStyle: 'dashed',
                borderColor: '#cccccc',
                padding: '10px'
            }
        },
        image: {
            html: '<div class="image-component">Image Placeholder</div>',
            properties: {
                alt: 'Image description',
                width: '200px',
                height: '150px'
            }
        },
        card: {
            html: '<div style="background: white; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><h3>Card Title</h3><p>Card content goes here.</p></div>',
            properties: {
                title: 'Card Title',
                content: 'Card content goes here.',
                bgColor: '#ffffff',
                shadowColor: 'rgba(0,0,0,0.1)'
            }
        },
        navbar: {
            html: '<div style="background: #333; color: white; padding: 12px; display: flex; justify-content: space-between;"><div>Logo</div><div style="display: flex; gap: 16px;"><span>Home</span><span>About</span><span>Contact</span></div></div>',
            properties: {
                bgColor: '#333333',
                textColor: '#ffffff',
                logo: 'Logo',
                items: 'Home,About,Contact'
            }
        },
        row: {
            html: '<div style="display: flex; width: 100%; min-height: 50px; border: 1px dashed #ccc;"></div>',
            properties: {
                gap: '10px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                bgColor: 'transparent'
            }
        },
        column: {
            html: '<div style="display: flex; flex-direction: column; min-height: 100px; min-width: 50px; border: 1px dashed #ccc;"></div>',
            properties: {
                gap: '10px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                bgColor: 'transparent'
            }
        },
        form: {
            html: '<form style="padding: 16px; border: 1px solid #eee; border-radius: 8px;"><div style="margin-bottom: 16px;"><label style="display: block; margin-bottom: 8px;">Name</label><input type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"></div><div style="margin-bottom: 16px;"><label style="display: block; margin-bottom: 8px;">Email</label><input type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"></div><button style="background: #7c5dfa; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Submit</button></form>',
            properties: {
                fields: 'Name,Email',
                buttonText: 'Submit',
                bgColor: '#ffffff',
                buttonColor: '#7c5dfa'
            }
        }
    };
    
    // Setup drag and drop events
    setupDragAndDropEvents();
    setupCanvasEvents();
    setupContextMenu();
    setupButtons();
    
    // Function to setup drag and drop events
    function setupDragAndDropEvents() {
        // Add drag event listeners to component items
        const componentItems = document.querySelectorAll('.component-item');
        
        componentItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
        });
        
        // Add drop event listeners to canvas
        canvas.addEventListener('dragover', handleDragOver);
        canvas.addEventListener('drop', handleDrop);
    }
    
    // Function to setup canvas interaction events
    function setupCanvasEvents() {
        canvas.addEventListener('mousedown', handleCanvasMouseDown);
        document.addEventListener('mousemove', handleDocumentMouseMove);
        document.addEventListener('mouseup', handleDocumentMouseUp);
        document.addEventListener('click', hideContextMenu);
    }
    
    // Function to setup context menu
    function setupContextMenu() {
        const menuItems = contextMenu.querySelectorAll('.context-menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', handleContextMenuAction);
        });
    }
    
    // Function to setup buttons
    function setupButtons() {
        previewBtn.addEventListener('click', generatePreview);
        saveBtn.addEventListener('click', saveDesign);
    }

    // In your setupButtons function or right after it, add this code
function fixLayoutOverlap() {
    const canvas = document.getElementById('canvas');
    const previewFrame = document.getElementById('preview-content');
    
    // Make sure both have proper positioning
    canvas.style.position = 'relative';
    previewFrame.style.position = 'relative';
    
    // Make sure they have proper container layout
    const canvasContainer = canvas.parentElement;
    const previewContainer = previewFrame.parentElement;
    
    if (canvasContainer && previewContainer) {
        // Ensure containers have proper display and spacing
        canvasContainer.style.display = 'block';
        previewContainer.style.display = 'block';
        canvasContainer.style.marginBottom = '20px';
    }
}

// Add this to your code to inject necessary CSS
function addSeparationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        #canvas, #preview-content {
            overflow: hidden;
            border: 1px solid #ccc;
            background-color: #f9f9f9;
            margin-bottom: 15px;
            min-height: 300px;
        }
        
        #preview-content {
            background-color: #fff;
            border: 1px solid #ddd;
        }
        
        .editor-section {
            margin-bottom: 20px;
            padding: 10px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
}

// Call this function after your document is loaded
addSeparationCSS();

// Call this after your other setup functions
fixLayoutOverlap();
    
    // Drag start handler
    function handleDragStart(e) {
        draggedElement = this;
        e.dataTransfer.setData('text/plain', draggedElement.dataset.type);
        e.dataTransfer.effectAllowed = 'copy';
    }
    
    // Drag over handler
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }
    
    // Drop handler
    function handleDrop(e) {
        e.preventDefault();
        
        if (draggedElement) {
            const componentType = e.dataTransfer.getData('text/plain');
            createComponent(componentType, e.clientX, e.clientY);
        }
    }
    
    // Function to create new component
    function createComponent(type, clientX, clientY) {
        if (!componentTemplates[type]) return;
        
        // Create container for the component
        const component = document.createElement('div');
        component.className = 'component-on-canvas';
        component.dataset.type = type;
        component.dataset.id = `component-${++elementCounter}`;
        component.innerHTML = componentTemplates[type].html;
        
        // Store component properties
        component.dataset.properties = JSON.stringify({
            ...componentTemplates[type].properties,
            width: '200px',
            height: 'auto'
        });
        
        // Calculate position
        const canvasRect = canvas.getBoundingClientRect();
        const left = clientX - canvasRect.left;
        const top = clientY - canvasRect.top;
        
        component.style.left = `${left}px`;
        component.style.top = `${top}px`;
        component.style.width = '200px';
        
        // Add resize handles
        addResizeHandles(component);
        
        // Add to canvas
        canvas.appendChild(component);
        
        // Select the new component
        selectElement(component);
        
        return component;
    }
    
    // Function to add resize handles to component
    function addResizeHandles(component) {
        const positions = ['nw', 'ne', 'sw', 'se'];
        
        positions.forEach(pos => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${pos}`;
            handle.dataset.handle = pos;
            component.appendChild(handle);
        });
    }
    
    // Canvas mouse down handler
    function handleCanvasMouseDown(e) {
        // Check if clicking on a component
        let targetComponent = e.target.closest('.component-on-canvas');
        
        // Check if clicking on a resize handle
        if (e.target.classList.contains('resize-handle')) {
            isResizing = true;
            currentResizeHandle = e.target;
            
            // Get the component to resize
            targetComponent = e.target.closest('.component-on-canvas');
            
            // Starting dimensions
            const rect = targetComponent.getBoundingClientRect();
            resizeStartX = e.clientX;
            resizeStartY = e.clientY;
            resizeStartWidth = rect.width;
            resizeStartHeight = rect.height;
            
            selectElement(targetComponent);
            e.stopPropagation();
            return;
        }
        
        if (targetComponent) {
            // Select and prepare for dragging
            selectElement(targetComponent);
            
            isDragging = true;
            const rect = targetComponent.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            
            // Right click to show context menu
            if (e.button === 2) {
                showContextMenu(e, targetComponent);
            }
            
            e.stopPropagation();
        } else {
            // Clicked on the canvas, deselect any selected element
            if (selectedElement) {
                deselectElement();
            }
            
            hideContextMenu();
        }
    }
    
    // Document mouse move handler
    function handleDocumentMouseMove(e) {
        if (isDragging && selectedElement) {
            // Calculate new position
            const canvasRect = canvas.getBoundingClientRect();
            let left = e.clientX - canvasRect.left - dragOffsetX;
            let top = e.clientY - canvasRect.top - dragOffsetY;
            
            // Keep element within canvas
            left = Math.max(0, Math.min(canvasRect.width - selectedElement.offsetWidth, left));
            top = Math.max(0, Math.min(canvasRect.height - selectedElement.offsetHeight, top));
            
            // Update position
            selectedElement.style.left = `${left}px`;
            selectedElement.style.top = `${top}px`;
        } else if (isResizing && selectedElement) {
            const canvasRect = canvas.getBoundingClientRect();
            const handle = currentResizeHandle.dataset.handle;
            
            // Calculate width and height changes
            const deltaX = e.clientX - resizeStartX;
            const deltaY = e.clientY - resizeStartY;
            
            let newWidth = resizeStartWidth;
            let newHeight = resizeStartHeight;
            let newLeft = parseInt(selectedElement.style.left);
            let newTop = parseInt(selectedElement.style.top);
            
            // Update dimensions based on the handle being dragged
            if (handle === 'se') {
                newWidth = resizeStartWidth + deltaX;
                newHeight = resizeStartHeight + deltaY;
            } else if (handle === 'sw') {
                newWidth = resizeStartWidth - deltaX;
                newHeight = resizeStartHeight + deltaY;
                newLeft = parseInt(selectedElement.style.left) + deltaX;
            } else if (handle === 'ne') {
                newWidth = resizeStartWidth + deltaX;
                newHeight = resizeStartHeight - deltaY;
                newTop = parseInt(selectedElement.style.top) + deltaY;
            } else if (handle === 'nw') {
                newWidth = resizeStartWidth - deltaX;
                newHeight = resizeStartHeight - deltaY;
                newLeft = parseInt(selectedElement.style.left) + deltaX;
                newTop = parseInt(selectedElement.style.top) + deltaY;
            }
            
            // Enforce minimum size
            newWidth = Math.max(50, newWidth);
            newHeight = Math.max(20, newHeight);
            
            // Update the element's style
            selectedElement.style.width = `${newWidth}px`;
            selectedElement.style.height = `${newHeight}px`;
            selectedElement.style.left = `${newLeft}px`;
            selectedElement.style.top = `${newTop}px`;
            
            // Update properties
            let props = JSON.parse(selectedElement.dataset.properties || '{}');
            props.width = `${newWidth}px`;
            props.height = `${newHeight}px`;
            selectedElement.dataset.properties = JSON.stringify(props);
            
            // Update properties panel
            updatePropertiesPanel();
        }
    }
    
    // Document mouse up handler
    function handleDocumentMouseUp() {
        isDragging = false;
        isResizing = false;
        
        if (selectedElement) {
            generatePreview();
        }
    }
    
    // Function to select an element
    function selectElement(element) {
        // Deselect previously selected element
        if (selectedElement) {
            selectedElement.classList.remove('selected');
        }
        
        // Select new element
        selectedElement = element;
        selectedElement.classList.add('selected');
        
        // Update properties panel
        updatePropertiesPanel();
    }
    
    // Function to deselect element
    function deselectElement() {
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            selectedElement = null;
            
            // Clear properties panel
            propertiesPanel.innerHTML = '<p>No element selected</p>';
        }
    }
    
    // Function to update properties panel based on selected element
    function updatePropertiesPanel() {
        if (!selectedElement) {
            propertiesPanel.innerHTML = '<p>No element selected</p>';
            return;
        }
        
        const type = selectedElement.dataset.type;
        const props = JSON.parse(selectedElement.dataset.properties || '{}');
        
        let html = `<h3>${type.charAt(0).toUpperCase() + type.slice(1)} Properties</h3>`;
        
        // Position and size properties
        html += `
        <div class="property-group">
            <h4>Position & Size</h4>
            <div class="property-row">
                <div>
                    <label class="property-label">X</label>
                    <input type="number" class="property-input" data-prop="left" value="${parseInt(selectedElement.style.left || 0)}">
                </div>
                <div>
                    <label class="property-label">Y</label>
                    <input type="number" class="property-input" data-prop="top" value="${parseInt(selectedElement.style.top || 0)}">
                </div>
            </div>
            <div class="property-row">
                <div>
                    <label class="property-label">Width</label>
                    <input type="text" class="property-input" data-prop="width" value="${props.width || selectedElement.style.width}">
                </div>
                <div>
                    <label class="property-label">Height</label>
                    <input type="text" class="property-input" data-prop="height" value="${props.height || selectedElement.style.height}">
                </div>
            </div>
        </div>`;
        
        // Component-specific properties
        html += '<div class="property-group"><h4>Properties</h4>';
        
        for (const [key, value] of Object.entries(props)) {
            if (key !== 'width' && key !== 'height') {
                html += `
                <label class="property-label">${key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input type="text" class="property-input" data-prop="${key}" value="${value}">
                `;
            }
        }
        
        html += '</div>';
        
        propertiesPanel.innerHTML = html;
        
        // Add event listeners to property inputs
        const inputs = propertiesPanel.querySelectorAll('.property-input');
        inputs.forEach(input => {
            input.addEventListener('change', updateComponentProperty);
        });
    }
    
    // Function to update component property
    function updateComponentProperty() {
        if (!selectedElement) return;
        
        const prop = this.dataset.prop;
        const value = this.value;
        
        // Update position or dimension
        if (prop === 'left' || prop === 'top' || prop === 'width' || prop === 'height') {
            selectedElement.style[prop] = prop === 'left' || prop === 'top' ? `${value}px` : value;
        }
        
        // Update other properties
const props = JSON.parse(selectedElement.dataset.properties || '{}');
props[prop] = value;
selectedElement.dataset.properties = JSON.stringify(props);

// Update component based on properties
updateComponentFromProps();

// Update preview
generatePreview();
}

// Function to update component based on properties
function updateComponentFromProps() {
    if (!selectedElement) return;
    
    const type = selectedElement.dataset.type;
    const props = JSON.parse(selectedElement.dataset.properties || '{}');
    
    // Update component based on type
    switch (type) {
        case 'text':
            const textElement = selectedElement.querySelector('.text-component');
            if (textElement) {
                textElement.textContent = props.content || 'Text content';
                textElement.style.color = props.color || '#333333';
                textElement.style.fontSize = props.fontSize || '16px';
                textElement.style.fontWeight = props.fontWeight || 'normal';
            }
            break;
            
        case 'heading':
            const headingElement = selectedElement.querySelector('h1, h2, h3, h4, h5, h6');
            if (headingElement) {
                // Create new heading with proper level
                const newHeading = document.createElement(props.level || 'h2');
                newHeading.textContent = props.content || 'Heading';
                newHeading.style.color = props.color || '#333333';
                newHeading.style.fontSize = props.fontSize || '24px';
                newHeading.style.fontWeight = props.fontWeight || 'bold';
                
                // Replace old heading
                headingElement.parentNode.replaceChild(newHeading, headingElement);
            }
            break;
            
        case 'button':
            const buttonElement = selectedElement.querySelector('.btn-component');
            if (buttonElement) {
                buttonElement.textContent = props.text || 'Button';
                buttonElement.style.backgroundColor = props.bgColor || '#7c5dfa';
                buttonElement.style.color = props.textColor || '#ffffff';
                buttonElement.style.borderRadius = props.borderRadius || '4px';
            }
            break;
            
        case 'input':
            const inputElement = selectedElement.querySelector('.input-component');
            if (inputElement) {
                inputElement.placeholder = props.placeholder || 'Enter text...';
                inputElement.style.width = props.width || '200px';
                inputElement.style.borderColor = props.borderColor || '#cccccc';
                inputElement.style.borderRadius = props.borderRadius || '4px';
            }
            break;
            
        case 'container':
            const containerElement = selectedElement.querySelector('.container-component');
            if (containerElement) {
                containerElement.style.backgroundColor = props.bgColor || 'transparent';
                containerElement.style.borderStyle = props.borderStyle || 'dashed';
                containerElement.style.borderColor = props.borderColor || '#cccccc';
                containerElement.style.padding = props.padding || '10px';
            }
            break;
            
        case 'image':
            const imageElement = selectedElement.querySelector('.image-component');
            if (imageElement) {
                imageElement.alt = props.alt || 'Image description';
                imageElement.style.width = props.width || '200px';
                imageElement.style.height = props.height || '150px';
            }
            break;
            
        case 'card':
            const cardElement = selectedElement.firstElementChild;
            if (cardElement) {
                const cardTitle = cardElement.querySelector('h3');
                const cardContent = cardElement.querySelector('p');
                
                if (cardTitle) cardTitle.textContent = props.title || 'Card Title';
                if (cardContent) cardContent.textContent = props.content || 'Card content goes here.';
                
                cardElement.style.backgroundColor = props.bgColor || '#ffffff';
                cardElement.style.boxShadow = `0 2px 8px ${props.shadowColor || 'rgba(0,0,0,0.1)'}`;
            }
            break;
            
        case 'navbar':
            const navbarElement = selectedElement.firstElementChild;
            if (navbarElement) {
                const logo = navbarElement.querySelector('div:first-child');
                const menuItems = navbarElement.querySelector('div:last-child');
                
                if (logo) logo.textContent = props.logo || 'Logo';
                
                if (menuItems && props.items) {
                    const items = props.items.split(',');
                    menuItems.innerHTML = '';
                    
                    items.forEach(item => {
                        const span = document.createElement('span');
                        span.textContent = item.trim();
                        menuItems.appendChild(span);
                    });
                }
                
                navbarElement.style.backgroundColor = props.bgColor || '#333333';
                navbarElement.style.color = props.textColor || '#ffffff';
            }
            break;
            
        case 'row':
        case 'column':
            selectedElement.firstElementChild.style.gap = props.gap || '10px';
            selectedElement.firstElementChild.style.justifyContent = props.justifyContent || 'flex-start';
            selectedElement.firstElementChild.style.alignItems = props.alignItems || 'center';
            selectedElement.firstElementChild.style.backgroundColor = props.bgColor || 'transparent';
            break;
            
        case 'form':
            const formElement = selectedElement.querySelector('form');
            if (formElement) {
                const submitButton = formElement.querySelector('button');
                if (submitButton) {
                    submitButton.textContent = props.buttonText || 'Submit';
                    submitButton.style.backgroundColor = props.buttonColor || '#7c5dfa';
                }
                
                formElement.style.backgroundColor = props.bgColor || '#ffffff';
                
                // Update form fields if needed
                if (props.fields) {
                    // Advanced form field update logic would go here
                }
            }
            break;
    }
}

// Function to show context menu
function showContextMenu(e, element) {
    e.preventDefault();
    
    // Position context menu
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.top = `${e.clientY}px`;
}

// Function to hide context menu
function hideContextMenu() {
    contextMenu.style.display = 'none';
}

// Context menu action handler
function handleContextMenuAction(e) {
    const action = this.dataset.action;
    
    if (selectedElement) {
        switch (action) {
            case 'delete':
                selectedElement.remove();
                selectedElement = null;
                updatePropertiesPanel();
                break;
                
            case 'duplicate':
                duplicateElement();
                break;
                
            case 'bringForward':
                bringElementForward();
                break;
                
            case 'sendBackward':
                sendElementBackward();
                break;
                
            case 'copy':
                copyElement();
                break;
                
            case 'paste':
                pasteElement();
                break;
        }
    }
    
    hideContextMenu();
    generatePreview();
}

// Function to duplicate element
function duplicateElement() {
    if (!selectedElement) return;
    
    // Clone the element
    const clone = selectedElement.cloneNode(true);
    
    // Update ID
    clone.dataset.id = `component-${++elementCounter}`;
    
    // Offset position
    const left = parseInt(selectedElement.style.left) + 20;
    const top = parseInt(selectedElement.style.top) + 20;
    clone.style.left = `${left}px`;
    clone.style.top = `${top}px`;
    
    // Add to canvas
    canvas.appendChild(clone);
    
    // Select the new element
    selectElement(clone);
}

// Function to bring element forward
function bringElementForward() {
    if (!selectedElement || !selectedElement.nextElementSibling) return;
    
    canvas.insertBefore(selectedElement.nextElementSibling, selectedElement);
}

// Function to send element backward
function sendElementBackward() {
    if (!selectedElement || !selectedElement.previousElementSibling) return;
    
    canvas.insertBefore(selectedElement, selectedElement.previousElementSibling);
}

// Function to copy element
function copyElement() {
    if (!selectedElement) return;
    
    clipboardElement = {
        type: selectedElement.dataset.type,
        properties: JSON.parse(selectedElement.dataset.properties || '{}')
    };
}

// Function to paste element
function pasteElement() {
    if (!clipboardElement) return;
    
    const component = createComponent(
        clipboardElement.type, 
        canvas.getBoundingClientRect().left + 100, 
        canvas.getBoundingClientRect().top + 100
    );
    
    if (component) {
        // Apply copied properties
        component.dataset.properties = JSON.stringify(clipboardElement.properties);
        updateComponentFromProps();
    }
}

// Function to generate preview
function generatePreview() {
    // Clone canvas content
    const canvasClone = canvas.cloneNode(true);
    
    // Clean up components in clone
    const components = canvasClone.querySelectorAll('.component-on-canvas');
    components.forEach(component => {
        // Remove resize handles and selection styling
        component.querySelectorAll('.resize-handle').forEach(handle => handle.remove());
        component.classList.remove('selected');
        component.style.outline = 'none';
        
        // Apply absolute positioning
        component.style.position = 'absolute';
    });
    
    // Set preview content
    previewFrame.innerHTML = canvasClone.innerHTML;
}

// Function to save design
function saveDesign() {
    // Create a representation of the current design
    const components = Array.from(canvas.querySelectorAll('.component-on-canvas')).map(component => {
        return {
            id: component.dataset.id,
            type: component.dataset.type,
            properties: JSON.parse(component.dataset.properties || '{}'),
            style: {
                left: component.style.left,
                top: component.style.top,
                width: component.style.width,
                height: component.style.height
            }
        };
    });
    
    // Create design object
    const design = {
        name: 'My Design',
        timestamp: new Date().toISOString(),
        components: components
    };
    
    // Convert to JSON and save
    const designJSON = JSON.stringify(design, null, 2);
    
    // Create download link
    const blob = new Blob([designJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'my-design.json';
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up
    URL.revokeObjectURL(url);
}

// Function to load a design
function loadDesign(designJSON) {
    try {
        const design = JSON.parse(designJSON);
        
        // Clear canvas
        canvas.innerHTML = '';
        
        // Recreate components
        design.components.forEach(component => {
            const newComponent = createComponent(component.type, 0, 0);
            
            if (newComponent) {
                // Apply saved properties and styles
                newComponent.dataset.id = component.id;
                newComponent.dataset.properties = JSON.stringify(component.properties);
                
                newComponent.style.left = component.style.left;
                newComponent.style.top = component.style.top;
                newComponent.style.width = component.style.width;
                newComponent.style.height = component.style.height;
                
                // Update component
                selectedElement = newComponent;
                updateComponentFromProps();
            }
        });
        
        // Deselect
        deselectElement();
        
        // Update preview
        generatePreview();
        
    } catch (error) {
        console.error('Error loading design:', error);
    }
}

// Export functionality if needed
window.designerAPI = {
    loadDesign,
    saveDesign
};
});