import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUmbrellaBeach, faTree, faDroplet, faWater, faSignsPost, faTreeCity, faMountainSun, faPaw, faChildReaching } from "@fortawesome/free-solid-svg-icons";

export function getCategoryIcon(categoryId, categoryColor) {
    switch (categoryId) {
        case (1):
            return <FontAwesomeIcon icon={faUmbrellaBeach} size={30} style={{
                color: categoryColor,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5
            }} />
            break
        case (2):
            return <FontAwesomeIcon icon={faTree} size={30} style={{
                color: categoryColor,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5
            }} />
            break
        case (3):
            return <FontAwesomeIcon icon={faDroplet} size={30} style={{
                color: categoryColor,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5
            }} />
            break
        case (4):
            return <FontAwesomeIcon icon={faWater} size={30} style={{
                color: categoryColor,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5
            }} />
            break
        case (5):
            return <FontAwesomeIcon icon={faSignsPost} size={30} style={{
                color: categoryColor,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5
            }} />
            break
        case (6):
            return <FontAwesomeIcon icon={faTreeCity} size={30} style={{
                color: categoryColor,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5
            }} />
            break
        case (7):
            return <FontAwesomeIcon icon={faMountainSun} size={30} style={{
                color: categoryColor,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5
            }} />
            break
        case (8):
            return <FontAwesomeIcon icon={faPaw} size={30} style={{
                color: categoryColor,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5
            }} />
            break
        case (9):
            return <FontAwesomeIcon icon={faChildReaching} size={30} style={{
                color: categoryColor,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5
            }} />
            break
    }

}