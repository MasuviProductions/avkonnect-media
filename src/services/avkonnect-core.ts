import axios from 'axios';
import API_ENDPOINTS from '../constants/api';
import { IUserApiResponse } from '../interfaces/api';
import { HttpResponse } from '../interfaces/app';

const getAuthUser = async (bearerToken: string): Promise<HttpResponse<IUserApiResponse>> => {
    const userProfileResponse = await axios
        .get<HttpResponse<IUserApiResponse>>(API_ENDPOINTS.GET_AUTH_USER(), {
            headers: { authorization: `Bearer ${bearerToken}` },
        })
        .then((res) => res.data)
        .catch((err) => err);
    return userProfileResponse;
};

const AVKKONNECT_CORE_SERVICE = {
    getAuthUser,
};

export default AVKKONNECT_CORE_SERVICE;
