import { UserFormValues } from "@/app/admin/users/(crud)/user-form";
import { prisma } from "@/lib/db";
import axios from "axios";

export default async function getUsers() {

  const found = await prisma.user.findMany({
    orderBy: {
      emailVerified: 'desc',
    },
  })

  return found;
}


export async function getUser(id: string) {

  const found = await prisma.user.findUnique({
    where: {
      id
    },
  })

  return found
}

export async function getUserByHandle(handle: string) {

  const found = await prisma.user.findUnique({
    where: {
      handle
    },
  })

  return found
}

export async function createUser(data: UserFormValues) {
  
  const created= await prisma.user.create({
    data: {
      name: data.nombre,
      email: data.email,
      role: data.rol,
    },
  })

  return created
}

export async function editUser(id: string, data: UserFormValues) {
  console.log(data);
  
  const created= await prisma.user.update({
    where: {
      id
    },
    data: {
      name: data.nombre,
      email: data.email,
      role: data.rol,
    },
  })

  return created
}

export async function setUserName(id: string, name: string) {
  
  const updated= await prisma.user.update({
    where: {
      id
    },
    data: {
      name
    },
  })

  return updated
}

export async function deleteUser(id: string) {
  
  const deleted= await prisma.user.delete({
    where: {
      id
    },
  })

  return deleted
}

export async function setHandleOnDB(id: string, handle: string) {
  
  const updated= await prisma.user.update({
    where: {
      id
    },
    data: {
      handle
    },
  })

  return updated
}

export async function isHandleAvailable(handle: string) {
  console.log("checking: ", handle)  
  
  const found = await prisma.user.findUnique({
    where: {
      handle
    },
  })

  return !found
}

export async function setImageFromInstagram(id: string, nick: string) {

  const image= await getImageUrlFromAPI(nick)
  
  const updated= await prisma.user.update({
    where: {
      id
    },
    data: {
      image
    },
  })

  return updated
}

export async function getImageUrlFromAPI(nick: string) {

  const options = {
    method: 'GET',
    url: 'https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile',
    params: {
      ig: nick,
      response_type: 'short',
      corsEnabled: 'false'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data)
    const imageUrl= response.data[0].profile_pic_url
    return imageUrl
  } catch (error) {
    console.error(error);
  }
  
}