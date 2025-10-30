// venus root path : the 32 char long random lowercase letters
class venusRoot {
    static _venusRootCache = false;
    get path() {
        if (!this._venusRootCache) {
            const alphabetLowercase = "abcdefghijklmnopqrstuvwxyz"
            this._venusRootCache = Array.from({length: 32}, () => 
                alphabetLowercase[Math.floor(Math.random() * alphabetLowercase.length)]
            ).join('')
        }
        return "/"+this._venusRootCache + "/"
    }
    constructor() {
        
    }
}

export { venusRoot }