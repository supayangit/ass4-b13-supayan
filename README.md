

## Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### 2. How do you create and insert a new element into the DOM?

### 3. What is Event Bubbling? And how does it work?

### 4. What is Event Delegation in JavaScript? Why is it useful?

### 5. What is the difference between preventDefault() and stopPropagation() methods?


## Answers

1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll:

getElementById → one element by ID

getElementsByClassName → all elements by class (live/dynamic)

querySelector → first element by CSS selector

querySelectorAll → get all elements by CSS selector (static)


2. How to create and insert a new element
<--- Get the parent, create the element and append to the parent --->
Example:
const parent = document.getElementbyId("parent")
const div = document.createElement("div");
div.textContent = "Hello";
document.parent.appendChild(div);


3. What is Event Bubbling?

Event on an element that moves up through parent elements.

Example: clicking a button also triggers click on its parent div.


4. What is Event Delegation and why useful?

Add event listener on parent to handle children clicks.

Useful for dynamic content and better performance.


5. Difference between preventDefault() and stopPropagation()

preventDefault() → stops default browser action

stopPropagation() → stops event from bubbling