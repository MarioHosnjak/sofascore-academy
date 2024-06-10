export function urlContainsString(query: string) {
    const url = window.location.href.toString().toLowerCase()
    console.log(url)
    if (url.indexOf(query.toLowerCase()) > -1) {
        return true
    } else {
        return false
    }
}