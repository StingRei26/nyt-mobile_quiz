
'use strict';

console.group("mobileFXL-logs");

var correctAnswerQueue = [];
//var slideCounter = $(".slider").slick("getSlick").slideCount;


// function to start slick gallery ---------------
var initSlideshow = function(id) {
  console.log("init slideshow");

  $('#' + id).slick({dots: true,infinite: false,focusOnSelect: false,speed: 50,fade: true});  // initiating slick gallery

  var currentSlide = $('#slider').slick('slickCurrentSlide');
  $('.slick-prev').toggle(currentSlide != 0);
  $('.slick-next').toggle(currentSlide != 2);
  $('#slider').one('afterChange', function(){$('.slick-prev,.slick-next').show();});
};


var createLogo = function (logoSrc) { $("#logo").css("background-image", "url('"+ logoSrc + "')");}  // dynamically setting the logo as background image

var createQuiz = function createQuiz(props) {
  var self = {};

  self.props = props;
  self.state = {selectedAnswerIndex: undefined};
  
  correctAnswerQueue.push(props.correctAnswerIndex);

  self.handleChange = function (event) {
    event.preventDefault();
    if (!self.state.selectedAnswerIndex) {
      console.log("selected index number: ",event.currentTarget.value);
      self.state.selectedAnswerIndex = event.currentTarget.value;
      self.render();
    }
  };

  // self.renderLogo = function () {
  //   var imglogo = document.createElement('img');
  //   imglogo.className = 'Logoimage';
  //   imglogo.src = self.props.src2;
  //   imglogo.alt = self.props.alt;
  //   return imglogo;
  // };


  self.renderImage = function () {
    var img = document.createElement('img');
    img.className = 'image';
    img.src = self.props.src;
    img.alt = self.props.alt;
    return img;
  };

  self.renderHeader = function() {
    var header = document.createElement("h3");
    header.className = "header";
    header.textContent = props.header;
    return header;
  };

  self.renderQuestion = function () {
    var question = document.createElement('h4');
    question.className = 'question';
    question.textContent = self.props.question;
    return question;
  };

  self.renderCTA = function () {
    var cta = document.createElement('button');
    cta.className = 'cta';
    cta.textContent = props.cta;
    return cta;
  };

  self.renderAnswer = function (answer, i) {
   
   // console.log("answer: ", answer);
    var key = [self.props.id, i].join('-');
    var isSelected = typeof self.state.selectedAnswerIndex !== 'undefined';
    var isCorrect = isSelected && i.toString() === self.props.correctAnswerIndex;
    //correctAnswerQueue[i] = self.props.correctAnswerIndex;
    var isWrong = isSelected && i.toString() !== self.props.correctAnswerIndex && i.toString() === self.state.selectedAnswerIndex;

    var liClassNames = ['answer', isCorrect && 'isCorrect', isWrong && 'isWrong', isSelected && 'isNotHoverable'].filter(Boolean);

    var labelClassNames = [isSelected && 'hidePointer'].filter(Boolean);

    var answerEl = document.createElement('li');
    answerEl.className = liClassNames.join(' ');

    var label = document.createElement('label');
    label.htmlFor = key;
    label.className = labelClassNames.join(' ');

    var answerText = document.createTextNode(answer);

    var input = document.createElement('input');
    input.id = key;
    input.className = 'hide';
    input.type = 'radio';
    input.value = i;
    input.addEventListener('change', self.handleChange);

    label.appendChild(input);
    label.appendChild(answerText);
    answerEl.appendChild(label);

    
    return answerEl;
  };

  //console.log("correct asnwer que: ", correctAnswerQueue);


  self.renderAnswers = function () {
    var answers = document.createElement('ul');
    answers.className = 'answers';

    var answerEls = self.props.answers.map(self.renderAnswer);
    answerEls.forEach(function (answerEl) {
      answers.appendChild(answerEl);
    });

    return answers;
  };

  self.renderTrivia = function () {
    var triviaEl = document.createElement('div');
    triviaEl.className = ['trivia', self.state.selectedAnswerIndex && 'hasTransition'].filter(Boolean).join(' ');
    triviaEl.textContent = self.props.trivia;
    return triviaEl;

    console.log("trivia render");
  };

  self.render = function () {
    var root = document.getElementById(self.props.id);

    if (!root) {return;}

    root.className = ['root', self.props.className, self.props.dark && 'dark'].filter(Boolean).join(' ');
    root.innerHTML = '';

    var shouldRenderTrivia = self.props.trivia && typeof self.state.selectedAnswerIndex !== 'undefined';

    // Render each part of the quiz and append the returned elements to `root`
    [
      self.renderImage(), // Render the image first to clear other elements...
     // self.renderLogo(),
      self.renderHeader(), // ...and render the header _after_ the logo
      self.renderCTA(),
      self.renderQuestion(),
      self.renderAnswers(),
     
      shouldRenderTrivia && self.renderTrivia()
    ]
      .filter(Boolean)
      .forEach(function (el) {
        //console.log("interation count");
        root.appendChild(el);
      });
  };

  self.render();
  return self;
};



function init (adData) {
  console.log("ad-Data: ", adData);

  document.getElementById("ad-stage").style.display = "block";

  initSlideshow('slider'); 

  createLogo('images/white@2x.png');

  createQuiz({
    question: 'Who was the first president of the United States? Test your civics knowledge.',
    answers: ['George Washington', 'John Adams', 'Barack Obama'],
    cta:'',
    correctAnswerIndex: '1',
    trivia: 'Washington was widely admired for his strong leadership qualities and was unanimously elected president by the Electoral College in the first two national elections.',
    id: 'quiz1',
    src: 'images/car-small1.png',
    header: 'HOW MUCH DO YOU REALLY KNOW ABOUT THE U.S?',
    alt: 'Image alt text'
  });

  createQuiz({
    question: 'Who was the first president of the United States? Test your civics knowledge.',
    answers: ['George Washington', 'John Adams', 'Barack Obama'],
    cta:'',
    correctAnswerIndex: '0',
    trivia: 'Washington was widely admired for his strong leadership qualities and was unanimously elected president by the Electoral College in the first two national elections.',
    id: 'quiz2',
    src: 'images/car-small2.png',
    alt: 'Image alt text'
  });

  createQuiz({
    question: 'Who was the first president of the United States? Test your civics knowledge.',
    answers: ['George Washington', 'John Adams', 'Barack Obama'],
    cta:'',
    correctAnswerIndex: '0',
    trivia: 'Washington was widely admired for his strong leadership qualities and was unanimously elected president by the Electoral College in the first two national elections.',
    id: 'quiz3',
    src: 'images/car-small3.png',
    alt: 'Image alt text'
  });

  createQuiz({
    question: 'Who was the first president of the United States? Test your civics knowledge.',
    answers: ['George Washington', 'John Adams', 'Barack Obama'],
    cta:'',
    correctAnswerIndex: '0',
    trivia: 'Washington was widely admired for his strong leadership qualities and was unanimously elected president by the Electoral College in the first two national elections.',
    id: 'quiz4',
    src: 'images/car-small4.png',
    alt: 'Image alt text'
  });

  createQuiz({
    question: 'Who was the first president of the United States? Test your civics knowledge.',
    answers: [],
    cta:'Click Here',
    correctAnswerIndex: '0',
    trivia: '',
    id: 'quiz5',
    src: 'images/car-small1.png',
    alt: 'Image alt text'
  });
}  // end of init function








