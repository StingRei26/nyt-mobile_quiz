'use strict';

$(".slider").slick("getSlick").slideCount

var initSlideshow = function(id) {
 $('#' + id).slick({
   dots: true,
    infinite: false,
    focusOnSelect: false,
    speed: 50,
    fade: true
  });


var currentSlide = $('#slider').slick('slickCurrentSlide');
  $('.slick-prev').toggle(currentSlide != 0);
  $('.slick-next').toggle(currentSlide != 2);
  
  $('#slider').one('afterChange', function(){
    $('.slick-prev,.slick-next').show();
  });





};

/*code to change dots to numbers

$(".slider").slick({
autoplay: false,
dots: true,
customPaging : function(slider, i) {
var thumb = $(slider.$slides[i]).data();
return '<a>'+(i+1)+'</a>';;
},
responsive: [{ 
    breakpoint: 500,
    settings: {
        dots: false,
        arrows: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1
    } 
}]
});

//custom function showing current slide
      var $status = $('.pagingInfo');
      var $slickElement = $('#slider');

      $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
          //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
          var i = (currentSlide ? currentSlide : 0) + 1;
          $status.text(i + ' of ' + slick.slideCount);
      });

/* end of dot code */


var createQuiz =function createQuiz(props) {
  var self = {};

  self.props = props;

  self.state = {
    selectedAnswerIndex: undefined
  };

  self.handleChange = function (event) {
    event.preventDefault();

    if (!self.state.selectedAnswerIndex) {
      self.state.selectedAnswerIndex = event.currentTarget.value;
      self.render();
    }
  };

  self.renderLogo = function () {
    var img = document.createElement('img');
    img.className = 'Logoimage';
    img.src = self.props.src2;
    img.alt = self.props.alt;
    return img;
  };


  self.renderImage = function () {
    var img = document.createElement('img');
    img.className = 'image';
    img.src = self.props.src;
    img.alt = self.props.alt;
    return img;
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
    var key = [self.props.id, i].join('-');
    var isSelected = typeof self.state.selectedAnswerIndex !== 'undefined';
    var isCorrect = isSelected && i.toString() === self.props.correctAnswerIndex;
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
  };

  self.render = function () {
    var root = document.getElementById(self.props.id);

    if (!root) {
      return;
    }

    root.className = ['root', self.props.className, self.props.dark && 'dark'].filter(Boolean).join(' ');
    root.innerHTML = '';

    var shouldRenderTrivia = self.props.trivia && typeof self.state.selectedAnswerIndex !== 'undefined';

    // Render each part of the quiz and append the returned elements to `root`
    [
      self.renderCTA(),
      self.renderLogo(),
      self.renderImage(),
      self.renderQuestion(),
      self.renderAnswers(),
      shouldRenderTrivia && self.renderTrivia()
    ]
      .filter(Boolean)
      .forEach(function (el) {
        root.appendChild(el);
      });
  };


  self.render();
  return self;
};

