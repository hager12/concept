//const { default: grid } = require("./grid");
import grid from './grid.js';
const number ={
    numbers: [],
    getElements: function() {
        const numberElements = document.getElementsByClassName("number");
        for (let numberElement of numberElements) {
            this.numbers.push(numberElement);

        }
    },
    spawn: function() {
        const emptyCellIndex = grid.randomEmptyCellIndex();

        if(emptyCellIndex === false) {
            return false;
        }
        const numberElement = document.createElement("div");
        const numberValue= 2;

        numberElement.innerText = numberValue;
        numberElement.dataset.value = numberValue;
        numberElement.classList.add("number");

        numberElement.style.top = `${grid.cells[emptyCellIndex].top}px` ;
        numberElement.style.left = `${grid.cells[emptyCellIndex].left}px` ;

        grid.cells[emptyCellIndex].number = numberElement;

        grid.gridElement.append(numberElement);
       return true;
    
    },
    moveto: function(fromcell, tocell){
        const number = fromcell.number;

        if(tocell.number === null){
            //target cell is empty fill with number
            number.style.top =`${tocell.top}px`;
            number.style.left =`${tocell.left}px`;
            tocell.number = number;
            fromcell.number =null;
        } else if (number.dataset.value === tocell.number.dataset.value) {
            // target cell has same number
            //merge both cell
            number.style.top =`${tocell.top}px`;
            number.style.left =`${tocell.left}px`;
            number.style.opacity = '0';
            // remove numper dom element after transition
            setTimeout(() => {
            grid.gridElement.removeChild(number);
            }, 500);

            //double targett cells number
            const newNumberValue = tocell.number.dataset.value * 2;
            tocell.number.dataset.value = newNumberValue;
            tocell.number.innerText = newNumberValue;
            fromcell.number = null;

        }
    }
}
export default number;