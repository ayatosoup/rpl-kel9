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
        this.maxAttempts = 3;
        this.remainingAttempts = this.maxAttempts;
        this.correctAnswerIndex = 1; // Assume the second answer is correct
        this.timer = null;
        this.timeLeft = 30; // Timer duration in seconds

        document.addEventListener("keydown", this.movePlayer.bind(this));
    }

    movePlayer(event) {
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
        this.enemy.classList.remove("hidden");
        this.showQuestionAndAnswers();
        this.startTimer();
    }

    showQuestionAndAnswers() {
        const question = "apa lambang sila ke 4";
        this.questionContainer.innerHTML = question;

        const answers = ["Padi kapas", "kepala banteng", "bintang emon", "primogems"];
        this.answerContainer.innerHTML = "";
        answers.forEach((answer, index) => {
            const answerElement = document.createElement("div");
            answerElement.classList.add("answer");
            answerElement.textContent = `${index + 1}. ${answer}`;
            answerElement.addEventListener("click", () => this.checkAnswer(index));
            this.answerContainer.appendChild(answerElement);
        });

        this.questionKotak.style.display = "block";
    }

    showQuestionAndAnswers1() {
        const question = "Mengembangkan perbuatan luhur yang mencerminkan sikap dan suasana kekeluargaan merupakan pengamalan sila ke";
        this.questionContainer.innerHTML = question;
        this.correctAnswerIndex = 3;

        const answers = ["1", "2", "3", "5"];
        this.answerContainer.innerHTML = "";
        answers.forEach((answer, index) => {
            const answerElement = document.createElement("div");
            answerElement.classList.add("answer");
            answerElement.textContent = `${index + 1}. ${answer}`;
            answerElement.addEventListener("click", () => this.checkAnswer(index));
            this.answerContainer.appendChild(answerElement);
        });

        this.questionKotak.style.display = "block";

        this.correctAnswer = () => {
            this.shootBambooFromPlayerToEnemy();
        };
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
    
    

    correctAnswer() {
        clearInterval(this.timer); // Stop the timer
        if (this.enemy) {
            this.enemy -= 1;
            if (this.enemy <= 0) {
                this.winGame();
            } else {
                this.shootBambooFromPlayerToEnemy()
                this.showQuestionAndAnswers1(); // Show next question for miniboss
                this.startTimer(); // Restart the timer for next question
            }
        } else {
            this.spawnMiniboss();
        }
        this.shootBambooFromPlayerToEnemy(); // Shoot bamboo to enemy after correct answer
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
            
            // Tambahkan kembali event listener pada jawaban yang dipilih
            this.answerContainer.children[this.selectedIndex].addEventListener("click", () => this.checkAnswer(this.selectedIndex));
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

    updateHealthBar() {
        const healthPercentage = (this.remainingAttempts / this.maxAttempts) * 100;
        this.healthBar.style.width = `${healthPercentage}%`;
    }

    spawnMiniboss() {
        this.enemy.classList.add("hidden");
        this.miniboss.classList.remove("hidden");
        this.minibossSpawned = true;
        alert("Miniboss muncul! Jawab 2 Pertanyaan untuk kalahkan miniboss.");
        this.showQuestionAndAnswers();
        this.startTimer(); 
    }

    winGame() {
        clearInterval(this.timer); // Stop the timer
        alert("Kamu menang!");
        this.goToNextLevel();
    }

    gameOver() {
        clearInterval(this.timer); // Stop the timer
        this.questionKotak.style.display = "none"; // Sembunyikan container pertanyaan
        this.showGameOver(); // Tampilkan teks game over dan tombol
    }
    
    showGameOver() {
    const gameOverText = document.createElement("div");
    gameOverText.textContent = "Game Over";
    gameOverText.classList.add("game-over");
    document.body.appendChild(gameOverText);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    document.body.appendChild(buttonContainer);

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", () => {
        window.location.reload(); // Reload halaman untuk restart
    });
    buttonContainer.appendChild(restartButton);

    const menuButton = document.createElement("button");
    menuButton.textContent = "Menu";
    menuButton.addEventListener("click", () => {
        window.location.href = stageRoute; // Pergi ke halaman menu
    });
    buttonContainer.appendChild(menuButton);

    // Hapus container pertanyaan dari dokumen
    this.questionKotak.parentNode.removeChild(this.questionKotak);
}

    

    goToNextLevel() {
        localStorage.setItem('stage2Unlocked', 'true');
        window.location.href = stageRoute;
    }
}

const stickmanGame = new StickmanGame();

