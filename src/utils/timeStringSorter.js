export default function timeStringSorter(elem1, elem2) {
    const splitted1 = elem1.props.time.split(":")
    const splitted2 = elem2.props.time.split(":")
    const date1 = new Date().setHours(splitted1[0], splitted1[1])
    const date2 = new Date().setHours(splitted2[0], splitted2[1])
    return date1 - date2 
}