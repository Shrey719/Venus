// venus root path : the 32 char long random lowercase letters
class venusRoot {
    constructor(venusRoot='UNSET') {
        if (venusRoot=="UNSET") {
            const alphabetLowercase = "abcdefghijklmnopqrstuvwxyz"
            this._venusRootCache = Array.from({length: 32}, () => 
                alphabetLowercase[Math.floor(Math.random() * alphabetLowercase.length)]
            ).join('')
        } else {
            this._venusRootCache = venusRoot
        }
    }
    get path() {
        return "/"+this._venusRootCache + "/"
    }
}

export { venusRoot }