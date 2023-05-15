class EightPuzzle{

    constructor(arrayProblem, arrayTrue){
        this.arrayProblem = arrayProblem
        this.arrayTrue = arrayTrue
        this.index0 = this.findNol()
        this.arraySolusi = []
    }

    findNol(){
        let count=0;
        for(let i=0;i<this.arrayProblem.length;i++){
            for(let j=0;j<this.arrayProblem.length;j++){
                if(this.arrayProblem[i][j] == 0){
                    return [i,j]
                }
            } 
        }        
    }

    printPuzzle(){
        console.log('-----------')
        this.arrayProblem.forEach(x => {
            console.log(x)
        });
        console.log('-----------')
        // this.arrayTrue.forEach(x => {
        //     console.log(x)
        // });
    }

    checkTrue(arrayData=null){

        if(arrayData == null){
            arrayData = this.arrayProblem
        }

        let count=0;
        let total =0
        for(let i=0;i<arrayData.length;i++){
            for(let j=0;j<arrayData.length;j++){
                if(arrayData[i][j] == this.arrayTrue[i][j] && arrayData[i][j] != 0){
                    count++
                }
                if(arrayData[i][j] != 0){
                    total++
                }
            } 
        }        

        let check =[];
        check['count'] = count
        check['total'] = total
        
        return check
        
    }

    findSolusi(max=10){
        let iter = 0
        let cek = this.checkTrue()
        this.printPuzzle()
        while(cek['count'] != cek['total']){
            this.arraySolusi[iter] = []
            this.geserAtas(iter)
            this.geserKanan(iter)
            this.geserBawah(iter)
            this.geserKiri(iter)

            let best = this.arraySolusi[iter]['best']['array']
            console.log('Best geser ke '+best+' dengan nilai '+this.arraySolusi[iter]['best']['count'])
            this.arrayProblem =JSON.parse(JSON.stringify(this.arraySolusi[iter][best]))
            this.index0 = JSON.parse(JSON.stringify(this.arraySolusi[iter]['best']['index0']))
            if(iter == max){
                break
            }
            this.printPuzzle()
            cek = this.checkTrue()
            iter++
        }
        console.log('Jumlah iterasi : '+iter)
        this.printPuzzle()

    }
    
    printIndex0(){
        console.log(this.index0)
    }

    geserAtas(iter){
        let i = this.index0[0]
        let j = this.index0[1]
        let data_return=[]

        let iAfter= i-1
        if(iAfter>=0){
            let arrayProblemTemp = JSON.parse(JSON.stringify(this.arrayProblem))
            arrayProblemTemp[i][j] = arrayProblemTemp[iAfter][j]
            arrayProblemTemp[iAfter][j] = 0

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']
            data_return['array'] = 'atas'
            data_return['index0'] = [iAfter,j]
            this.arraySolusi[iter]['atas'] =JSON.parse(JSON.stringify(arrayProblemTemp))
            this.arraySolusi[iter]['best'] = data_return
        }else{
            data_return['count'] = 0
            data_return['array'] = ''
            data_return['index0'] = [i,j]
            this.arraySolusi[iter]['best'] = data_return
            console.log('Tidak bisa geser atas')
        }
    }

    geserKanan(iter){
        let i = this.index0[0]
        let j = this.index0[1]
        let data_return=[]

        let jAfter= j+1
        if(jAfter <= this.arrayProblem[0].length -1){
            let arrayProblemTemp = JSON.parse(JSON.stringify(this.arrayProblem))
            arrayProblemTemp[i][j] = arrayProblemTemp[i][jAfter]
            arrayProblemTemp[i][jAfter] = 0

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']
            data_return['array'] = 'kanan'
            data_return['index0'] = [i,jAfter]
            this.arraySolusi[iter]['kanan'] = JSON.parse(JSON.stringify(arrayProblemTemp))
            if(this.arraySolusi[iter]['best']['count'] < cek['count']){
                this.arraySolusi[iter]['best'] = data_return
            }
        }else{
            console.log('Tidak bisa geser kanan')
        }
    }

    geserBawah(iter){
        let i = this.index0[0]
        let j = this.index0[1]
        let data_return=[]

        let iAfter= i+1
        if(iAfter <= this.arrayProblem.length -1){
            let arrayProblemTemp = JSON.parse(JSON.stringify(this.arrayProblem))
            arrayProblemTemp[i][j] = arrayProblemTemp[iAfter][j]
            arrayProblemTemp[iAfter][j] = 0

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']
            data_return['array'] = 'bawah'
            data_return['index0'] = [iAfter,j]
            this.arraySolusi[iter]['bawah'] = JSON.parse(JSON.stringify(arrayProblemTemp))
            if(this.arraySolusi[iter]['best']['count'] < cek['count']){
                this.arraySolusi[iter]['best'] = data_return
            }
        }else{
            console.log('Tidak bisa geser bawah')
        }

    }

    geserKiri(iter){
        let i = this.index0[0]
        let j = this.index0[1]
        let data_return=[]

        let jAfter= j-1
        if(jAfter>=0){
            let arrayProblemTemp = JSON.parse(JSON.stringify(this.arrayProblem))
            arrayProblemTemp[i][j] = arrayProblemTemp[i][jAfter]
            arrayProblemTemp[i][jAfter] = 0

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']
            data_return['array'] = 'kiri'
            data_return['index0'] = [i,jAfter]
            this.arraySolusi[iter]['kiri'] = JSON.parse(JSON.stringify(arrayProblemTemp))
            if(this.arraySolusi[iter]['best']['count'] < cek['count']){
                this.arraySolusi[iter]['best'] = data_return
            }
        }else{
            console.log('Tidak bisa geser kiri')
        }

    }

    

}

module.exports = EightPuzzle