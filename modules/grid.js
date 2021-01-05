import number from './number.js';

const grid = {
    gridElement: document.getElementsByClassName("grid")[0],
    cells: [],
    playable: false,
    directionRoots: {
        //roots are the first rows or columns
        'UP' :[1, 2, 3, 4],
        'RIGHT' :[4, 8, 12, 16],
        'DOWN' :[13, 14, 15, 16],
        'LEFT' :[1, 5, 9, 13]
    },
    init: function(){
        const cellEllements =document.getElementsByClassName("cell");
        let cellIndex = 1;
        for(let cellEllement of cellEllements) {
            grid.cells[cellIndex] = {
                element: cellEllement,
                top: cellEllement.offsetTop,
                left: cellEllement.offsetLeft,
                number: null

            }
            cellIndex++;
        }
        //spawn
    number.spawn();
    this.playable =true;
    },
    randomEmptyCellIndex: function() {
        let emptyCells = [];

        for (let i = 1; i < this.cells.length; i++) {
            if(this.cells[i].number === null) {
                emptyCells.push(i);
            } 
            
        }
        if(emptyCells.length === 0) {
            //no empty cell
            return false;
        }
        return emptyCells[ Math.floor(Math.random() * emptyCells.length) ];
    },
    slide: function(direction) {
        if(!this.playable){
            return false;
        }

        //set playable to false to prevent condition slides
        this.playable = false;
        // get directions
        const roots = this.directionRoots[direction];

        //index increments ir decrements
        let increment =(direction === 'RIGHT' || direction === 'DOWN') ?  -1 : 1;

        //indexs moves by
        increment *=(direction === 'UP' || direction === 'DOWN') ?  4 : 1;
        //start loop with root index
        for (let i = 0; i < roots.length; i++) {
            const root = roots[i];
            //increment or decrement through grid from root
            //starts from 1 bc no need to check root cell
            for (let j = 1; j < 4; j++) {
                const cellIndex = root + (j * increment);
                const cell = this.cells[cellIndex];

                if(cell.number !==null){
                    let moveToCell = null;
                    //check if cells between (to root) this cell empty or has same number
                    //to decide to move or stay
                    //k starts from  j-1 first cell below j
                    //k ends by 0  which is root cell
                    for (let k = j-1; k >= 0; k--){
                        const foreCellIndex = root +(k * increment);
                        const foreCell = this.cells[foreCellIndex];
                        
                        if(foreCell.number === null) {
                            //the cell is empty, move to check next cell
                            moveToCell = foreCell;
                        } else if (cell.number.dataset.value === foreCell.number.dataset.value){
                            // the cell has same number, move, merge and stop
                            moveToCell = foreCell;
                            break;
                        } else {
                            // next cell is not empty and not same with moving number(number is moving cell is nt)
                            // number cant go further
                            break;
                        }
                    }
//roots
                    if(moveToCell !==null) {
                        number.moveto(cell, moveToCell);
                    }
                }
            }

        }

        // spwn a new number and make game playable
        setTimeout(function(){
            if(number.spawn()){
                grid.playable = true;
            }
            else{
                alert("GAME OVER!");
            }
        }, 500)
    }//root
}
export default grid;