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
        this.minibossHealth = 2; // Miniboss requires 2 hits
        this.playerPositionX = 0;
        this.enemyPositionX = window.innerWidth - this.enemy.offsetWidth;
        this.enemyHealth = 2;
        this.maxAttempts = 3;
        this.remainingAttempts = this.maxAttempts;
        this.correctAnswerIndex = 1; // Assume the second answer is correct
        this.timer = null;
        this.timeLeft = 30; // Timer duration in seconds
        this.playerMovementEnabled = true;
        this.questions = []; // Initialize as empty array
        this.currentQuestionIndex = 0; // Initialize index
        this.correctAnswersCount = 0; // Counter for correct answers
    
        document.addEventListener("keydown", this.movePlayer.bind(this));
    
        // Load questions
        this.loadQuestions();
    }
    

    async loadQuestions() {
        try {
            const response = await fetch('/api/questions');
            const questions = await response.json();
            this.questions = questions;
        } catch (error) {
            console.error('Error loading questions:', error);
        }
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
        if (this.currentQuestionIndex >= this.questions.length) {
            console.log('All questions have been answered');
            return;
        }

        const questionData = this.questions[this.currentQuestionIndex];
        this.currentQuestionIndex += 1;

        this.showQuestionAndAnswers(questionData);
    }

    showQuestionAndAnswers(questionData) {
        if (!questionData) {
            console.error('Question data is undefined');
            return;
        }

        const question = questionData.question;
        this.questionContainer.innerHTML = question;

        const answers = JSON.parse(questionData.answers); // Convert JSON string to JavaScript array
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
    clearInterval(this.timer); // Stop the timer
    this.enemyHealth = (this.enemyHealth || 2) - 1;
    this.correctAnswersCount += 1; // Increment correct answers count
    
    if (this.minibossSpawned) {
        this.shootBambooFromPlayerToEnemy(true);
    } else if (!this.answeredFirstQuestion) {
        this.answeredFirstQuestion = true;
        this.shootBambooFromPlayerToEnemy();
        setTimeout(() => {
            this.loadNextQuestion(); // Load second question from API
            this.startTimer(); // Restart timer for second question
        }, 1000); // Adjust time as per animation duration
    } else {
        this.shootBambooFromPlayerToEnemy(); // Shoot bamboo to enemy after correct answer
        if (this.enemyHealth <= 0) {
            this.shootBambooFromPlayerToEnemy(true);
            setTimeout(() => {
                if (this.correctAnswersCount >= 2) {
                    this.disableQuestionDisplay();
                    this.winGame(); // Trigger win game if two questions answered correctly
                } else {
                    this.loadNextQuestion(); // Load next question from API
                    this.startTimer(); // Restart timer for next question
                }
            }, 1000); // Adjust this time to match the animation duration
        } else {
            setTimeout(() => {
                if (this.correctAnswersCount >= 2) {
                    this.disableQuestionDisplay();
                    this.winGame(); // Trigger win game if two questions answered correctly
                } else {
                    this.loadNextQuestion(); // Load next question from API
                    this.startTimer(); // Restart timer for next question
                }
            }, 1000); // Adjust this time to match the animation duration
        }
    }
}

    
    
    async loadNextQuestion() {
        try {
            const response = await fetch('/api/questions'); // Adjust API endpoint if needed
            const questions = await response.json();
            
            if (questions.length > 0) {
                const questionData = questions[this.currentQuestionIndex]; // Get the next question
                this.currentQuestionIndex += 1;
                this.showQuestionAndAnswers(questionData);
            } else {
                console.log('No more questions available.');
            }
        } catch (error) {
            console.error('Error loading next question:', error);
        }
    }
    

    shootBambooFromPlayerToEnemy() {
        const bamboo = document.getElementById("bamboo");
        const enemy = document.getElementById("enemy");
        const player = document.getElementById("player");

        this.questionKotak.style.display = "none";

        // Set posisi awal bamboo sesuai dengan posisi pemain
        bamboo.style.left = `${player.offsetLeft + player.offsetWidth / 2}px`;
        bamboo.style.top = `${player.offsetTop + player.offsetHeight / 2}px`;
        bamboo.style.display = "block";

        // Hitung jarak antara pemain dan musuh
        const distanceX = enemy.offsetLeft - player.offsetLeft;
        const distanceY = enemy.offsetTop - player.offsetTop;

        // Animasi bamboo menuju musuh
        bamboo.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${distanceX}px, ${distanceY}px)` }
        ], {
            duration: 1000, // Durasi animasi dalam milidetik
            easing: 'linear',
            fill: 'forwards'
        });

        setTimeout(() => {
            enemy.style.animation = "shake 0.5s ease-in-out"; // Terapkan animasi getar
            setTimeout(() => {
                enemy.style.animation = ""; // Hapus animasi getar setelah 0.5 detik
            }, 500);
        }, 1000); // Sesuaikan dengan durasi animasi

        setTimeout(() => {
            this.questionKotak.style.display = "block";
        }, 1000); // Sesuaikan dengan durasi animasi peluru
    }

    wrongAnswer() {
        // Sembunyikan container pertanyaan
        this.questionKotak.style.display = "none";

        // Tampilkan peluru dan mulai animasi
        this.shootBulletFromEnemyToPlayer();

        // Kurangi lebar health bar setelah beberapa waktu (untuk memberikan waktu animasi peluru)
        setTimeout(() => {
            this.healthBar.style.width = `${this.healthBar.offsetWidth - 50}px`; // Kurangi lebar health bar sebesar 50px
            this.remainingAttempts -= 1;
            if (this.remainingAttempts <= 0) {
                this.gameOver();
            }

            // Tampilkan kembali container pertanyaan setelah serangan selesai
            this.questionKotak.style.display = "block";
        }, 1000); // Sesuaikan waktu ini dengan durasi animasi peluru
    }

    shootBulletFromEnemyToPlayer() {
        const bullet = document.getElementById("enemyAttack");
        const enemy = document.getElementById("enemy");
        const player = document.getElementById("player");

        // Set posisi awal peluru sesuai dengan posisi musuh
        bullet.style.left = `${enemy.offsetLeft + enemy.offsetWidth / 2}px`;
        bullet.style.top = `${enemy.offsetTop + enemy.offsetHeight / 2}px`;
        bullet.style.display = "block";

        // Hitung jarak antara musuh dan pemain
        const distanceX = player.offsetLeft - enemy.offsetLeft;
        const distanceY = player.offsetTop - enemy.offsetTop;

        // Animasi peluru menuju pemain
        bullet.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${distanceX}px, ${distanceY}px)` }
        ], {
            duration: 1000, // Durasi animasi dalam milidetik
            easing: 'linear',
            fill: 'forwards'
        });

        // Sembunyikan peluru setelah animasi selesai
        setTimeout(() => {
            bullet.style.display = "none";
        }, 1000); // Sesuaikan dengan durasi animasi
    }

    startTimer() {
        this.timeLeft = 30; // Reset the timer
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
        clearInterval(this.timer); // Stop the timer
        alert("Kamu menang!");
    
        this.disableQuestionDisplay();
    
        this.goToNextLevel();
    }
    
    disableQuestionDisplay() {
        // Hide question and answer container
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
