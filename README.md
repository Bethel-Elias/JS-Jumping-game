# Jumping Game

A simple browser-based JavaScript jumping game. Avoid obstacles, jump over cactuses and rocks, dodge flying birds, and try to achieve the highest score.

## Features

* Start screen before the game begins
* Keyboard and button controls
* Double jump system
* Random obstacles:

    * Cactus
    * Rock
    * Flying bird
* Score counter
* High score saved with `localStorage`
* Increasing game speed every 5 points
* Pause and restart functionality
* Background music, jump sound, and game-over sound
* Animated running character

## Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript

## Project Structure

```text
jumping-game/
│
├── index.html
├── style.css
├── script.js
│
├── images/
│   ├── gameBackgroundImg.png
│   ├── run1.png
│   ├── run2.png
│   ├── cactus.png
│   ├── rock.png
│   └── bird5.png
│
└── sounds/
    ├── background.wav
    ├── jump.wav
    └── gameover.wav
```

> Make sure the filenames inside the `images` and `sounds` folders match the filenames used in `index.html`, `style.css`, and `script.js`.

## How to Run the Game

1. Download or clone the project.
2. Keep the folder structure shown above.
3. Open `index.html` in your browser.
4. Click **Start Game** or press **Enter**.

No installation or server is required.

## Controls

* `Enter` — Start the game
* `Space` — Jump
* `P` — Pause or resume the game
* `R` — Restart the game

You can also use the **Pause** and **Restart** buttons below the game area.

## How the Game Works

The player controls a character that automatically stays on the ground until a jump is triggered.

* The character can jump up to two times before landing.
* Obstacles appear randomly from the right side of the screen.
* Passing an obstacle increases the score by 1.
* Every 5 points, the obstacle speed increases.
* When the character collides with an obstacle, the game ends.
* The highest score is saved in the browser using `localStorage`.

## Assets

### Images

The game uses the following images:

* `gameBackgroundImg.png` — Game background
* `run1.png` and `run2.png` — Character running animation
* `cactus.png` — Ground obstacle
* `rock.png` — Ground obstacle
* `bird5.png` — Flying obstacle

### Sounds

The game uses these sound files:

* `background.wav` — Background music
* `jump.wav` — Played when the character jumps
* `gameover.wav` — Played when the game ends

## Future Improvements

Possible improvements for the project:

* Add a mobile-friendly jump button
* Add more obstacle types
* Add lives or power-ups
* Replace the game-over alert with a custom game-over screen
* Add different levels and backgrounds
* Add a reset high-score option
* Improve pause functionality by pausing character jump movement too

## Author

Created as a JavaScript jumping game project.
