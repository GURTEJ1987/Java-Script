		const main = document.querySelector('main');
        const  voicesSelect =document.getElementById('voices');
		const textarea = document.getElementById('text');
		const readButton = document.getElementById('read');
		const togglebtn = document.getElementById('toggle');
		const closeBtn = document.getElementById('close');

const data = [
{
     image:'./img/drink.jpg',
     text:"I am'Thursty"},
{
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }];
	    
  // Loop in Java Script in which data array value is passed one by one by calling the function
  data.forEach(createBox);

  

  function createBox(item)
  {
    const box = document.createElement('div');
	/*Pull out value and placed in image and text from item*/
	const {image,text} =item; 
	// Adding "BOX" ccs class to box Div Tag
	box.classList.add('box');
	box.innerHTML=`<img src="${image}" alt="${text}"> <p class="info">${text}</p>`;
	
	//Adding Listener to the Image on Click of Image
	box.addEventListener('click',()=>{
		setTextMessage(text);
	    speakText();		
    //Adding active class of .css Function
	box.classList.add('active');
	//Then we want to quickly remove this above stated effect
	setTimeout(()=>{box.classList.remove('active')},800);
                                     });
	main.appendChild(box);	
  }

//Initialize Speech Senthsis uttereance
const  message = new SpeechSynthesisUtterance();

//Set the Text Function
function setTextMessage(text)
{
message.text = text;
}

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  console.log(voices);
  voices.forEach(voice => {
    const option = document.createElement('option');
	option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}


//Speak the Text
function speakText()
{
speechSynthesis.speak(message);
}


//Voice Changed
//if we comment below stated line then we won't get the list of voices
speechSynthesis.addEventListener('voiceschanged',getVoices);

 function setVoice(e)
 {
	//Find the selected voice out of Voices list and once find then assign it to current voice of message.
     message.voice = voices.find(voice=> voice.name === e.target.value);
 }

  /* Toggle Text Box*/
  togglebtn.addEventListener('click',()=>{
	document.getElementById('text-box').classList.toggle('show');
  })

  /*Close Button*/
  closeBtn.addEventListener('click',()=>{
	document.getElementById('text-box').classList.remove('show');
  }) 

  //Change Voice
  voicesSelect.addEventListener('change',setVoice);
  
 // Read text after button is clicked
 
  readButton.addEventListener('click', ()=>{
	setTextMessage(textarea.value);
	speakText();
  });
getVoices();