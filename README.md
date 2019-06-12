# simon-says
GA SEI-1: Project 1 - Create a game using javascript

## Pre Project Materials:

### Concept Design

Concept, designs, game play ideas.

#### Simon Says!

Do what Simon Says in the order he tells you! A game board of multiple tiles will flash in different colours one at the time. The player has to click on the tiles in the sequence shown to win the round. The rounds will increase in difficulty by showing a longer sequence for the user to replicate and can even include a timer.

#### MVP

When game is run, the game engine will randomly generate a sequence to run on the 4 button tiles. JS will be used to append the class styles to the buttons and set an interval to "light up" the buttons sequentially. 

Afterwards, event listeners will be used to detect the player's moves and then compare it to the generated sequence. 

#### Wireframing

[https://theuxreview.co.uk/wireframes-beginners-guide/](https://theuxreview.co.uk/wireframes-beginners-guide/)

Make a wireframe for each interactive page or element the user will see.

![Image of wireframe](https://i.imgur.com/wtPpE4g.png)

--


## Project Post Mortem
Thoughts of the game and creation process after completing the project.

### Approach and Process

1. What in my process and approach to this project would I do differently next time?

Closer towards the project due date I started to create new functions all over the place which made my code messier and harder to keep track of which code is new and require more attention to, and which are the older ones. I feel that I could be more disciplined in keeping my functions in order and keep the related ones together.

2. What in my process and approach to this project went well that I would repeat next time?

I approached this project by figuring out what I wanted for my MVP and from there thought of how I can implement it using javascript, such as functions to use. As I went along coding the MVP, I came up with other new ideas to add into the game but shelved it aside until I was done with the MVP, that way I can stay focused and complete the project by the deadline. 

--

### Code and Code Design

1. What in my code and program design in the project would I do differently next time?

I ended up hard coding a number of the game functions which I felt could be optimised and be cleaner.

```javascript
// add event listeners for clicks on tiles
function listenToPlayer(){
    if (hard != true) {
        document.getElementById("red").addEventListener('click', pushPlayerSequence);
        document.getElementById("blue").addEventListener('click', pushPlayerSequence);
        document.getElementById("green").addEventListener('click', pushPlayerSequence);
        document.getElementById("yellow").addEventListener('click', pushPlayerSequence);
    }
    else {
        document.getElementById("red").addEventListener('click', pushPlayerSequence);
        document.getElementById("blue").addEventListener('click', pushPlayerSequence);
        document.getElementById("green").addEventListener('click', pushPlayerSequence);
        document.getElementById("yellow").addEventListener('click', pushPlayerSequence);
        document.getElementById("purple").addEventListener('click', pushPlayerSequence);
        document.getElementById("peach").addEventListener('click', pushPlayerSequence);
        document.getElementById("brown").addEventListener('click', pushPlayerSequence);
        document.getElementById("olive").addEventListener('click', pushPlayerSequence);
    }
};
```

2. What in my code and program design in the project went well? Is there anything I would do the same next time?

I find packaging my javascript code into various specific functions helped me keep my code more organised. That way I can easily pull these various functions easily after I have defined them. 

```javascript
// when player clicks on start game, generate sequence, bump round counter
function startGame(){
    start.style.visibility = "hidden";
    hardModeShow();
    generateSequence();
    assignTile();
    listenToPlayer();
    newRound();
}
```

  For each, please include code examples.
  1. Code snippet up to 20 lines.
  2. Code design documents or architecture drawings / diagrams.

#### WDI Unit 1 Post Mortem
1. What habits did I use during this unit that helped me?

I've learnt to pseudocode before I started to work on my actual codes. This really helped me to keep track of the overall "frame" of the game as well as check if there are still parts of the game that needs to be coded but I've missed out.

2. What habits did I have during this unit that I can improve on?

I think I kept nitpicking to specific parts on my code for too long, be it in my CSS styling or javascript code, and I felt that I wasted too much time there when I could've moved on to other parts of the game and revisit them after I was done with the other portions. 

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)

Overall the course so far has been doable, we just need to keep applying what we've learned to get used to all the syntax, expressions, etc.