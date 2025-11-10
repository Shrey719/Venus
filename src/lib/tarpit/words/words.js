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


// all of the code here and below is AI generated because I couldnt be assed to do english grammar
// I know its ironic but uhh 
// idc
function randomSentence() {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    // verbform based off of subject
    const getVerb = (subject, baseVerb) => {
        if (subject === 'I' || subject === 'you' || subject === 'we' || subject === 'they') {
            return baseVerb;
        } else if (subject === 'he' || subject === 'she' || subject === 'it') {
            if (baseVerb.endsWith('y') && !['ay', 'ey', 'iy', 'oy', 'uy'].includes(baseVerb.slice(-2))) {
                return baseVerb.slice(0, -1) + 'ies';
            } else if (baseVerb.endsWith('s') || baseVerb.endsWith('x') || baseVerb.endsWith('z') || 
                      baseVerb.endsWith('ch') || baseVerb.endsWith('sh')) {
                return baseVerb + 'es';
            } else {
                return baseVerb + 's';
            }
        }
        return baseVerb;
    };

    // should have proper (ish) grammar
    const structures = [
        () => {
            const subject = random(pronouns);
            const verb = getVerb(subject, random(verbs));
            return `${capitalize(subject)} ${verb}.`;
        },
        
        () => {
            const article = random(articles);
            const subject = `${article} ${random(adjectives)} ${random(nouns)}`;
            const verb = getVerb(subject, random(verbs));
            return `${capitalize(subject)} ${verb}.`;
        },
        
        () => {
            const subject = random(pronouns);
            const verb = getVerb(subject, random(verbs));
            return `${capitalize(subject)} ${verb} ${random(prepositions)} ${random(articles)} ${random(nouns)}.`;
        },
        
        () => {
            const subject = random(pronouns);
            const verb = getVerb(subject, random(verbs));
            return `${capitalize(random(adverbs))}, ${subject} ${verb} ${random(adjectives)} ${random(nouns)}.`;
        },
        
        () => {
            const article = random(articles);
            const subject = `${article} ${random(nouns)}`;
            const verb = getVerb(subject, random(verbs));
            return `${capitalize(subject)} ${verb} ${random(prepositions)} ${random(articles)} ${random(adjectives)} ${random(nouns)}.`;
        },
        
        () => {
            const subject1 = random(pronouns);
            const verb1 = getVerb(subject1, random(verbs));
            const subject2 = random(pronouns);
            const verb2 = getVerb(subject2, random(verbs));
            return `${capitalize(subject1)} ${verb1} ${random(conjunctions)} ${subject2} ${verb2}.`;
        },
        
        () => {
            const article = random(articles);
            const subject = `${article} ${random(nouns)}`;
            const verb = getVerb(subject, random(verbs));
            return `${capitalize(subject)} ${verb} ${random(adverbs)} ${random(conjunctions)} ${random(verbs)} ${random(prepositions)} ${random(nouns)}.`;
        },
        
        // question
        () => {
            const subject = random(['he', 'she', 'it', 'they']);
            const baseVerb = random(verbs);
            const verb = subject === 'they' ? baseVerb : getVerb(subject, baseVerb);
            return `Does ${subject} ${verb} ${random(prepositions)} ${random(articles)} ${random(nouns)}?`;
        },
        
        // imperative
        () => {
            return `${capitalize(random(verbs))} ${random(prepositions)} ${random(articles)} ${random(nouns)}!`;
        }
    ]

    return random(structures)()
}

function randomParagraph(n_sentences) {
    let text = ""
    for (let i = 0; i < n_sentences; i++) {
        text = text + " " + randomSentence();
    }
    return text;
}

export { randomSentence, words, randomParagraph}