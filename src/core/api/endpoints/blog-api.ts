import {IBlogDto} from "@/data-contracts.ts";
import axios from "axios";

const API_URL = 'https://clickcontent-blog-api.vmirecloud.eu/api/'

export const getBlog = async (searchQuery: string): Promise<IBlogDto[]> => {
    const response = await axios.get(`${API_URL}post/get/post${searchQuery ? `?name=${searchQuery}` : ""}`)

    return response.data
}

export const getPost = async (id: string): Promise<IBlogDto> => {
    const response = await axios.get(`${API_URL}post/get/post/${id}`)
    return response.data
}

