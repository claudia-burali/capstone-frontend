export const ADD_CURRENCYPAIR_REQUEST = "ADD_CURRENCYPAIR_REQUEST";
export const ADD_CURRENCYPAIR_SUCCESS = "ADD_CURRENCYPAIR_SUCCESS";
export const ADD_CURRENCYPAIR_FAILURE = "ADD_CURRENCYPAIR_FAILURE";

/*const addCurrencyPairRequest = () => ({
  type: ADD_CURRENCYPAIR_REQUEST,
});*/

const addCurrencyPairSuccess = (data) => ({
  type: ADD_CURRENCYPAIR_SUCCESS,
  payload: data,
});

const addCurrencyPairFailure = (error) => ({
  type: ADD_CURRENCYPAIR_FAILURE,
  payload: error,
});

export const fetchCurrencyPair = () => async (dispatch) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch("http://localhost:3001/currencyPairs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    dispatch(addCurrencyPairSuccess(data));
  } catch (error) {
    dispatch(addCurrencyPairFailure(error.message));
  }
};
