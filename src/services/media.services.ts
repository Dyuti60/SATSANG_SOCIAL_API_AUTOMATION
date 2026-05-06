import { media } from "../endpoints/endpoints";
import ApiService from '../api/api.service';
import { RequestBuilder } from '../api/request.builder';
import FormData from 'form-data';
import fs from 'fs'
import axios from "axios";

export class MediaServices{


    constructor(
    private socialApi: ApiService
    ) {}

    async placeMedia(payload: any, type: 'chat' | 'story' | 'profile' | 'post'){
        const requestPayload = new RequestBuilder()
            .setUrl(`${media.POST_ALLOCATE_MEDIA}${type}`)
            .setMethod('POST')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }

    async uploadToMinio(item:any, filePath:string){
        const formData = new FormData();

        Object.entries(item.formData).forEach(([key, value])=>{
            formData.append(key, value as string)
        })

        formData.append("file", fs.createReadStream(filePath))

        const response = await axios.post(item.postUrl, formData, {
            headers: formData.getHeaders()
        })

        return response
    }

    async updateMediaStatus(payload: {mediaIds: string[]} | any){
        const requestPayload = new RequestBuilder()
            .setUrl(`${media.POST_MEDIA_UPDATESTATUS}`)
            .setMethod('POST')
            .setBody(payload)
            .build()

        const response = await this.socialApi.request(requestPayload)
        return {
            response
        }
    }
    


}