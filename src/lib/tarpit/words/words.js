let nouns = `ability access accident account back bad balance ball bank chemistry connection drama depth direction dad desk depression dirt ear earth effect eye frame fact family fortune game garbage guest guidance job key kind king knowledge`.split(" ")

let pronouns = `
    I we you they he she it who which that this those these
`.trim().split(/\s+/)

let verbs = `
    say go greet make know think see come want try ask need become understand watch follow lead stop create fall cut kill reach remain sell pass pull decide
`.trim().split(/\s+/)

let adjectives = `
    good few short dead difficult new public single central similar first bad simple safe expensive big strong common light healthy honest quiet young important
`.trim().split(/\s+/)

let adverbs = `
    eagerly rapidly loudly hungrily really strangely
`.trim().split(/\s+/)

let prepositions = `
    in on at by for from with about under over
`.trim().split(/\s+/)

let conjunctions = `
    for and nor but or yet so because since although when if
`.trim().split(/\s+/)

let articles = `the a an`.split(" ")

let punctuation = `? ! .`.split(" ")

let words = nouns.join(" ") + pronouns.join(" ") + verbs.join(" ") + adjectives.join(" ") + adverbs.join(" ") + prepositions.join(" ") + conjunctions.join(" ")


export {words}