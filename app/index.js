const EightPuzzle = require('../solution/EightPuzzle')
const EightPuzzleSolve = require('../solution/EightPuzzleSolve')
const EightPuzzleSolvePlus = require('../solution/EightPuzzleSolvePlus')

//INITIAL
/*let arrayProblem = [
    [2,8,3], 
    [1,6,4],
    [7,0,5]
    ];

let arrayTrue  = [
    [1, 2, 3], 
    [8, 0, 4],
    [7, 6, 5]
    ];*/

//UNSOLVED
/*let arrayProblem = [
    [1,2,3], 
    [8,0,4],
    [7,6,5]
    ];

let arrayTrue  = [
    [1, 2, 3], 
    [4, 5, 6],
    [7, 8, 0]
    ];*/

/*let arrayProblem = [
    [8,2,7], 
    [3,4,1],
    [0,6,5]
    ];

let arrayTrue  = [
    [1, 2, 3], 
    [4, 5, 6],
    [7, 8, 0]
    ];*/

/*let arrayProblem = [
    [1,2,3], 
    [0,4,6],
    [7,5,8]
    ];

let arrayTrue  = [
    [1, 2, 3], 
    [4, 5, 6],
    [7, 8, 0]
    ];*/


/*let arrayProblem = [
    [4,7,0], 
    [1,6,3],
    [2,5,8]
    ];

let arrayTrue  = [
    [1, 2, 3], 
    [4, 5, 6],
    [7, 8, 0]
    ];*/



console.log('Selamat datang di aplikasi 8 Puzzle')
console.log('-----------------------------------')
console.log('Contoh tile')
console.log('|2|8|3|')
console.log('|1|6|4|')
console.log('|7|0|5|')
console.log('Penulisan pada input -> 2 8 3 1 6 4 7 0 5')
console.log('Isi tile kosong dengan angka 0')
console.log('Gunakan aturan yang sama untuk melakukan input pada goal state')
console.log('Isian dimensi tile jika dimensi 3x3 maka isikan 3')
console.log('-----------------------------------')
console.log('-----------------------------------')

let inisial = ''
let dimensi = 3
let goal = ''
let max = 10000
let ulang = -1


const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Input dimensi tile -> ', (answer) => {
    dimensi = answer
      resolve()
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Input initial state -> ', (answer) => {
      initial = answer
      resolve()
    })
  })
}

const question3 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Input goal state -> ', (answer) => {
      goal = answer
      resolve()
    })
  })
}

const question4 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Input maksimum iterasi -> ', (answer) => {
      max = answer
      resolve()
    })
  })
}

const question5 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Apakah ingin mengulangi? (isikan 1 jika iya, 0 jika tidak) -> ', (answer) => {
      ulang = answer
      resolve()
    })
  })
}

const main = async () => {
    while(ulang != 0){
      await question1()
      await question2()
      await question3()
      await question4()
      
      let arrayProblem = []
      let arrayTrue = []

      let arrayInit = initial.trim().split(" ");
      let arrayGoal = goal.trim().split(" ");

      let temp = []
      let temp2 = []

      for(i=0;i<arrayInit.length;i++){

        if(i%dimensi == 0 && i != 0){
            arrayProblem.push(temp)
            arrayTrue.push(temp2)


            temp = []
            temp2 = []

            temp.push(parseInt(arrayInit[i]))
            temp2.push(parseInt(arrayGoal[i]))

        }else{
            temp.push(parseInt(arrayInit[i]))
            temp2.push(parseInt(arrayGoal[i]))

        }
      }

      arrayProblem.push(temp)
      arrayTrue.push(temp2)

      //puzzle = new EightPuzzle(arrayProblem,arrayTrue)

      //puzzle.findSolusi(max)

      puzzle = new EightPuzzleSolve(arrayProblem,arrayTrue)

      puzzle.findSolusi(max)

      await question5()

    }
    
    rl.close()

}

main()

//puzzle = new EightPuzzleSolve(arrayProblem,arrayTrue)

//puzzle.findSolusi(1000)
