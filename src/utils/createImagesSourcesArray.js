export function createImagesSourcesArray(imagesArray) {

    const imagesSourcesArray = []

    imagesArray.forEach(image => {
        imagesSourcesArray.push('https://nice-places.fr/images/' + image.nom)
    })
    
    return imagesSourcesArray
}