let balloonClicked = Array(5);
reset();
let breakSound = false;
let urlpara = location.search;
if (urlpara == "?enable_breaking_sound") {
    breakSound = true;
}
let audio = document.getElementById('sound');
let balloons = 0;
let b_homedir = 'https://www.trpfrog.net';
let b_width = 50;

function buildSoundButton() {
    let html = '';
    if (breakSound) {
        html = '<a href=\"' + b_homedir + '/balloon/index.html\" class=\"linkButton\">音を消す</a>';
    } else {
        html = '<a href=\"' + b_homedir + '/balloon/index.html?enable_breaking_sound\" class=\"linkButton\">音を鳴らす</a>';
    }
    document.write(html);
}

function setHomedir(newhomedir) {
    b_homedir = newhomedir;
}

function setWidth(newwidth) {
    b_width = newwidth;
}

function prepare(num) {
    balloons = num;
    balloonClicked = Array(balloons);
    reset();
}

function reset() {
    for (let i = 0; i < balloonClicked.length; i++) {
        balloonClicked[i] = false;
    }
}

function breakBalloon() {
    if (breakSound) {
        audio.load();
        audio.play();
    }
}

function buildBalloons() {
    let balloon_area = document.getElementById('balloon_area');
    let balloon_color = ['orange', 'green', 'blue'];
    
    for (let i = 0; i < balloonClicked.length; i++) {
        let random = Math.floor(Math.random() * 3);
        let color = balloon_color[random];

        let balloon = document.createElement('img');
        balloon.setAttribute('class', 'balloon');

        balloon.src          = b_homedir + '/images/balloon/' + color + '/normal.png';
        balloon.style.width  = b_width + 'px';
        balloon.style.cursor = 'crosshair';

        balloon.addEventListener('mouseover', function() {
            if(!balloonClicked[i]) {
                this.src = b_homedir + '/images/balloon/' + color + '/tremble.gif';
            }
        });

        balloon.addEventListener('mouseout', function () {
            if (!balloonClicked[i]) {
                this.src = b_homedir + '/images/balloon/' + color + '/normal.png';
            }
        });

        balloon.addEventListener('click', function () {
            this.src = b_homedir + '/images/balloon/' + color + '/break.png';
            if (!balloonClicked[i]) {
                breakBalloon();
                incrementStatNumber(BALLOON_BROKENS, false);
            }
            balloonClicked[i] = true;
        });

        balloon_area.appendChild(balloon);
    }
}

function buildTopBalloons(preparedBaloons) {
    let html = '';
    let prevcolor = '';
    let colorhistory = [];
    let isCompleted = true;
    for (let i = 0; i < balloonClicked.length; i++) {
        let random = Math.floor(Math.random() * 3);
        
        if(i == 0){
            prevcolor = random;
        }else{
            if(prevcolor != random) isCompleted = false;
        }
        colorhistory.push(random);

        let color = "orange";
        switch (random) {
            case 0:
                color = "orange";
                break;
            case 1:
                color = "blue";
                break;
            case 2:
                color = "green";
                break;
            default:
        }
        html += '<img src=\"' + b_homedir + '/images/balloon/' + color + '/normal.png\" '
        html += 'width='
        html += (100 / preparedBaloons) + ''
        html += '%'
        html += 'onmouseover=\"if( !balloonClicked[' + i + '] ) this.src=\'' + b_homedir + '/images/balloon/' + color + '/tremble.gif\'\" '
        html += 'onmouseout=\"if( !balloonClicked[' + i + '] ) this.src=\'' + b_homedir + '/images/balloon/' + color + '/normal.png\'\" '
        html += 'onclick=\"this.src=\'' + b_homedir + '/images/balloon/' + color + '/break.png\'; '
        html += '    if( !balloonClicked[' + i + '] ){ breakBalloon();'
        html += '    incrementStatNumber(BALLOON_BROKENS);}'
        html += '    balloonClicked[' + i + '] = true\"'
        html += 'style=\"cursor: crosshair\"; '
        html += 'class=\"balloon\">'
    }
    if(isCompleted) {
        incrementStatNumber(BALLOON_COMPLETED);
    }

    let isPalindrome = true;
    for(let i = 0; i < 3; i++){
        if(colorhistory[i] != colorhistory[6-i]) isPalindrome = false;
    }
    if (isPalindrome) {
        incrementStatNumber(BALLOON_SYMMETRY);
    }
    
    document.getElementById('balloon-area').innerHTML = html;
}

function regenerateTopBalloon() {
    prepare(7);
    buildTopBalloons(7);
}
