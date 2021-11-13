const types = {
    UP: 128,
    DOWN: 144,
    PITCH_BEND: 224
};

function checkExistance(typeCode) {
    return Object.values(types).includes(typeCode);
}

export default {
    types,
    checkExistance
};