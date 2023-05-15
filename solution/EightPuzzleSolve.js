const crypto = require('crypto')
class EightPuzzleSolve{

    

    constructor(arrayProblem, arrayTrue){
        this.arrayInit = arrayProblem
        this.arrayProblem = arrayProblem
        this.arrayTrue = arrayTrue
        this.index0 = this.findNol()
        this.stepIndex0 = []
        this.arraySolusi = []
        this.arrayHistory = []

        this.arrayHistory['0init'] = this.arrayProblem
        this.dimensi = this.dimensi()
        this.arrayTrack = []
        this.catatFungsi =  []

        let arrayTrack0 = []
        let cek = this.checkTrue(this.arrayProblem)

        arrayTrack0['array'] = this.arrayProblem
        arrayTrack0['fungsi'] = 'init'
        this.catatFungsi.push([cek['selisih']+0,'0init',1,'0init'])
        this.arrayTrack.push(arrayTrack0)
    }

    findSolusi(max=10){
        let iter = 0
        let cek = this.checkTrue()
        let parent = '0init'
        this.printPuzzleSelected()

        while(cek['count'] != cek['total']){
            this.geserAtas(iter,parent)
            this.geserKanan(iter,parent)
            this.geserBawah(iter,parent)
            this.geserKiri(iter,parent)
            //console.log(parent)
            parent = this.findBestIter(iter)
            if(!parent){
                break
            }
            
            if(iter == max){
                break
            }

            cek = this.checkTrue()
            iter++
        }
        //console.log('Jumlah iterasi : '+iter)
        this.printStep()

        //console.log(this.catatFungsi)

    }

    printStep(){
        let lasStep = this.stepIndex0[this.stepIndex0.length - 1]
        let tujuan = lasStep[0].replace(/\d+/g, '');
        let finalStep = this.arrayHistory[lasStep[0]]['steptoparent']
        let j = 0

        for (var i = finalStep.length - 1; i >= 0; i--) {
            

            if(finalStep[i] == '0init'){
                continue
            }else{
                j++
                let tujuan = finalStep[i].replace(/\d+/g, '');
                this.arrayHistory[finalStep[i]][tujuan].forEach(y => {
                    console.log(y)
                });
                    console.log('----'+j+'-----')
            }
        }
        j++
        this.printPuzzleSelected()
        console.log('----'+j+'-----')

    }

