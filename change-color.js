const fs = require('fs/promises')

const NEW_SVG_FILL = "#031326";
const SVG_V1_ICON = "./courses/v1"
const SVG_V2_ICON = "./courses/v2"

const notMatched = []

const patterns = [
    "#4{3,6}", // #444 #444444
    "#494949",
    "#464646",
    "#454545",
    "#414141",
    "#424242",
    "#4e4e4e",
    "#4d4d4d",
]

const buildRegexp = (expressions) => {
    const pattern = expressions.join("|")

    return new RegExp(`(${pattern})`, "g")
}

const replacer = buildRegexp(patterns)

const changeIconColor = async (name) => {
    const svg = await fs.readFile(`${SVG_V1_ICON}/${name}`, { encoding: 'utf-8'})

    if(!replacer.test(svg)){
        console.log("nao deu match em " + name)
        notMatched.push(name)
    }

    await fs.writeFile(`${SVG_V2_ICON}/${name}`, svg.replace(replacer, NEW_SVG_FILL), { encoding: 'utf-8'})
}

const init = async () => {
    const icons = await fs.readdir('./courses/v1')

    icons.forEach(changeIconColor)
}
init()
