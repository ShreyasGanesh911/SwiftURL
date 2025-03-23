import { FastifyRequest } from "fastify"

export interface URLInsance extends FastifyRequest{
    body:{
        longUrl:string,
        shortUrl:string,
        category:[ "Social", "Business", "News", "Shopping", "Education", 
            "Entertainment", "Personal", "Work", "Tech", "Other"]
    }
}

export interface IdInstanceParams extends FastifyRequest{
    params:{
        id:string
    }
}
export type CloudinaryResponse = {
    url:string
}
export const URLSchema = {
    body:{
        type: 'object',
        required: ['longUrl','shortUrl','category'],
        properties: {
            longUrl: { type: 'string' },
            shortUrl: { type: 'string' },
            category: { type: 'string' },
        }
    }
}