    catatFungsiSort(fungsi,index,parent){

        if(this.catatFungsi[0][2] == 1){
            //console.log(this.catatFungsi)
            this.catatFungsi.splice(0, 1)
            if(this.catatFungsi.length == 0){
                this.catatFungsi.push([fungsi,index,0,parent])
                return true
            }
            
        }

        if(this.catatFungsi[0][0]>=fungsi){

            if(this.catatFungsi[0][0]!=fungsi){
                    //delete this.catatFungsi[0]
                if(this.catatFungsi[0][2] == 1){
                    this.catatFungsi.splice(0, 1)
                    this.catatFungsi.push([fungsi,index,0,parent])
                }
            }
            this.catatFungsi.unshift([fungsi,index,0,parent])
            
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
        this.arrayProblem.forEach(x => {
            console.log(x)
        });
    }

    printPuzzle(arrayPuzzle){

        return

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

        

        if(this.arrayHistory[iter+'atas']['atas']){
            nilaifungsi = this.arrayHistory[iter+'atas']['fungsi_atas'][0]
            if(this.catatFungsiSort(nilaifungsi,iter+'atas',this.arrayHistory[iter+'atas']['parent'])){
                this.arraySolusi[iter+'atas'] = []
                this.arraySolusi[iter+'atas']['best_fungsi'] = nilaifungsi
                this.arraySolusi[iter+'atas']['parent'] = this.arrayHistory[iter+'atas']['parent']
                this.arraySolusi[iter+'atas']['best_flag'] = iter+'atas'
                this.arraySolusi[iter+'atas']['best_array'] = this.arrayHistory[iter+'atas']['atas']
                this.arraySolusi[iter+'atas']['best_index0'] = this.arrayHistory[iter+'atas']['index0_atas']

                let arrayTrack0 = []
                arrayTrack0['array'] = this.arrayHistory[iter+'atas']['atas']
                arrayTrack0['fungsi'] = iter+'atas'
                this.arrayTrack.push(arrayTrack0)
            }
        }

        if(this.arrayHistory[iter+'kiri']['kiri']){
            nilaifungsi = this.arrayHistory[iter+'kiri']['fungsi_kiri'][0]
            if(this.catatFungsiSort(nilaifungsi,iter+'kiri',this.arrayHistory[iter+'kiri']['parent'])){
                this.arraySolusi[iter+'kiri'] = []

                this.arraySolusi[iter+'kiri']['best_fungsi'] = nilaifungsi
                this.arraySolusi[iter+'kiri']['parent'] = this.arrayHistory[iter+'kiri']['parent']
                this.arraySolusi[iter+'kiri']['best_flag'] = iter+'kiri'
                this.arraySolusi[iter+'kiri']['best_array'] = this.arrayHistory[iter+'kiri']['kiri']
                this.arraySolusi[iter+'kiri']['best_index0'] = this.arrayHistory[iter+'kiri']['index0_kiri']

                let arrayTrack0 = []
                arrayTrack0['array'] = this.arrayHistory[iter+'kiri']['kiri']
                arrayTrack0['fungsi'] = iter+'kiri'
                this.arrayTrack.push(arrayTrack0)
            }
        }

        if(this.arrayHistory[iter+'kanan']['kanan']){
            nilaifungsi = this.arrayHistory[iter+'kanan']['fungsi_kanan'][0]
            if(this.catatFungsiSort(nilaifungsi,iter+'kanan',this.arrayHistory[iter+'kanan']['parent'])){
                this.arraySolusi[iter+'kanan'] = []
                this.arraySolusi[iter+'kanan']['best_fungsi'] = nilaifungsi
                this.arraySolusi[iter+'kanan']['parent'] = this.arrayHistory[iter+'kanan']['parent']
                this.arraySolusi[iter+'kanan']['best_flag'] = iter+'kanan'
                this.arraySolusi[iter+'kanan']['best_array'] = this.arrayHistory[iter+'kanan']['kanan']
                this.arraySolusi[iter+'kanan']['best_index0'] = this.arrayHistory[iter+'kanan']['index0_kanan']

                let arrayTrack0 = []
                arrayTrack0['array'] = this.arrayHistory[iter+'kanan']['kanan']
                arrayTrack0['fungsi'] = iter+'kanan'
                this.arrayTrack.push(arrayTrack0)
                
            }
        }

        if(this.arrayHistory[iter+'bawah']['bawah']){
            nilaifungsi = this.arrayHistory[iter+'bawah']['fungsi_bawah'][0]
            if(this.catatFungsiSort(nilaifungsi,iter+'bawah',this.arrayHistory[iter+'bawah']['parent'])){
                this.arraySolusi[iter+'bawah'] = []
                this.arraySolusi[iter+'bawah']['best_fungsi'] = nilaifungsi
                this.arraySolusi[iter+'bawah']['parent'] = this.arrayHistory[iter+'bawah']['parent']
                this.arraySolusi[iter+'bawah']['best_flag'] = iter+'bawah'
                this.arraySolusi[iter+'bawah']['best_array'] = this.arrayHistory[iter+'bawah']['bawah']
                this.arraySolusi[iter+'bawah']['best_index0'] = this.arrayHistory[iter+'bawah']['index0_bawah']

                let arrayTrack0 = []
                arrayTrack0['array'] = this.arrayHistory[iter+'bawah']['bawah']
                arrayTrack0['fungsi'] = iter+'bawah'
                this.arrayTrack.push(arrayTrack0)
            }
        }

        //console.log(this.catatFungsi)
        //console.log(parent)
        //console.log(this.stepIndex0)

        let arrpb = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[0][1]]['best_array']))
        let index0 = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[0][1]]['best_index0']))
        let parent = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[0][1]]['parent']))

        /*this.stepIndex0.forEach(x => {
            console.log(x)
        });*/

        if(this.cekProblem(arrpb)){
            if(this.catatFungsi.length>1){
                arrpb = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[1][1]]['best_array']))
                index0 = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[1][1]]['best_index0']))
                parent = JSON.parse(JSON.stringify(this.arraySolusi[this.catatFungsi[1][1]]['parent']))
                this.arrayProblem = arrpb
                this.index0 = index0
                
                this.stepIndex0.push([this.catatFungsi[1][1],index0,parent])
                //console.log(this.arraySolusi[this.catatFungsi[1][1]]['best_flag'])
                return this.arraySolusi[this.catatFungsi[1][1]]['best_flag']
            }else{
                return false
            }
        }else{
            this.arrayProblem = arrpb
            this.index0 = index0
            this.stepIndex0.push([this.catatFungsi[0][1],index0,parent])
            this.catatFungsi[0][2] = 1
            return this.arraySolusi[this.catatFungsi[0][1]]['best_flag']
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

    calculateSteptoInit(parent){
        
        let step = []

        if(parent == '0init'){
            step.push(parent)
            return [step,1]
        }

        let tujuan = parent.replace(/\d+/g, '');


        let arrayProblem = this.arrayHistory[parent][tujuan]

        let md5current = crypto.createHash('md5').update(JSON.stringify(arrayProblem)).digest('hex')
        let md5init = crypto.createHash('md5').update(JSON.stringify(this.arrayInit)).digest('hex')
        let i = 1


        while(md5init != md5current){

            step.push(parent)

            i = i+1

            parent = this.arrayHistory[parent]['parent']

            if(parent == '0init'){
                step.push(parent)
                break
            }

            tujuan = parent.replace(/\d+/g, '')
            arrayProblem = this.arrayHistory[parent][tujuan]
            md5current = crypto.createHash('md5').update(JSON.stringify(arrayProblem)).digest('hex')

        }

        return [step,i]
    }

    geserAtas(iter,parent){
        let i = this.index0[0]
        let j = this.index0[1]
        let data_return=[]
        this.arrayHistory[iter+'atas'] = []


        let iAfter= i-1
        if(iAfter>=0){
            let arrayProblemTemp = JSON.parse(JSON.stringify(this.arrayProblem))
            arrayProblemTemp[i][j] = arrayProblemTemp[iAfter][j]
            arrayProblemTemp[iAfter][j] = 0

            if(this.backtrack(arrayProblemTemp)){
                this.arrayHistory[iter+'atas']['atas'] = false
                //console.log('Tidak bisa geser atas karena backtrack')
                return
            }

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']

            data_return['array'] = 'atas'
            let step = this.calculateSteptoInit(parent)
            this.arrayHistory[iter+'atas']['steptoparent'] = step[0]
            this.arrayHistory[iter+'atas']['parent'] = parent
            this.arrayHistory[iter+'atas']['index0_atas'] = [iAfter,j]
            this.arrayHistory[iter+'atas']['atas'] =JSON.parse(JSON.stringify(arrayProblemTemp))
            this.arrayHistory[iter+'atas']['fungsi_atas'] = [cek['selisih'],iter,step[1]]
        }else{
            this.arrayHistory[iter+'atas']['atas'] = false
            //console.log('Tidak bisa geser atas')
        }
    }

    geserKanan(iter,parent){
        let i = this.index0[0]
        let j = this.index0[1]
        let data_return=[]
            this.arrayHistory[iter+'kanan'] = []


        let jAfter= j+1
        if(jAfter <= this.arrayProblem[0].length -1){
            let arrayProblemTemp = JSON.parse(JSON.stringify(this.arrayProblem))
            arrayProblemTemp[i][j] = arrayProblemTemp[i][jAfter]
            arrayProblemTemp[i][jAfter] = 0

            if(this.backtrack(arrayProblemTemp)){
                this.arrayHistory[iter+'kanan']['kanan'] = false
                //console.log('Tidak bisa geser kanan karena backtrack')
                return
            }

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']

            data_return['array'] = 'kanan'
            let step = this.calculateSteptoInit(parent)

            this.arrayHistory[iter+'kanan']['steptoparent'] = step[0]

            this.arrayHistory[iter+'kanan']['parent'] = parent

            this.arrayHistory[iter+'kanan']['index0_kanan']= [i,jAfter]
            this.arrayHistory[iter+'kanan']['kanan'] = JSON.parse(JSON.stringify(arrayProblemTemp))
            this.arrayHistory[iter+'kanan']['fungsi_kanan'] = [cek['selisih'],iter,step[1]]

        }else{
            this.arrayHistory[iter+'kanan']['kanan'] = false
            //console.log('Tidak bisa geser kanan')
        }
    }

    geserBawah(iter,parent){
        let i = this.index0[0]
        let j = this.index0[1]
        let data_return=[]
            this.arrayHistory[iter+'bawah'] = []


        let iAfter= i+1
        if(iAfter <= this.arrayProblem.length -1){
            let arrayProblemTemp = JSON.parse(JSON.stringify(this.arrayProblem))
            arrayProblemTemp[i][j] = arrayProblemTemp[iAfter][j]
            arrayProblemTemp[iAfter][j] = 0

            if(this.backtrack(arrayProblemTemp)){
                this.arrayHistory[iter+'bawah']['bawah'] = false
                //console.log('Tidak bisa geser bawah karena backtrack')
                return
            }

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']
            

            data_return['array'] = 'bawah'
            let step = this.calculateSteptoInit(parent)

            this.arrayHistory[iter+'bawah']['steptoparent'] = step[0]

            this.arrayHistory[iter+'bawah']['parent'] = parent

            this.arrayHistory[iter+'bawah']['index0_bawah'] = [iAfter,j]
            this.arrayHistory[iter+'bawah']['bawah'] = JSON.parse(JSON.stringify(arrayProblemTemp))
            this.arrayHistory[iter+'bawah']['fungsi_bawah'] = [cek['selisih'],iter,step[1]]
        }else{
            this.arrayHistory[iter+'bawah']['bawah'] = false
            //console.log('Tidak bisa geser bawah')
        }

    }

    geserKiri(iter,parent){
        let i = this.index0[0]
        let j = this.index0[1]
        let data_return=[]
            this.arrayHistory[iter+'kiri'] = []


        let jAfter= j-1
        if(jAfter>=0){
            let arrayProblemTemp = JSON.parse(JSON.stringify(this.arrayProblem))
            arrayProblemTemp[i][j] = arrayProblemTemp[i][jAfter]
            arrayProblemTemp[i][jAfter] = 0

            if(this.backtrack(arrayProblemTemp)){
                this.arrayHistory[iter+'kiri']['kiri'] = false
                //console.log('Tidak bisa geser kiri karena backtrack')
                return
            }

            let cek = this.checkTrue(arrayProblemTemp)
            data_return['count'] = cek['count']

            data_return['array'] = 'kiri'
            let step = this.calculateSteptoInit(parent)

            this.arrayHistory[iter+'kiri']['steptoparent'] = step[0]

            this.arrayHistory[iter+'kiri']['parent'] = parent

            this.arrayHistory[iter+'kiri']['index0_kiri'] = [i,jAfter]
            this.arrayHistory[iter+'kiri']['kiri'] = JSON.parse(JSON.stringify(arrayProblemTemp))
            this.arrayHistory[iter+'kiri']['fungsi_kiri'] = [cek['selisih'],iter,step[1]]
        }else{
            this.arrayHistory[iter+'kiri']['kiri'] = false
            //console.log('Tidak bisa geser kiri')
        }

    }

    

}

module.exports = EightPuzzleSolve