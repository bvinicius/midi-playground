const types = {
    ON: 128,
    OFF: 144,
    PITCH_WHEEL: 224
};

const strings = {
    [types.ON]: "Up",
    [types.OFF]: "Down",
    [types.PITCH_WHEEL]: "Pitch bend"
}

function toString(messageCode) {
    return strings[messageCode];
}

function checkExistance(typeCode) {
    return Object.values(types).includes(typeCode);
}

export default {
    get ON() {
        return types.ON;
    },
    get OFF() {
        return types.OFF;
    },
    get PITCH_WHEEL() {
        return types.PITCH_WHEEL;
    },
    checkExistance,
    toString
};