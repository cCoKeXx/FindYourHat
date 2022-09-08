const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let stillPlaying = true;

class Field {
    constructor(fieldArray){
        this.field = fieldArray;
    }
    //Printing field to the console
    print(){
        let fieldString = ''
        for(let i = 0; i < this.field.length ;i++){
            fieldString += this.field[i].join('');
            fieldString += '\n';
        }
        console.log(fieldString)
    }
    //Updating field
    updateField(y_index,x_index){
        if(this.field[y_index][x_index] === hat){
                console.log(`You found the hat 🎩 `);
                stillPlaying = false;
        }else if(this.field[y_index][x_index] === hole){
                console.log(`You fell into the hole 🕳 `);
                stillPlaying = false;
        }else if(this.field[y_index][x_index] === fieldCharacter){
                this.field[y_index][x_index] = "*";
        }else{
                stillPlaying = false;
                console.log('OUT OF BOUNDS ❌ ')
        }
        return stillPlaying;
    }
    // Generate field function 
    static generateField(height,width,percentage){
        let newField = [];
        let charForField = [hat,pathCharacter,fieldCharacter];

        //PERCENTAGE OF HOLES
        let numberOfHoles = percentage/100 * (height*width);
    
        while(numberOfHoles>0){
            charForField.push(hole);
            numberOfHoles--;
        }


        for(let y = 0 ; y < height ; y++){
            let fieldLayer  = [];
            for(let x = 0 ; x < width ; x++){
                let ranIn = Math.floor(Math.random()*charForField.length)
                fieldLayer.push(charForField[ranIn]);
                if(charForField[ranIn] !== fieldCharacter){
                    charForField.splice(ranIn, 1);
                }
            }
            newField.push(fieldLayer);
        }
        return newField;
    }
}


const myField = new Field(Field.generateField(3,3,5));

//const myField = new Field(startingField);
function play(){
    let xIndex;
    let yIndex;


    //Finding the starting index;
    for(let y = 0 ; y < myField.field.length ; y++){
        for(let x = 0 ; x < myField.field[0].length;x++){
            if(myField.field[y][x] === '*'){
                xIndex = x;
                yIndex = y;
            }
        }
    }





    //Printing starting field
    
    while(stillPlaying === true) {
        myField.print();
        let userInput = prompt('Which direction?: ');
        
        //checking user input
        if(userInput === 'r'){
            xIndex++;
        }else if(userInput ==='l'){
            xIndex--;
        }else if(userInput === 'd'){
            yIndex++;
        }else if(userInput === 'u'){
            yIndex--;
        }else{
            Error(`Invalid input`);
        }
        myField.updateField(yIndex,xIndex);
        //myField.print(); 
    }  
    

}
play();

