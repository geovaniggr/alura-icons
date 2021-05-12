const { createWriteStream, writeFileSync } = require('fs')
const { pipeline } = require('stream')
const { promisify } = require('util')

const fetch = require('node-fetch')
const streamPipeline = promisify(pipeline)

const ICONS_DIR = "./courses/v1/";

async function getCourses(){
    const path = "https://cursos.alura.com.br/api/cursos"

    const response = await fetch(path)

    const courses = await response.json()

    console.log(courses.length)

    return courses.map( course => course.slug)
}

async function getIcon(slug){
    const path = `https://www.alura.com.br/assets/api/cursos/${slug}.svg`

    const response = await fetch(path)

    if(!response.ok){
        console.log( `Failed fetching: ${slug}`)
        return;
    }

    await streamPipeline(response.body, createWriteStream(`${ICONS_DIR}${slug}.svg`))
}

async function main(){

    const slugs = await getCourses()
    
    const data = slugs.map( slug => `"${slug}"`).join(", ");


    writeFileSync('slugs.js', data, { encoding: 'utf-8'})
    slugs.forEach(getIcon)

}


main();







