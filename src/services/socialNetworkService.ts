import { SocialNetworkFormValues } from "@/app/admin/socialnetworks/(crud)/social-form";
import { prisma } from "@/lib/db";
import { getImageUrlFromAPI, setImageFromInstagram } from "./userService";

export default async function getSocialNetworks() {

  const found = await prisma.socialNetwork.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  return found;
}

export async function getSocialNetworksNotSetted(userId: string) {

  const found = await prisma.socialNetwork.findMany({
    where: {
      socialAccount: {
        none: {
          userId,
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return found;
}

export async function getSocialNetworkWebSite() {
  
    const found = await prisma.socialNetwork.findFirst({
      where: {
        icon: 'BsGlobe',
      },
    })
  
    return found
}

export async function getSocialNetwork(id: string) {

  const found = await prisma.socialNetwork.findUnique({
    where: {
      id
    },
  })

  return found
}

export async function createSocialNetwork(data: SocialNetworkFormValues) {
  
  const created= await prisma.socialNetwork.create({
    data: {
      ...data,
      order: Number(data.order),
    }
  })

  return created
}

export async function updateSocialNetwork(id: string, data: SocialNetworkFormValues) {
  console.log(data);
  
  const updated= await prisma.socialNetwork.update({
    where: {
      id
    },
    data: {
      ...data,
      order: Number(data.order),
    }
  })

  return updated
}

export async function deleteSocialNetwork(id: string) {
  
  const deleted= await prisma.socialNetwork.delete({
    where: {
      id
    },
  })

  return deleted
}

