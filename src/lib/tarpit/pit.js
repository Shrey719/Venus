import { tar } from "./tar.js"

function randomchars() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return  Array.from({length: 32}, () => 
        alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join('')

}

function pit(app, instanceRoot) {
    let newRoute = `${instanceRoot.path}${randomchars()}/`
    console.log("creating a new route: " + newRoute)

    app.get(newRoute, (req, res) => {
        // queue route creation for the next event loop so the call stack does not exceeed one
        Promise.resolve().then(() => {
            let tarRoute = pit(app, instanceRoot)
            res.send(tar(tarRoute))
        })
    });

    return newRoute;
}


export { pit }