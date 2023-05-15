class EightPuzzleSolvePlus{

    constructor(arrayProblem, arrayTrue){
        this.arrayProblem = arrayProblem
        this.arrayTrue = arrayTrue
        this.index0 = this.findNol()
        this.arraySolusi = []
        this.arrayHistory = []
        this.dimensi = this.dimensi()
        this.arrayTrack = []
        this.catatFungsi =  []

        let arrayTrack0 = []
        let cek = this.checkTrue(this.arrayProblem)

        arrayTrack0['array'] = this.arrayProblem
        arrayTrack0['fungsi'] = 'init'
        this.catatFungsi.push([cek['selisih']+0,'0init',1])
        this.arrayTrack.push(arrayTrack0)
    }

    findSolusi(max=10){
        let iter = 0
        let cek = this.checkTrue()
        this.printPuzzleSelected()
        while(cek['count'] != cek['total']){
            this.arrayHistory[iter] = []

            this.geserAtas(iter)
            this.geserKanan(iter)
            this.geserBawah(iter)
            this.geserKiri(iter)
            if(!this.findBestIter(iter)){
                break
            }
            //console.log(this.arrayTrack)
            //break
            //this.nextArrayProblem()
            if(iter == max){
                break
            }

            this.printPuzzle(this.arrayHistory[iter])
            console.log('-Selected-')
            this.printPuzzleSelected()
            console.log('-----'+iter+'-----')
            console.log('-----------')
            cek = this.checkTrue()
            iter++
        }
        console.log('Jumlah iterasi : '+iter)
        this.printPuzzleSelected()

    }


    catatFungsiSort(fungsi,index){


        if(this.catatFungsi[0][2] == 1){
            //console.log(this.catatFungsi)
            this.catatFungsi.splice(0, 1)
            if(this.catatFungsi.length == 0){
                this.catatFungsi.push([fungsi,index,0])
                return true
            }
            
        }

        if(this.catatFungsi[0][0]>=fungsi){

            if(this.catatFungsi[0][0]!=fungsi){
                    //delete this.catatFungsi[0]
                if(this.catatFungsi[0][2] == 1){
                    this.catatFungsi.splice(0, 1)
                    this.catatFungsi.push([fungsi,index,0])
                }
            }

             this.catatFungsi.unshift([fungsi,index,0])

            
            return true
        }else{
            return false
        }
    }

    dimensi(){
        return this.arrayProblem.length*this.arrayProblem.length
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

    printPuzzleSelected(){
        console.log('-----------')
        this.arrayProblem.forEach(x => {
            console.log(x)
        });
        console.log('-----------')
        // this.arrayTrue.forEach(x => {
        //     console.log(x)
        // });
    }

    printPuzzle(arrayPuzzle){

        if(arrayPuzzle['atas']){
            console.log('---ATAS---')
            console.log(arrayPuzzle['fungsi_atas'])
            arrayPuzzle['atas'].forEach(x => {
                console.log(x)
            });
        }

        if(arrayPuzzle['kanan']){
            console.log('---KANAN---')
            console.log(arrayPuzzle['fungsi_kanan'])
            arrayPuzzle['kanan'].forEach(x => {
                console.log(x)
            });
        }

        if(arrayPuzzle['bawah']){
            console.log('---BAWAH---')
            console.log(arrayPuzzle['fungsi_bawah'])
            arrayPuzzle['bawah'].forEach(x => {
                console.log(x)
            });
        }

        if(arrayPuzzle['kiri']){
            console.log('---KIRI----')
            console.log(arrayPuzzle['fungsi_kiri'])
            arrayPuzzle['kiri'].forEach(x => {
                console.log(x)
            });
        }
        
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
        check['selisih'] = total-count
        return check
        
    }

    findBestIter(iter){

        let equal = 0
        let nilaifungsi = this.dimensi+iter

        if(this.arrayHistory[iter]['kiri']){
            nilaifungsi = this.arrayHistory[iter]['fungsi_kiri'][0]
            if(this.catatFungsiSort(nilaifungsi,iter+'kiri')){
                this.arraySolusi[iter+'kiri'] = []
                this.arraySolusi[iter+'kiri']['best_fungsi'] = nilaifungsi
                this.arraySolusi[iter+'kiri']['best_flag'] = 'KIRI'
                this.arraySolusi[iter+'kiri']['best_array'] = this.arrayHistory[iter]['kiri']
                this.arraySolusi[iter+'kiri']['best_index0'] = this.arrayHistory[iter]['index0_kiri']

                let arrayTrack0 = []
                arrayTrack0['array'] = this.arrayHistory[iter]['kiri']
                arrayTrack0['fungsi'] = iter+'kiri'
                this.arrayTrack.push(arrayTrack0)
            }
        }

        if(this.arrayHistory[iter]['atas']){
            nilaifungsi = this.arrayHistory[iter]['fungsi_atas'][0]
            if(this.catatFungsiSort(nilaifungsi,iter+'atas')){
                this.arraySolusi[iter+'atas'] = []
                this.arraySolusi[iter+'atas']['best_fungsi'] = nilaifungsi
                this.arraySolusi[iter+'atas']['best_flag'] = 'ATAS'
                this.arraySolusi[iter+'atas']['best_array'] = this.arrayHistory[iter]['atas']
                this.arraySolusi[iter+'atas']['best_index0'] = this.arrayHistory[iter]['index0_atas']

                let arrayTrack0 = []
                arrayTrack0['array'] = this.arrayHistory[iter]['atas']
                arrayTrack0['fungsi'] = iter+'atas'
                this.arrayTrack.push(arrayTrack0)
            }
        }

        if(this.arrayHistory[iter]['kanan']){
            nilaifungsi = this.arrayHistory[iter]['fungsi_kanan'][0]
            if(this.catatFungsiSort(nilaifungsi,iter+'kanan')){
                this.arraySolusi[iter+'kanan'] = []
                this.arraySolusi[iter+'kanan']['best_fungsi'] = nilaifungsi
                this.arraySolusi[iter+'kanan']['best_flag'] = 'KANAN'
                this.arraySolusi[iter+'kanan']['best_array'] = this.arrayHistory[iter]['kanan']
                this.arraySolusi[iter+'kanan']['best_index0'] = this.arrayHistory[iter]['index0_kanan']

                let arrayTrack0 = []
                arrayTrack0['array'] = this.arrayHistory[iter]['kanan']
                arrayTrack0['fungsi'] = iter+'kanan'
                this.arrayTrack.push(arrayTrack0)
                
            }
        }

        if(this.arrayHistory[iter]['bawah']){
            nilaifungsi = this.arrayHistory[iter]['fungsi_bawah'][0]
            if(this.catatFungsiSort(nilaifungsi,iter+'bawah')){
                this.arraySolusi[iter+'bawah'] = []
                this.arraySolusi[iter+'bawah']['best_fungsi'] = nilaifungsi
                this.arraySolusi[iter+'bawah']['best_flag'] = 'BAWAH'
                this.arraySolusi[iter+'bawah']['best_array'] = this.arrayHistory[iter]['bawah']
                this.arraySolusi[iter+'bawah']['best_index0'] = this.arrayHistory[iter]['index0_bawah']

                let arrayTrack0 = []
                arrayTrack0['array'] = this.arrayHistory[iter]['bawah']
                arrayTrack0['fungsi'] = iter+'bawah'
                this.arrayTrack.push(arrayTrack0)
            }
        }

        console.log(this.catatFungsi)
        let arrpb = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[0][1]]['best_array']))
        let index0 = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[0][1]]['best_index0']))
        if(this.cekProblem(arrpb)){
            if(this.catatFungsi.length>1){
                arrpb = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[1][1]]['best_array']))
                index0 = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[1][1]]['best_index0']))
                this.arrayProblem = arrpb
                this.index0 = index0
                this.catatFungsi.splice(1, 1)
                return true
            }else{
                return false
            }
        }else{
            this.arrayProblem = arrpb
            this.index0 = index0
            this.catatFungsi[0][2] = 1
            return true
        }
        
    }

    cekProblem(arrayData){
        let count =0;
        let total = 0
        for(let i=0;i<arrayData.length;i++){
            for(let j=0;j<arrayData.length;j++){
                if(arrayData[i][j] == this.arrayProblem[i][j]){
                    count++
                }
                total++
            }
        }

        if(count ==  total){
            return true
        }else{
            return false
        }
    }

    backtrack(arrayData){
        let ceki = 0
        this.arrayTrack.forEach(x => {
            let arrayBack = x['array']
            let count =0;
            let total = 0
            for(let i=0;i<arrayData.length;i++){
                for(let j=0;j<arrayData.length;j++){
                    if(arrayData[i][j] == arrayBack[i][j]){
                        count++
                    }
                    total++
                }
            }

            if(count ==  total){
                ceki++
            }
        })

        if(ceki>0){
            return true
        }else{
            return false
        }     
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

            if(this.backtrack(arrayProblemTemp)){
                this.arrayHistory[iter]['atas'] = false
                console.log('Tidak bisa geser atas karena backtrack')
                return
            }

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']
            

            data_return['array'] = 'atas'
            this.arrayHistory[iter]['index0_atas'] = [iAfter,j]
            this.arrayHistory[iter]['atas'] =JSON.parse(JSON.stringify(arrayProblemTemp))
            this.arrayHistory[iter]['fungsi_atas'] = [cek['selisih'],iter]
        }else{
            this.arrayHistory[iter]['atas'] = false
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

            if(this.backtrack(arrayProblemTemp)){
                this.arrayHistory[iter]['kanan'] = false
                console.log('Tidak bisa geser kanan karena backtrack')
                return
            }

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']

            data_return['array'] = 'kanan'
            this.arrayHistory[iter]['index0_kanan']= [i,jAfter]
            this.arrayHistory[iter]['kanan'] = JSON.parse(JSON.stringify(arrayProblemTemp))
            this.arrayHistory[iter]['fungsi_kanan'] = [cek['selisih'],iter]

        }else{
            this.arrayHistory[iter]['kanan'] = false
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

            if(this.backtrack(arrayProblemTemp)){
                this.arrayHistory[iter]['bawah'] = false
                console.log('Tidak bisa geser bawah karena backtrack')
                return
            }

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']
            

            data_return['array'] = 'bawah'
            this.arrayHistory[iter]['index0_bawah'] = [iAfter,j]
            this.arrayHistory[iter]['bawah'] = JSON.parse(JSON.stringify(arrayProblemTemp))
            this.arrayHistory[iter]['fungsi_bawah'] = [cek['selisih'],iter]
        }else{
            this.arrayHistory[iter]['bawah'] = false
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

            if(this.backtrack(arrayProblemTemp)){
                this.arrayHistory[iter]['kiri'] = false
                console.log('Tidak bisa geser kiri karena backtrack')
                return
            }

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']
            

            data_return['array'] = 'kiri'
            this.arrayHistory[iter]['index0_kiri'] = [i,jAfter]
            this.arrayHistory[iter]['kiri'] = JSON.parse(JSON.stringify(arrayProblemTemp))
            this.arrayHistory[iter]['fungsi_kiri'] = [cek['selisih'],iter]
        }else{
            this.arrayHistory[iter]['kiri'] = false
            console.log('Tidak bisa geser kiri')
        }

    }

    

}

module.exports = EightPuzzleSolvePlus