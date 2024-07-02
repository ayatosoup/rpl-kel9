class StickmanGame {
    constructor() {
        this.player = document.getElementById("player");
        this.enemy = document.getElementById("enemy");
        this.miniboss = document.getElementById("miniboss");
        this.questionKotak = document.querySelector(".question-kotak");
        this.questionContainer = document.getElementById("questionBox");
        this.answerContainer = document.getElementById("answerBox");
        this.timerContainer = document.getElementById("timer");
        this.healthBar = document.getElementById("healthBar");
        this.winLink = document.getElementById("winLink");
        this.enemySpawned = false;
        this.minibossSpawned = false;
        this.minibossHealth = 2; 
        this.playerPositionX = 0;
        this.enemyPositionX = window.innerWidth - this.enemy.offsetWidth;
        this.enemyHealth = 2;
        this.maxAttempts = 3;
        this.remainingAttempts = this.maxAttempts;
        this.correctAnswerIndex = 1; 
        this.timer = null;
        this.timeLeft = 30; 
        this.playerMovementEnabled = true;
        this.questions = []; 
        this.currentQuestionIndex = 0; 
        this.correctAnswersCount = 0; 
        this.currentQuestion = null; 
        this.answeredQuestions = new Set(); 
    
        document.addEventListener("keydown", this.movePlayer.bind(this));
    
        // Load questions
        this.loadQuestions();
    }

    async loadQuestions() {
        try {
            const response = await fetch('/api/questions');
            const questions = await response.json();
            this.questions = this.shuffleArray(questions); 
        } catch (error) {
            console.error('Error loading questions:', error);
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    movePlayer(event) {
        if (!this.playerMovementEnabled) return;

        if (event.key === "ArrowLeft") {
            this.moveLeft();
        } else if (event.key === "ArrowRight") {
            this.moveRight();
        }
    }

    moveLeft() {
        this.playerPositionX -= 10;
        this.player.style.left = this.playerPositionX + "px";
    }

    moveRight() {
        this.playerPositionX += 10;
        this.player.style.left = this.playerPositionX + "px";
        if (!this.enemySpawned && this.playerPositionX > window.innerWidth / 8) {
            this.spawnEnemy();
        }
    }

    spawnEnemy() {
        this.enemySpawned = true;
        this.playerMovementEnabled = false;
        this.enemy.classList.remove("hidden");
        this.showNextQuestion();
        this.startTimer();
    }

    showNextQuestion() {
        if (this.answeredQuestions.size >= this.questions.length) {
            console.log('All questions have been answered');
            return;
        }

        let questionData;
        do {
            const randomIndex = Math.floor(Math.random() * this.questions.length);
            questionData = this.questions[randomIndex];
        } while (this.answeredQuestions.has(questionData.id));

        this.answeredQuestions.add(questionData.id);
        this.showQuestionAndAnswers(questionData);
    }

    showQuestionAndAnswers(questionData) {
        if (!questionData) {
            console.error('Question data is undefined');
            return;
        }

        const question = questionData.question;
        this.questionContainer.innerHTML = question;

        const answers = JSON.parse(questionData.answers); 
        this.answerContainer.innerHTML = "";
        answers.forEach((answer, index) => {
            const answerElement = document.createElement("div");
            answerElement.classList.add("answer");
            answerElement.textContent = `${index + 1}. ${answer}`;
            answerElement.addEventListener("click", () => this.checkAnswer(index));
            this.answerContainer.appendChild(answerElement);
        });

        this.correctAnswerIndex = questionData.correct_answer_index;
        this.questionKotak.style.display = "block";
    }

    checkAnswer(selectedIndex) {
        if (selectedIndex === this.correctAnswerIndex) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
            this.disableSelectedAnswer(selectedIndex);
        }
    }

    disableSelectedAnswer(selectedIndex) {
        const selectedAnswer = this.answerContainer.children[selectedIndex];
        selectedAnswer.removeEventListener("click", this.checkAnswer);
        selectedAnswer.classList.add("disabled");
        selectedAnswer.style.textDecoration = "line-through";
        selectedAnswer.style.pointerEvents = "none";
    }

    async correctAnswer() {
        clearInterval(this.timer); 
        this.enemyHealth = (this.enemyHealth || 2) - 1;
        this.correctAnswersCount += 1; 

        if (this.minibossSpawned) {
            this.shootBambooFromPlayerToEnemy(true);
        } else if (!this.answeredFirstQuestion) {
            this.answeredFirstQuestion = true;
            this.shootBambooFromPlayerToEnemy();
            setTimeout(() => {
                this.showNextQuestion(); 
                this.startTimer(); 
            }, 1000);
        } else {
            this.shootBambooFromPlayerToEnemy(); 
            if (this.enemyHealth <= 0) {
                this.shootBambooFromPlayerToEnemy(true);
                setTimeout(() => {
                    if (this.correctAnswersCount >= 2) {
                        this.disableQuestionDisplay();
                        this.winGame(); 
                    } else {
                        this.showNextQuestion(); 
                        this.startTimer(); 
                    }
                }, 1000); 
            } else {
                setTimeout(() => {
                    if (this.correctAnswersCount >= 2) {
                        this.disableQuestionDisplay();
                        this.winGame(); 
                    } else {
                        this.showNextQuestion(); 
                        this.startTimer(); 
                    }
                }, 1000); 
            }
        }
    }

    shootBambooFromPlayerToEnemy() {
        const bamboo = document.getElementById("bamboo");
        const enemy = document.getElementById("enemy");
        const player = document.getElementById("player");

        this.questionKotak.style.display = "none";

        bamboo.style.left = `${player.offsetLeft + player.offsetWidth / 2}px`;
        bamboo.style.top = `${player.offsetTop + player.offsetHeight / 2}px`;
        bamboo.style.display = "block";

        const distanceX = enemy.offsetLeft - player.offsetLeft;
        const distanceY = enemy.offsetTop - player.offsetTop;

        bamboo.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${distanceX}px, ${distanceY}px)` }
        ], {
            duration: 1000, 
            easing: 'linear',
            fill: 'forwards'
        });

        setTimeout(() => {
            enemy.style.animation = "shake 0.5s ease-in-out"; 
            setTimeout(() => {
                enemy.style.animation = "";
            }, 500);
        }, 1000); 

        setTimeout(() => {
            this.questionKotak.style.display = "block";
        }, 1000); 
    }

    wrongAnswer() {
        this.questionKotak.style.display = "none";

        this.shootBulletFromEnemyToPlayer();

        setTimeout(() => {
            this.healthBar.style.width = `${this.healthBar.offsetWidth - 50}px`; 
            this.remainingAttempts -= 1;
            if (this.remainingAttempts <= 0) {
                this.gameOver();
            }

            this.questionKotak.style.display = "block";
        }, 1000); 
    }

    shootBulletFromEnemyToPlayer() {
        const bullet = document.getElementById("enemyAttack");
        const enemy = document.getElementById("enemy");
        const player = document.getElementById("player");

        bullet.style.left = `${enemy.offsetLeft + enemy.offsetWidth / 2}px`;
        bullet.style.top = `${enemy.offsetTop + enemy.offsetHeight / 2}px`;
        bullet.style.display = "block";

        const distanceX = player.offsetLeft - enemy.offsetLeft;
        const distanceY = player.offsetTop - enemy.offsetTop;

        bullet.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${distanceX}px, ${distanceY}px)` }
        ], {
            duration: 1000,
            easing: 'linear',
            fill: 'forwards'
        });

        
        setTimeout(() => {
            bullet.style.display = "none";
        }, 1000); 
    }

    startTimer() {
        this.timeLeft = 30; 
        this.updateTimerDisplay();
        this.timer = setInterval(() => {
            this.timeLeft -= 1;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.gameOver();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        this.timerContainer.textContent = `Waktu tersisa: ${this.timeLeft} detik`;
    }

    gameOver() {
        this.playerMovementEnabled = false;
        alert("Kamu Kalah!.");
        location.reload();
    }

    winGame() {
        clearInterval(this.timer); 
        alert("Kamu menang!");
    
        this.disableQuestionDisplay();
    
        this.goToNextLevel();
    }
    
    disableQuestionDisplay() {
        this.questionKotak.style.display = "none";
    }

    goToNextLevel() {
        localStorage.setItem('stage2Unlocked', 'true');
        window.location.href = stageRoute;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const game = new StickmanGame();
});
