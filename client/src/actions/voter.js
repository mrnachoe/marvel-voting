import * as types from '#root/constants/ActionTypes';


export const setVoter = (voter) => {
    return {
        type: types.VOTER,
        ...voter
    }
};

export const clearVoter = () => {
    return {
        type: types.CLEAR
    }
};

export const addVoter = ({name, uuid}) => async (dispatch) => {
    localStorage.setItem('voterName', name);
    localStorage.setItem('voterUUID', uuid);

    dispatch(setVoter({
        name: name,
        uuid: uuid
    }));
};


export const removeVoter = () => async (dispatch) => {
    dispatch(clearVoter());

    localStorage.removeItem('voterName');
    localStorage.removeItem('voterUUID');
};

