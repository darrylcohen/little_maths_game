

const EASY = 10;
const MEDIUM = 20;
const HARD = 30;
const CRAZY = 100;
const NUM1 = $("#num1");
const NUM2 = $("#num2");
const CORRECT = $("#correct");
const WRONG = $("#incorrect");
const TIME = 60;
var answer;
var level;

$(document).ready(function() {

    $(".option").click(function() {
        this.innerText == answer ? CORRECT.text(parseFloat(CORRECT.text())+1) : WRONG.text(parseFloat(WRONG.text())+1);
        setTimeout("setQuestion()", 200);
    });

    var clock;
    $(".level").click(function() {
        $(".midContainer").removeClass("disableOptions");
        $(".instructions").slideUp(1000);
        $(".midContainer").slideDown(1000);
        setLevel($(this).text());
        CORRECT.text(0);
        WRONG.text(0);

        $("#curLevel").text($(this).text());

        var distance = TIME;
        clearInterval(clock);
        clock = setInterval(function() {
            $("#timer").text( distance + "s");
            distance = distance - 1;

            if (distance < 0) {
                clearInterval(clock);
                $("#timer").text( "GAME OVER");
                $(".midContainer").addClass("disableOptions");
            }
        }, 1000);

    });
})

function setLevel(levelIndicator) {

    if (levelIndicator == "Easy") {
        level = EASY;
    } else if (levelIndicator == "Medium") {
        level = MEDIUM;
    } else if (levelIndicator == "Hard") {
        level = HARD;
    } else {
        level = CRAZY;
    }
    setQuestion();
}

function buildOptions(answer) {
    var options = $(".option");
    options = shuffle(options);
    var answers = getPossibleAnswers(answer);

    for(var i=0; i<options.length; i++ ) {
        $(options[i]).text(answers[i]);
    }
}

function getPossibleAnswers(answer) {
    var possibilities = [];
    var ranges = [-3,-2,-1,1,2,3]

    possibilities.push(answer);
    while (possibilities.length < 4) {
        var option = Math.floor(Math.random() * ranges.length);
        if (possibilities.indexOf(answer + ranges[option]) == -1 ) {
            possibilities.push(answer + ranges[option]);
        }
    }
    return shuffle(possibilities);
}

function setQuestion() {
    var signs = ["+","-","*","/"]
	var sign = Math.floor(Math.random() * 4);
    var num1 = Math.floor(Math.random()*level);
    var num2 = Math.floor(Math.random()*level);
//	var num1 = Math.round(Math.random() * level);
//	var num2 = Math.round(Math.random() * level);

	var temp;

    document.getElementById("sign").innerText = signs[sign];
    $(".options").removeClass("disableOptions");

    switch (signs[sign]) {
        case "+": // +
            answer = num1 + num2;
            break;
        case "-": // -
            if (num2 > num1) {
    			temp = num2;
    			num2 = num1;
    			num1 = temp;
    		}
            answer = num1 - num2;
            break;
        case "*": // *
            answer = num1 * num2;
            break;
        case "/": // /
            num2 = num2 == 0 ? 1 : num2;
            answer = (num1 * num2) / num2;
            num1 = num1 * num2;
            break;
        default:
    }

	NUM1.text(num1);
	NUM2.text(num2);
    buildOptions(answer);

}

function shuffle (array) {
	var i = 0, j = 0, temp = null

	for (i = array.length - 1; i > 0; i -= 1) {
  		j = Math.floor(Math.random() * (i + 1))
  		temp = array[i]
	  	array[i] = array[j]
  		array[j] = temp
  	}
	return array;
}
