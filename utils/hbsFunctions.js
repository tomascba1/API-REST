function errBelowInput(arrWarnings, inputName){
    if(!arrWarnings) return null
    const warnings = arrWarnings.find((el =>
        el.param == inputName))
        if(!warnings) {
            return null
        } else {
            return warnings.msg
        }
}

module.exports = {errBelowInput}