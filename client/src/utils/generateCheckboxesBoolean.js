export default function generateCheckboxesBoolean () {
    const object = {}
    for (let i = 1; i <= 250; i++) {
        object[`checkbox${i}`] = false;
    }
}