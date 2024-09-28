import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from ".";
import { IDs } from "~/components/patients/constant";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const {name,type} = req.body

  const curr = await prisma.user.count()
  const addr = IDs[curr-1]
  if(!addr) {
    return
  }
  prisma.user.create({data:{
    name,type,address:addr
  }}) 
}
