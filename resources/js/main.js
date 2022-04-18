// This variable stores the "Pick a Color" button
let button = document.getElementById('color-button');

// This variable stores the "Mystery Color" button
let mysteryButton = document.getElementById('next-button');

// This random number function will create color codes for the randomColor variable
function colorValue() {
  return Math.floor(Math.random() * 256);
}

// Event handler function, to randomly change the colors of the buttons when specific events are fired on them.
function colorChange(event){
  let colorValue1 = colorValue();
  let colorValue2 = colorValue();
  let colorValue3 = colorValue();
  let randomColor = 'rgb(' + colorValue1 + ', ' + colorValue2 + ', ' + colorValue3 + ')';
  event.target.style.backgroundColor = randomColor;
  event.target.innerHTML = `Your color is ${randomColor}`;
  const lightColor = colorValue1 + colorValue2 + colorValue3;
  lightColor < 381 ? event.target.style.color = '#fff': event.target.style.color = '#000';
}

// An event handler property on the button element that fires when it’s clicked. colorChange() is the event handler function.
button.addEventListener('click', colorChange);
// An event handler property on the mysteryButton element, that fires when you rotate the mouse wheel or slide down on the mousepad
mysteryButton.addEventListener('wheel', colorChange);