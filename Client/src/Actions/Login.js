import { AUTH } from "../Constants/ActionTypes";
import * as api from "../Api/index";

export const sign_in = (formData, Navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    Navigate('/')
  } catch (error) {
    console.log(error);
  }
};

export const sign_up = (formData, Navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    
    Navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};
