var playing = false;
var score = 0;
var livesLeft = 3;
var fruits = ["apple", "banana", "cherries", "grapes", "kiwi", "mango", "orange", "peach", "pear", "watermelon"];
var step;
var $;
var i;
var j;
var action;
var location;
var clearInterval;
var setInterval;
var setTimeout;
var timeForABomb = 0;
var bomba;
var scoreToPut;
var alert;
var prompt;

$(function(){
    $('#startreset').click(function(){
        if(playing){
            location.reload();
        } else {
            bomba = true;
            livesLeft = 3;
            score = 0;
            playing = true;
            $('#gameover').hide();
            $('#score-value').html(score);
            $('#lifesLeft').show();
            $('#startreset').html("Reset Game");
            addHearts();

            startAction();
            
        }
    });
    
    $('#fruit1').mouseover(function(){
        score++;
        $('#score-value').html(score);
        if(score > 99){
            playing = false;
            $('#fruit1').hide();
            $('#fruitsContainer').hide("explode");
            $('#fruitsContainer').show("explode");
            clearInterval(action);
            setTimeout(function(){
                $('#startreset').html("Start Game");
                $('#lifesLeft').hide();
                $('#gameover').show();
                $('#gameover').html('<p>Game Over!</p><p>Your score is ' + score +'.');
                stopAction();
        },1000);
        } else{
//        document.getElementById('slicesound').play();
        $('#slicesound')[0].play();
        timeForABomb = -0.5;
        clearInterval(action);
        $('#fruit1').hide("explode",500);
        setTimeout(function(){
            startAction();
        },1000);
        }
        
    });
    
    $('#bomb').mouseover(function(){
        playing = false;
        $('#bombsound')[0].play();
        $('#fruit1').hide();
        $('#bomb').hide("explode",500);
        $('#fruitsContainer').hide("explode");
        $('#fruitsContainer').show("explode");
        clearInterval(action);
        
        setTimeout(function(){
            $('#startreset').html("Start Game");
            $('#lifesLeft').hide();
            $('#gameover').show();
            $('#gameover').html('<p>Game Over!</p><p>Your score is ' + score +'.');
            stopAction();
        },1000);        
        
    })


    function addHearts(){
        $('#lifesLeft').empty();
        for(i = 0; i < livesLeft; i++){
            $("#lifesLeft").append("<img src='images/heart.png' class='life'>");
        } 
    }

    function startAction(){            
            step = Math.round(Math.random()*5)+1;
            if(timeForABomb!=-1){
                timeForABomb = Math.random();
            }
            if (timeForABomb < 0.8){
                $('#fruit1').show();
                chooseFruit();
                $('#fruit1').css({
                left : 530*Math.random()+10,
                top : -50
            })
            }

            action = setInterval(function(){
                
                if (timeForABomb < 0.8) {
                    
                    $('#fruit1').css('top', $('#fruit1').position().top + step);
                    if($('#fruit1').position().top > $('#fruitsContainer').height()){
                        if(livesLeft > 1){
                            $('#fruit1').show();
                            chooseFruit();
                            $('#fruit1').css({
                                left : 530*Math.random()+10,
                                top : -50
                            })
                            step = Math.round(Math.random()*5)+1;

                            livesLeft--;
                            addHearts();
                            timeForABomb = -0.5;
                        }else{
                            playing = false;
                            $('#startreset').html("Start Game");
                            $('#lifesLeft').hide();
                            $('#gameover').show();
                            $('#gameover').html('<p>Game Over!</p><p>Your score is ' + score +'.');
                            stopAction();
                        }
                    
                    }
                }else{
                    if(bomba) {
                        $('#fruit1').hide();
                        $('#bomb').show();
                        $('#bomb').css({
                            left : 530*Math.random()+10,
                            top : -50
                        });
                        bomba = false;
                    }
                    $('#bomb').css('top', $('#bomb').position().top + step);
                    if($('#bomb').position().top > $('#fruitsContainer').height()){
                        $('#fruit1').show();
                        chooseFruit();
                        $('#fruit1').css({
                                left : 530*Math.random()+10,
                                top : -50
                        })
                        step = Math.round(Math.random()*5)+1;
                        timeForABomb = -1;
                        bomba = true;
                        }
                        
                    }
                },10);
                
    }

    function chooseFruit(){
        $('#fruit1').attr('src','images/' + fruits[Math.floor(9*Math.random())] + '.png');
    }

    function stopAction(){
        clearInterval(action);
        $('#fruit1').hide();
//        alert($('#row1-score').html() < score);
        setTimeout(function(){
            for(i = 1; i < 6; i++){
    //            alert($('#row'+ i +'-score').valueOf());
                if($('#row'+ i +'-score').html() < score){
                    if (score < 10) {
                        scoreToPut = "00" + score;
                    } else if(score < 100) {
                        scoreToPut = "0" + score;
                    } else {
                        scoreToPut = score;
                    }
                    var name = prompt("Congratulations! Please enter your name to place you in the leaderboard");
                    while (name == "" || name == null) {
                        name = prompt("Congratulations! Please enter your name to place you in the leaderboard");
                    }
                    updateScores(i, scoreToPut, name);
                    break;
                }
            }
        },300);
    }
    
    function updateScores(place, value, newName){
        for(j = 5; j > place; j--){
            var newJ = j-1;
            $('#row' + j + '-score').html($('#row' + newJ + '-score').html());
            $('#row' + j + '-name').html($('#row' + newJ + '-name').html());
        }
        $('#row' + j + '-score').html(value);
        $('#row' + j + '-name').html(newName);
    }
    
});
